import React, { Component } from "react";
import Script from "react-load-script";

export default class AddCardAuto extends Component {
  state = {
    city: undefined
  };

  getWeather = async cityInfo => {
    let url = `http://dataservice.accuweather.com//currentconditions/v1/${
      cityInfo.cityId
    }?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU&detail=true`;
    let api_call = await fetch(url);
    let data = await api_call.json();
    // console.log("weather results raw data is ", data);

    // 5 day forecast
    //  url = `http://dataservice.accuweather.com//forecasts/v1/daily/5day/329149?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU&metric=true`;
    //  api_call = await fetch(url);
    //  data = await api_call.json();
    // console.log("5 day weather results data is ", data);

    if (data[0].WeatherText) {
      this.addCity({
        city: cityInfo.cityName,
        id: cityInfo.cityId,
        country: cityInfo.countryName,
        description: data[0].WeatherText,
        temp: data[0].Temperature.Metric.Value,
        icon: data[0].WeatherIcon,
        image: cityInfo.image,
        error: ""
      });
    } else {
      console.error("Error: with choice of City or Country");
    }
  };

  addCity = val => {
    this.props.addCard(val);
  };

  handleFocus = () => {
    // console.log("handle focus " + this.state.query);
    document.getElementById("autocomplete").value = "";
    this.setState({ query: undefined });
  };
  handleBlur = () => {
    console.log("handle blur " + this.state.query);
    this.setState({ query: undefined });
  };
  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    var options = { types: ["(cities)"] };

    // Initialize Google Autocomplete
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  };

  handlePlaceSelect = async () => {
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      const location =
        parseFloat(addressObject.geometry.location.lat()) +
        "," +
        parseFloat(addressObject.geometry.location.lng());
      const url = `http://dataservice.accuweather.com//locations/v1/cities/geoposition/search?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU&q=${location}`;
      const api_call = await fetch(url);
      const data = await api_call.json();

      // Set State
      this.setState({
        query: undefined
      });

      // Get location image
      var photos = addressObject.photos;
      var picUrl = photos[0].getUrl();
      console.log('photos '+picUrl);

      const cityInfo = {
        cityId: data.Key, //gets the accuweather city id to use with accuweather weather search
        cityName: address[0].long_name, //uses google city name for concistency
        countryName: data.Country.EnglishName, // uses accuweather country name as google returns variable array size in response
        image: picUrl
      };

      this.getWeather(cityInfo);
    }
  };

  render() {
    return (
      <div>
        <div className="m-2">
          <Script
            url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBp4lsvgALACqdsxsEnW6A4y2e8CP3F9SU&libraries=places"
            onLoad={this.handleScriptLoad}
          />
          <input
            id="autocomplete"
            placeholder=""
            value={this.state.query}
            onFocus={this.handleFocus}
            style={{
              margin: "0 auto",
              maxWidth: 800
            }}
          />
        </div>
      </div>
    );
  }
}
