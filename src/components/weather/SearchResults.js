import React, { Component } from 'react'

export class SearchResults extends Component {

  getUnique = (arr, comp) =>  {

    const unique = arr
         .map(e => e[comp])
  
       // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
  
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
  
     return unique;
  }
  

  getWeather = async (city) => {
    // console.log("SearchResults  " + city);
    const API_KEY = 'e22d1c07fa47b19cb8d862add6c876d5';
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&sort=population&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log("data is ",data);
    // remove duplicates
    console.log( this.getUnique(data, 'id'));

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
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted " + e.target.name);
    // this.props.state.setState = false;

    const city = e.target.dataset.name;
    // this.props.addCity(city);
    this.getWeather(city);
  }
  // <div key={city.id}> {city.name} {city.sys.country} Coords: {city.coord.lat}, {city.coord.lon}</div>
  render() {
    // console.log("city summary props ", this.props);
    let cityList = this.props.cities.list || []; // if no items give an empty array
    // let cityList = this.props.list; // if no items give an empty array
    console.log("CitySummary citylist...", cityList);
    // console.log("City summary cityList = ", cityList)

    return (
      <div>
        <form>
          {cityList.map((city) => (
            // how can i make these clickable?
            <div key={city.id}>
              <button onClick={this.handleFormSubmit} data-name={city.name} data-city-id={city.id}>{city.name}, {city.sys.country}</button>
            </div>
          ))}
        </form>
      </div>
    )
  }
}

export default SearchResults
