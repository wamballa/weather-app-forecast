import React, { Component } from 'react'

export class CitySummary extends Component {

  handleFormSubmit(e) {
    e.preventDefault();
    console.log("Form submitted " + e.target.name);
    // this.props.city = e.target.name;
    console.log("form submitted props "+e.target.props);
  }
  // <div key={city.id}> {city.name} {city.sys.country} Coords: {city.coord.lat}, {city.coord.lon}</div>
  render() {
    let cityList = this.props.cityList.list || []; // if no items give an empty array
    // console.log("CitySummary citylist...", cityList);

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>

          {cityList.map((city) => (
            // how can i make these clickable?
            <div key={city.id}>
              <input type="button" className="link-button" name={city.id} value={city.name} onClick={this.handleFormSubmit}></input>
            </div>

          ))}

        </form>
      </div>
    )
  }
}

export default CitySummary
