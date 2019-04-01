import React, { Component } from 'react'
import Form from './Form';
import WeatherCurrentCard from './WeatherCurrentCard'
import CitySummary from './CitySummary'
import { Formik, Field } from 'formik';

const API_KEY = 'e22d1c07fa47b19cb8d862add6c876d5';

export class WeatherSummary extends Component {

  constructor(props) {
    super(props);
    this.cityList = [];
  }

  state = {
    city: undefined,
    country: undefined,
    mainDescription: undefined,
    description: undefined,
    temp: undefined,
    tempMax: undefined,
    tempMin: undefined,
    windDirection: undefined,
    windSpeed: undefined,
    icon: undefined,
    error: undefined
  };

  getWeather = async (e) => {
    // console.log ("getWeather data before " , this.state);
    console.log("GET WEATHER ",e.target.name);
    e.preventDefault();
    
    const city = e.target.name;
    
    // const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&sort=population&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (data.name && data.sys.country) {
      this.setState({
        city: data.name,
        country: data.sys.country,
        mainDescription: data.weather[0].main,
        description: data.weather[0].description,
        temp: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        windDirection: data.wind.deg,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
        error: ''
      });
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        mainDescription: undefined,
        description: undefined,
        temp: undefined,
        tempMax: undefined,
        tempMin: undefined,
        windDirection: undefined,
        windSpeed: undefined,
        icon: undefined,
        error: 'Error: with choice of City or Country'
      });
    }
    // console log all API call data
    console.log("getWeather data raw ", data);
    // console log state
    // console.log("getWeather data state ", this.state);
  }
  showSearchData = (data) => {
    console.log("cityList", data);
    console.log("length " + data.list.length);
    let html = '';

    for (let i = 0; i < data.list.length; i++) {
      // cityList.push()
      var name = data.list[i].name + ', ' + data.list[i].sys.country;
      var temp = Math.round(10 * (data.list[i].main.temp - 273.15)) / 10;
      var tmin = Math.round(10 * (data.list[i].main.temp_min - 273.15)) / 10;
      var tmax = Math.round(10 * (data.list[i].main.temp_max - 273.15)) / 10;
      var text = data.list[i].weather[0].description;
      var img = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
      var flag = "http://openweathermap.org/images/flags/" + data.list[i].sys.country.toLowerCase() + ".png";
      var gust = data.list[i].wind.speed;
      var pressure = data.list[i].main.pressure;
      var cloud = data.list[i].clouds.all;

      var row = '<tr><td><img src="' + img + '"></td><td><b><li onClick={this.showSearchData} data-id= "'+ i + '"><span>' + data.list[i].id + '</span></li></td></tr>'; 
      
      
      
      {/* <a href="https://openweathermap.org/city/' + data.list[i].id + '"> ' + name + '</a></b> <img class="flag" src="' + flag + '" ><b><i> ' + text + '</i></b><p><span class="badge badge-info">' + temp + '°С </span> wind ' + gust+ ' m/s. </p></td></tr>'; */}

      // var row = '<tr><td><img src="' + img + '"></td><td><b><a href="/city/' + data.list[i].id + '"> ' + name + '</a></b> <img class="flag" src="' + flag + '" ><b><i> ' + text + '</i></b><p><span class="badge badge-info">' + temp + '°С </span> wind ' + gust+ ' m/s. </p></td></tr>';



      html = html + row;
    }
    // html='<table class="table">' + html + '</table>';
    html='<ul>' + html + '</ul';



    // html='<form onSubmit=this.getWeather()></form>'
    console.log("HTML = "+html);
    // return html;
    document.getElementById('search_output').innerHTML = html;

  }

  findCity = async (e) => {

    e.preventDefault();
    console.log("FIND CITY");
    // const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const city = e.target.elements.city.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/find?q=${city}&type=like&sort=population&appid=${API_KEY}`);
    // console.log('API CALL ', api_call);
    const data = await api_call.json();
    // console log all API call data
    console.log("search results ", data);
    // this.cityList = data;

    // console.log("cityList", this.cityList);
    this.showSearchData(data);
  };



  render() {
    return (
      <div>


        <form>
            <input type="button" name="Paris" value="Click me" onClick={this.getWeather}></input>
        </form>

        {/* <Form getWeather={this.getWeather} /> */}
        <Form findCity={this.findCity} />
        <CitySummary cityList={this.cityList} />
        <div id='search_output'></div>
        <WeatherCurrentCard
          city={this.state.city}
          country={this.state.country}
          mainDescription={this.state.mainDescription}
          description={this.state.description}
          temp={this.state.temp}
          tempMax={this.state.tampMax}
          tempMin={this.state.tempMin}
          windDirection={this.state.windDirection}
          windSpeed={this.state.windSpeed}
          icon={this.state.icon}
          error={this.state.error}
        />
      </div>
    )
  }
}

export default WeatherSummary
