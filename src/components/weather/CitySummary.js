import React, { Component } from 'react'

export class CitySummary extends Component {

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  handleFormSubmit() {
    console.log("Form submitted");
  }

  render() {
    let cityList = this.props.cityList.list || []; // if no items give an empty array

    console.log("CitySummary citylist...", cityList);

    return (
      <div>
        <form  onSubmit={this.handleFormSubmit}>

          {cityList.map((city) => (
            // how can i make these clickable?
            <div key={city.id}> {city.name} {city.sys.country} Coords: {city.coord.lat}, {city.coord.lon}</div>
          ))}

        </form>
      </div>
    )
  }
}

export default CitySummary
