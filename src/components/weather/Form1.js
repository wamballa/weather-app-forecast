import React, { Component } from 'react'

export class Form1 extends Component {

  constructor(){
    super();

  }

  showSearchData = (data) => {
    console.log("....showSearhData cityList", data);
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

      var row = `<div><input type="button" class="link-button" name="Paris" value="...Paris" onClick="${this.getWeather}"></input></div>`; 
      html = html + row;
    }
    console.log("HTML = "+html);
    // return html;
    document.getElementById('search_output').innerHTML = html;
  }

  findCity = async (e) => {
    console.log("....Form1 findCity");
    const API_KEY = 'e22d1c07fa47b19cb8d862add6c876d5';
    e.preventDefault();

    // const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const city = e.target.elements.city.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/find?q=${city}&type=like&sort=population&appid=${API_KEY}`);
    // console.log('API CALL ', api_call);
    const data = await api_call.json();
    // console log all API call data
    // console.log("search results ", data);
    // this.cityList = data;
    console.log("....Form1 findCity data ", data);
    // console.log("cityList", this.cityList);
    // this.props.cityList = data;
  };

  render() {
    let cityList = this.props.cityList;
    return (
      <div>
        <div className="m-2">
          {/* <form className="p-3 input-group mb-3" onSubmit={props.getWeather}> */}
          <form className="p-3 input-group mb-3" onSubmit={props.findCity}>
            <div className="input-group-prepend"><span className="input-group-text">Location</span></div>
            <input type="text" name='city' className="form-control" placeholder="City" />
            {/* <input type="text" name='country' className="form-control" placeholder="Country" /> */}
            <div className="input-group-append">
              <button className="btn btn-success" type="submit">Go</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Form1
