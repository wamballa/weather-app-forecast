import React, { Component } from "react";

export class SearchResults extends Component {
  getUnique = (arr, comp) => {
    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])
      .map(e => arr[e]);

    return unique;
  };

  getWeather = async (cityId, cityName, country, countryId) => {
    // console.log("SearchResults  " + city);
    // const API_KEY = 'e22d1c07fa47b19cb8d862add6c876d5';
    // const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&sort=population&appid=${API_KEY}&units=metric`);
    // const url = `http://dataservice.accuweather.com/locations/v1/${city}?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU`
    const url = `http://dataservice.accuweather.com//currentconditions/v1/${cityId}?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU&detail=true`;
    const api_call = await fetch(url);
    const data = await api_call.json();
    console.log("weather results data is ", data);

    // if (data.name && data.sys.country) {
    //   this.props.addCity({
    //     city: data.name,
    //     id: data.id,
    //     country: data.sys.country,
    //     mainDescription: data.weather[0].main,
    //     description: data.weather[0].description,
    //     temp: data.main.temp,
    //     tempMax: data.main.temp_max,
    //     tempMin: data.main.temp_min,
    //     windDirection: data.wind.deg,
    //     windSpeed: data.wind.speed,
    //     icon: data.weather[0].icon,
    //     error: ''
    //   });

    // if (data[0].WeatherText && data.sys.country) {
    if (data[0].WeatherText) {
      this.props.addCity({
        city: cityName,
        id: cityId,
        country: country,
        countryId: countryId,
        mainDescription: data[0].WeatherText,
        description: data[0].WeatherText,
        temp: data[0].Temperature.Metric.Value,
        // tempMax: data.main.temp_max,
        // tempMin: data.main.temp_min,
        windDirection: 11,
        windSpeed: 12,
        icon: data[0].WeatherIcon,
        error: ""
      });
    } else {
      console.error("Error: with choice of City or Country");
    }
  };

  handleFormSubmit = e => {
    e.preventDefault();
    // console.log("Form submitted " + e.target.name);
    // this.props.state.setState = false;

    // const city = e.target.dataset.name;
    const cityId = e.target.dataset.cityId;
    const cityName = e.target.dataset.name;
    const country = e.target.dataset.country;
    const countryId = e.target.dataset.countryId;

    // this.props.addCity(city);
    this.getWeather(cityId, cityName, country, countryId);
  };
  // <div key={city.id}> {city.name} {city.sys.country} Coords: {city.coord.lat}, {city.coord.lon}</div>
  render() {
    // console.log("city summary props ", this.props);
    let cityList = this.props.cities || []; // if no items give an empty array
    // let cityList = this.props.list; // if no items give an empty array
    console.log("CitySummary citylist...", cityList);
    // console.log("City summary cityList = ", cityList)

    return (
      <div>
        <form>
          {cityList.map(city => (
            // how can i make these clickable?
            <div key={city.Key}>
              <button
                onClick={this.handleFormSubmit}
                data-name={city.LocalizedName}
                data-country={city.Country.EnglishName}
                data-city-id={city.Key}
                data-country-id={city.AdministrativeArea.CountryID}
              >
                {city.LocalizedName}, {city.AdministrativeArea.EnglishName},{" "}
                {city.Country.EnglishName}
              </button>
            </div>
          ))}
        </form>
      </div>
    );
  }
}

export default SearchResults;
