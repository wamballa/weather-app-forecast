import React, { Component } from 'react';
import Script from 'react-load-script';


export default class AddWeatherCardManually extends Component {

  state = {
    city: undefined
  };

  getWeather = async cityInfo => {
    let data = [];
    // let api_call;
    let url = `http://dataservice.accuweather.com//currentconditions/v1/${cityInfo.cityId}?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU&detail=true`;

    await fetch(url)
      .then(async function (response) {
        data = await response.json();
        // console.log('repsonse OK ', data);
      })
      .catch(function (error) {
        console.log('Error in Accuweather getting current conditions: ', error);
      });

    // let data = await api_call.json();
    // console.log('weather results raw data is ', data);

    // 5 day forecast
    //  url = `http://dataservice.accuweather.com//forecasts/v1/daily/5day/329149?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU&metric=true`;
    //  api_call = await fetch(url);
    //  data = await api_call.json();
    // console.log('5 day weather results data is ', data);

    // let time = data[0].LocalObservationDateTime.format('dd/MM/yyyy hh:mm TT');

    if (data[0] && data[0].WeatherText) {
      this.addCity({
        city: cityInfo.cityName,
        id: cityInfo.cityId,
        country: cityInfo.countryName,
        description: data[0].WeatherText,
        temp: data[0].Temperature.Metric.Value,
        icon: data[0].WeatherIcon,
        image: cityInfo.image,
        time: data[0].LocalObservationDateTime,
        error: ''
      });
    } else {
      console.error('Error: with choice of City or Country');
    }
  };

  addCity = val => {
    this.props.addCard(val);
  };

  handleFocus = () => {
    // console.log('handle focus ' + this.state.query);
    // document.getElementById('autocomplete').value = '';
    this.setState({ query: undefined });
  };
  handleBlur = () => {
    console.log('handle blur ' + this.state.query);
    this.setState({ query: undefined });
  };
  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    var options = { types: ['(cities)'] };

    // Initialize Google Autocomplete
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options
    );


    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  };

  handlePlaceSelect = async () => {
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;
    // console.log('Address Object = ', addressObject);

    // Check if address is valid
    if (address[0]) {
      const location =
        parseFloat(addressObject.geometry.location.lat()) +
        ',' +
        parseFloat(addressObject.geometry.location.lng());
        // console.log('location ',location);
      const url = `http://dataservice.accuweather.com//locations/v1/cities/geoposition/search?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU&q=${location}`;
      const apiCall = await fetch(url);
      const data = await apiCall.json();

      // Set State
      this.setState({
        query: undefined
      });

      // Get location image
      let photos = addressObject.photos;
      let picUrl = (photos[0]) ? photos[0].getUrl() : 'https://spacecoastdaily.com/wp-content/uploads/2018/04/NASA-4K-Moon-Footage-580-2.jpg';
      // console.log('photos ' + picUrl);

      const cityInfo = {
        cityId: data.Key, //gets the accuweather city id to use with accuweather weather search
        cityName: address[0].long_name, //uses google city name for concistency
        countryName: data.Country.EnglishName, // uses accuweather country name as google returns variable array size in response
        image: picUrl
      };

      this.getWeather(cityInfo);

      this.props.toggleEdit();
    }
  };

  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <form className='form-inline d-flex my-0 py-2 justify-content-center'>
            <div className='input-group'>
              <Script
                url='https://maps.googleapis.com/maps/api/js?key=AIzaSyBp4lsvgALACqdsxsEnW6A4y2e8CP3F9SU&libraries=places'
                onLoad={this.handleScriptLoad}
              />

              <input
                type='search'
                className='form-control'
                id='autocomplete'
                placeholder='Search city'
                value={this.state.query}
                onFocus={this.handleFocus}
                style={{
                  margin: '0 auto',
                  maxWidth: 800
                }}
              />
              <div className='input-group-append'><button className='btn btn-primary' type='button'><i className='fa fa-search'></i></button></div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
