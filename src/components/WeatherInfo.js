import React from 'react';

function WeatherInfo(props){
    return (
        <div>
            {
                props.error &&
                <div className="alert alert-danger">
                    <p>{props.error}</p>
                </div>
            }
            {props.max_temperature ?
                <div className="card card-body mt-2 animated fadeInUp" >
                    {
                        props.city && props.country &&
                        <p><i className="fas fa-location-arrow"></i> Location: {props.city}, {props.country}</p>
                    }
                    {
                        props.max_temperature &&
                        <p><i className="fas fa-temperature-low"></i> Temperature: {props.max_temperature} ℃, {props.description}</p>
                    }
                      {
                        props.min_temperature &&
                        <p><i className="fas fa-temperature-low"></i> Temperature: {props.min_temperature} ℃, {props.description}</p>
                      }
                    {
                        props.humidity &&
                        <p><i className="fas fa-water"></i> Humidity: {props.humidity}</p>
                    }
                    {
                        props.wind_speed &&
                        <p><i className="fas fa-wind"></i> Wind Speed: {props.wind_speed}</p>
                    }
                </div>
                :
                <div className="card card-body mt-2 text-center">
                    <i className="fas fa-sun fa-10x"></i>
                </div>
            }
        </div>

    )
}

export default WeatherInfo;