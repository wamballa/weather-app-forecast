import React, { Component } from 'react'
import SearchResults from './SearchResults';
import Script from 'react-load-script';
// import SearchBar from 'material-ui-search-bar';

export class AddCardAuto extends Component {

  state = {
    cities: [],
    city: undefined
  }


  ///////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.showCards(false);
    // const API_KEY = '626eR4h4xEHAihpvacPQzMiaEo822YxU'; // accuweather
    const API_KEY = 'e22d1c07fa47b19cb8d862add6c876d5'; // openweather
    const city = e.target.elements.city.value;
    // const url = `http://dataservice.accuweather.com/locations/v1/cities/search?$apikey=${API_KEY}&q=${city}`;
    // const url = `http://api.openweathermap.org/data/2.5/find?q=${city}&type=like&sort=population&cnt=3&appid=${API_KEY}`;
    const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU&q=${city}&details=false`
    // console.log ("get city call = "+ call);
    const api_call = await fetch(url);
    const data = await api_call.json();
    console.log('accuweather response ', data);
    this.setState({
      cities: data
    });
  }

  addCity = (val) => {
    this.props.addCard(val);
    this.setState({ cities: [] })
  };

  handleFocus = () => this.props.showCards(false);

  handleBlur = () => this.props.showCards(true);
  //   <form className="p-3 input-group mb-3" onSubmit={this.handleSubmit}>
  //   <div className="input-group-prepend"><span className="input-group-text">Location</span></div>
  //   <input type="text" name='city' className="form-control" placeholder="City" onFocus={this.handleFocus} onBlur={this.handleBlur} />

  //   <div className="input-group-append">
  //     <button className="btn btn-success" type="submit">Go</button>
  //   </div>
  // </form>
  handleScriptLoad = () => {
    // Declare Options For Autocomplete 
    var options = { types: ['(cities)'] };

    // Initialize Google Autocomplete 
    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), options);
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect = async () => {

    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let geocoder = new google.maps.Geocoder();

    console.log("address object ", addressObject);
    let address = addressObject.address_components;


    // Check if address is valid
    if (address) {
      let latitude = parseFloat(addressObject.geometry.location.lat());
      let longitude = parseFloat(addressObject.geometry.location.lng());
      let location = latitude + ','+ longitude;

      console.log("address = ", address);
      console.log("location lat/long " +location);
      console.log("address = " + address[0].long_name);
      const url = `http://dataservice.accuweather.com//locations/v1/cities/geoposition/search?apikey=626eR4h4xEHAihpvacPQzMiaEo822YxU&q=${location}`
      const api_call = await fetch(url);
      const data = await api_call.json();
      console.log('accuweather response ', data);
      console.log('accuweather city ID '+data.Key);
      // Set State
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
        }
      );
    }
  }

  render() {

    return (
      <div>
        <div className="m-2">
          <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBp4lsvgALACqdsxsEnW6A4y2e8CP3F9SU&libraries=places" onLoad={this.handleScriptLoad} />
          <input id="autocomplete" placeholder="" value={this.state.query}
            style={{
              margin: '0 auto',
              maxWidth: 800,
            }}
          />


        </div>

      </div>
    )
  }
}

export default AddCardAuto
