import React, { Component } from 'react';
import Script from 'react-load-script';
import {
  getCurrentPosition,
  getAccuweatherDataFromLocation,
  getPlaceID
} from '../../helpers/helpers';

export default class AddWeatherCardAutomatically extends Component {

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
      })
      .catch(function (error) {
        console.log('Error in Accuweather getting current conditions: ', error);
      });

    // 5 day forecast
    //  url = `http://dataservice.accuweather.com//forecasts/v1/daily/5day/329149?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU&metric=true`;
    //  api_call = await fetch(url);
    //  data = await api_call.json();
    // console.log('5 day weather results data is ', data);

    // let time = data[0].LocalObservationDateTime.format('dd/MM/yyyy hh:mm TT');

    if (data[0].WeatherText) {
      this.addCity({
        city: cityInfo.cityName,
        id: cityInfo.cityId,
        country: cityInfo.countryName,
        description: data[0].WeatherText,
        temp: data[0].Temperature.Metric.Value,
        icon: data[0].WeatherIcon,
        image: cityInfo.image,
        time: data[0].LocalObservationDateTime,
        locationFlag: 'fa fa-compass',
        error: ''
      });
    } else {
      console.error('Error: with choice of City or Country');
    }
  };

  fetchCoordinates = async (_this) => {

    try {

      const { coords } = await getCurrentPosition(); //
      var { latitude, longitude } = coords; //
      var geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(latitude, longitude);

      var request1 = {
        location: latlng
      }

      geocoder.geocode(request1, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {

          var request = {
            placeId: getPlaceID(results),
          };

          var service = new google.maps.places.PlacesService(document.createElement('div'));
          service.getDetails(request, (address, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              // var photos = address.photos;
              var picUrl = address.photos[0].getUrl();

              let accuweatherData = '';
              ; (async () => {
                accuweatherData = await getAccuweatherDataFromLocation(latitude, longitude);

                const cityInfo = {
                  cityId: accuweatherData.Key, //gets the accuweather city id to use with accuweather weather search
                  cityName: accuweatherData.EnglishName, //uses google city name for concistency
                  countryName: accuweatherData.Country.EnglishName, // uses accuweather country name as google returns variable array size in response
                  image: picUrl
                };

                _this.getWeather(cityInfo);

              })();
            }
          });
        };
      });

    } catch (error) { //
      // Handle error
      console.error(error);//
    }
  };

  addCity = val => {
    this.props.addCard(val);
  };

  handleScriptLoad = async () => {
    /*global google*/
    this.fetchCoordinates(this);
  };

  render() {
    return (
      <div className='row'>
        <div className='col-md-12'>
          <form className='form-inline d-flex my-0 py-2 justify-content-center'>
            <div className='input-group'>
              <Script
                url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBp4lsvgALACqdsxsEnW6A4y2e8CP3F9SU&libraries=places"
                onLoad={this.handleScriptLoad}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
