import React, { Component } from 'react';
import './App.css';
import WeatherInfo from './components/WeatherInfo';
import WeatherForm from './components/WeatherForm';
import WeatherList from './components/WeatherList';
import MapWeather from './components/MapWeather';
import {WEATHER_KEY, MAP_KEY} from './keys';

import * as mapboxgl from 'mapbox-gl';

class App extends Component{
  state = {
    max_temperature :'',
    min_temperature:'',
    description:'',
    humidity:'',
    wind_speed:'',
    city:'',
    country:'',
    error:'',
    local:[],
    itemList:'',
    bandDisabled:false,
    coordinates:[],
    map:''
  }
  componentDidMount=()=>{
    if(!localStorage.getItem('items')){
      localStorage.setItem('items', JSON.stringify(this.state.local))
    }
    if(localStorage.getItem('items')){
      this.setState({local:JSON.parse(localStorage.getItem('items'))})
    }
    mapboxgl.accessToken = MAP_KEY;
    this.setState({
      map : new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40],
        zoom: 9
      })
    })
     
  }
  getWeather=async e=>{
    e.preventDefault()
    
    this.setState({bandDisabled:true})
    const {city, country } = e.target.elements
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value},${country.value}&appid=${WEATHER_KEY}&units=metric`
    const response = await fetch(API_URL)
    const data = await response.json()
    if(data.cod === 200){
      let tempCoordinates = []
      tempCoordinates.push(data.coord.lon, data.coord.lat)
      this.setState({
        bandDisabled:false,
        max_temperature:data.main.temp_max,
        min_temperature:data.main.temp_min,
        description: data.weather[0].description,
        humidity:data.main.humidity,
        wind_speed:data.wind.speed,
        city:data.name,
        country:data.sys.country,
        coordinates:tempCoordinates,
        lat:data.coord.lat,
        error:null,
     })
     let body = {
      max_temperature:data.main.temp_max,
      min_temperature:data.main.temp_min,
      description: data.weather[0].description,
      humidity:data.main.humidity,
      wind_speed:data.wind.speed,
      city:data.name,
      country:data.sys.country,
      coordinates:tempCoordinates,
      lat:data.coord.lat,
     }
     this.state.map.jumpTo({ center: tempCoordinates });
     let temp = JSON.parse(localStorage.getItem('items'))
     const result = temp.find(item => item.city === this.state.city);
     if(!result){
       if(temp.length >= 5){
         temp.splice(0, 1)
       }
      temp.push(body)
      localStorage.setItem('items',JSON.stringify(temp))
      this.setState({local:temp})
      }else{
        this.setState({
          error:'The city is already on the list'
        })
      }
    }else {
      this.setState({
          error: data.message,
          bandDisabled:false
      });
    }
  document.getElementById("form-weather").reset();
  }
  clickListWeather = item =>{
    this.setState({
      max_temperature:item.max_temperature,
      min_temperature:item.min_temperature,
      description: item.description,
      humidity:item.humidity,
      wind_speed:item.wind_speed,
      city:item.city,
      country:item.country,
   })
   this.state.map.jumpTo({ center: item.coordinates });
  }
  deleteItemList = city => {
    this.setState({local:this.state.local.filter(item => item.city !== city)})
    this.state.local = this.state.local.filter(item => item.city !== city)
    //idk why the not mutate state, sorry for that
    localStorage.setItem('items',JSON.stringify(this.state.local))
  }
  render(){
    return(
      <div className="container p-4">
        <h2 className="text-center">Weather app</h2>
        <div className="row">
          <div className="col-md-4 mx-auto">
            <WeatherForm bandDisabled={this.state.bandDisabled} getWeather={this.getWeather}/>
            <WeatherInfo {...this.state}/>
          </div>
          <div className="col-md-4 mx-auto">
            <WeatherList deleteItemList={this.deleteItemList} clickListWeather={this.clickListWeather} items = {this.state.local}/>
          </div>
          <div className="col-md-12 mx-auto mt-3">
          <MapWeather/>
        </div>
      </div>
    </div>
    )
  }
}
export default App;
