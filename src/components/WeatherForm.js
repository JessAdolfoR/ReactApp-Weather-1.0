import React from 'react'
import './index.css'
function WeatherForm(props) {
    return(
        <div className="card card-body card-form"> 
            <form onSubmit={props.getWeather}>
                <div className="form-group">
                    <input type="text" name="city" placeholder="Your city name" 
                    className="form-control" autoFocus/>
                </div>
                <div className="form-group">
                    <input type="text" name="country" placeholder="Your country name" 
                    className="form-control"/>
                </div>
                <button disabled={props.bandDisabled} type="submit" className="btn btn-success btn-block">Get weather</button>
            </form>
        </div>
    ) 
}
export default WeatherForm