import React, { Component } from 'react'
import './weather.css'

export class Card extends Component {

  handleClick = () => {
    console.log(`City to delete: ${this.props.city.id}`);
    this.props.delCard(this.props.city.id);
  }

  render() {

    console.log('weathercard = ', this.props);
    // this.props.delCard();
    console.log('weathercard icon= ', this.props.city.icon);
    const icon_url = 'http://openweathermap.org/img/w/' + this.props.city.icon + '.png';


    return (
      <div className="container-fluid">
        {this.props.city.error && <h1 className='error'>{this.props.city.error}</h1>}
        {
          this.props.city.city &&

          <div className="row weather bg-dark text-white shadow m-2 p-4 mb-4 ">

            <div className="col-sm-6 col-md-6 col-lg-6">
              {/* <div className="weather blue-grey darken-1"> */}
              {/* <div className="current"> */}
              <div className="info">
                <div>&nbsp;</div>
                <div className="city"><small><small>CITY: </small></small>{this.props.city.city}</div>
                <div className="temp">{Math.round(this.props.city.temp)}&deg;<small>C</small></div>
                <div className="wind"><small><small>WIND: </small></small>{Math.round(this.props.city.windSpeed)} mph</div>
                <div>&nbsp;</div>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-6" >
              <div className="icon iconImage">
                {/* <div>&nbsp;</div> */}
                {this.props.city.icon && <img className='graphic' src={icon_url} alt='' />}
                {/* <div>&nbsp;</div> */}
                <div className="title">{this.props.city.mainDescription}</div>
                <div className="sub">{this.props.city.description}</div>
                <div>{this.props.city.id}</div>
                <input type="button" value="Delete" onClick={this.handleClick}></input>
              </div>
            </div>

          </div>
        }
      </div>
    )
  }
}

export default Card
