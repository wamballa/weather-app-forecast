import React, { Component } from 'react'

export class SearchResults extends Component {
  getWeather = async (city) => {
    // console.log("SearchResults  " + city);
    const API_KEY = 'e22d1c07fa47b19cb8d862add6c876d5';
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&sort=population&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (data.name && data.sys.country) {
      this.props.addCity({
        city: data.name,
        id: data.id,
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
      console.error('Error: with choice of City or Country');
    }
    // console log all API call data
    // console.log("getWeather data raw ", data);
    // console.log("SearchResults state ",this.state);
    // cityList = [];
    // this.props.cities = [];


    // console log state
    // console.log("getWeather data state ", this.state);

  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted " + e.target.name);
    // this.props.state.setState = false;

    const city = e.target.name;
    // this.props.addCity(city);
    this.getWeather(city);
  }
  // <div key={city.id}> {city.name} {city.sys.country} Coords: {city.coord.lat}, {city.coord.lon}</div>
  render() {
    // console.log("city summary props ", this.props);
    let cityList = this.props.cities.list || []; // if no items give an empty array
    // let cityList = this.props.list; // if no items give an empty array
    // console.log("CitySummary citylist...", cityList);
    // console.log("City summary cityList = ", cityList)

    return (
      <div>
        <form>
          {cityList.map((city) => (
            // how can i make these clickable?
            <div key={city.id}>
              <input type="button" className="link-button" name={city.name} value={city.name} onClick={this.handleFormSubmit}></input>
            </div>
          ))}
        </form>
      </div>
    )
  }
}

export default SearchResults
