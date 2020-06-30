import React from 'react';
import './index.css'
function WeatherList(props){
    return (
        <div>
            {
                props.error &&
                <div className="alert alert-danger">
                    <p>{props.error}</p>
                </div>
            }
            {props.items.length > 0 ?
              <div>
                {props.items.map(item =><div key={item.city}><i onClick={() => props.deleteItemList(item.city)} className="fas fa-trash-alt"></i> <div onClick={() => props.clickListWeather(item)}  className=" card card-body mt-2 animated fadeInUp card-list" > 
                
                    {
                        item.city && item.country &&
                        <p><i className="fas fa-location-arrow"></i> Location: {item.city}, {item.country}</p>
                    }
                </div></div>)}
              </div>
            :<div className="card card-body mt-2 text-center">
            <i className="fas fa-sun fa-10x"></i>
        </div>}
                
        </div>

    )
}

export default WeatherList;