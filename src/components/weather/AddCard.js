import React, { Component } from 'react'
import SearchResults from './SearchResults';

export class AddCard extends Component {

  state = {
    cities: []
  }

  handleSubmit = async (e)=>{
    e.preventDefault();
    this.props.showCards(false);
    // const API_KEY = '626eR4h4xEHAihpvacPQzMiaEo822YxU'; // accuweather
    const API_KEY = 'e22d1c07fa47b19cb8d862add6c876d5'; // openweather
    const city = e.target.elements.city.value;
    // const url = `http://dataservice.accuweather.com/locations/v1/cities/search?$apikey=${API_KEY}&q=${city}`;
    const url = `http://api.openweathermap.org/data/2.5/find?q=${city}&type=like&sort=population&cnt=3&appid=${API_KEY}`;
    // console.log ("get city call = "+ call);
    const api_call = await fetch(url);;
    const data = await api_call.json();
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

  render() {

    return (
      <div>
        <div className="m-2">
          <form className="p-3 input-group mb-3" onSubmit={this.handleSubmit}>
            <div className="input-group-prepend"><span className="input-group-text">Location</span></div>
            <input type="text" name='city' className="form-control" placeholder="City" onFocus={this.handleFocus} onBlur={this.handleBlur} />

            <div className="input-group-append">
              <button className="btn btn-success" type="submit">Go</button>
            </div>
          </form>
        </div>
        {this.state.cities && <SearchResults
          cities = {this.state.cities}
          addCity={this.addCity} />}
      </div>
    )
  }
}

export default AddCard
