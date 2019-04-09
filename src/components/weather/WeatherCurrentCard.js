import React from 'react'
import './weather.css'

export default function WeatherCurrentCard(props) {

  function handleClick(){
    console.log("wwather button click");
  }

  console.log ('weathercard = ', props);
  props.delCard();
  console.log ('weathercard icon= ', props.city.icon);
  const icon_url = 'http://openweathermap.org/img/w/' + props.city.icon + '.png';

  return (

    <div className="container-fluid">
      {props.city.error && <h1 className='error'>{props.city.error}</h1>}
      {
        props.city.city &&

        <div className="row weather bg-dark text-white shadow m-2 p-4 mb-4 ">

          <div className="col-sm-6 col-md-6 col-lg-6">
            {/* <div className="weather blue-grey darken-1"> */}
            {/* <div className="current"> */}
            <div className="info">
              <div>&nbsp;</div>
              <div className="city"><small><small>CITY: </small></small>{props.city.city}</div>
              <div className="temp">{Math.round(props.city.temp)}&deg;<small>C</small></div>
              <div className="wind"><small><small>WIND: </small></small>{Math.round(props.city.windSpeed)} mph</div>
              <div>&nbsp;</div>
            </div>
          </div>

          <div className="col-sm-6 col-md-6 col-lg-6" >
            <div className="icon iconImage">
              {/* <div>&nbsp;</div> */}
              {props.city.icon && <img className='graphic' src={icon_url} alt='' />}
              {/* <div>&nbsp;</div> */}
              <div className="title">{props.city.mainDescription}</div>
              <div className="sub">{props.city.description}</div>
              <button onClick={props.delCard}>Delete</button>
            </div>
          </div>

        </div>
      }
    </div>
  )
}
