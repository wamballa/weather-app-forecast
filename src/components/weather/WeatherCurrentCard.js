import React from 'react'
import './weather.css'

export default function WeatherCurrentCard(props) {

  const icon_url = 'http://openweathermap.org/img/w/' + props.icon + '.png';

  return (

    <div className="container-fluid">
      {props.error && <h1 className='error'>{props.error}</h1>}
      {
        props.city &&

        <div className="row weather bg-dark text-white shadow m-2 p-4 mb-4 ">

          <div className="col-sm-6 col-md-6 col-lg-6">
            {/* <div className="weather blue-grey darken-1"> */}
            {/* <div className="current"> */}
            <div className="info">
              <div>&nbsp;</div>
              <div className="city"><small><small>CITY: </small></small>{props.city}</div>
              <div className="temp">{Math.round(props.temp)}&deg;<small>C</small></div>
              <div className="wind"><small><small>WIND: </small></small>{Math.round(props.windSpeed)} mph</div>
              <div>&nbsp;</div>
            </div>
          </div>

          <div className="col-sm-6 col-md-6 col-lg-6" >
            <div className="icon iconImage">
              {/* <div>&nbsp;</div> */}
              {props.icon && <img className='graphic' src={icon_url} alt='' />}
              {/* <div>&nbsp;</div> */}
              <div className="title">{props.mainDescription}</div>
              <div className="sub">{props.description}</div>
            </div>
          </div>

        </div>
      }
    </div>
  )
}
