import React, { Component } from 'react'
import './weather.css'

export class Card extends Component {

  handleClick = () => {
    console.log(`City to delete: ${this.props.city.id}`);
    this.props.delCard(this.props.city.id);
  }

  firstWord = (totalWords) => {
    var firstWord = totalWords.replace(/ .*/, '');
    return firstWord;
  }

  render() {

    console.log('weathercard = ', this.props);
    // this.props.delCard();
    console.log('weathercard icon= ', this.props.city.icon);
    // const icon_url = 'http://openweathermap.org/img/w/' + this.props.city.icon + '.png';
    const icon_url = 'https://vortex.accuweather.com/adc2010/images/slate/icons/' + this.props.city.icon + '.svg';
    // this.handleCollapse();
    // {this.props.city.error && <h1 className='error'>{this.props.city.error}</h1>}
    const id = this.firstWord(this.props.city.city);
    const panelRef = "#" + id;
    // console.log("panel ref = " + panelRef);
    // the accordian parent should be in SHOWCARDS?

    return (

      <div className="card" data-toggle="collapse" data-parent="#accordion" href={panelRef}>

        <div className="card-heading card-primary">{this.props.city.city}, {this.props.city.country}</div>

        <div id={id} className="collapse">

          <div className="card-block">

            <div className="row weather bg-dark text-white shadow m-2 p-4 mb-4 ">

              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="info">
                  <div>&nbsp;</div>
                  <div className="city"><small><small>CITY: </small></small>{this.props.city.city}<div></div>{this.props.city.country}</div>
                  <div className="temp">{Math.round(this.props.city.temp)}&deg;<small>C</small></div>
                  <div>&nbsp;</div>
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-6" >
                <div className="icon">
                  <div>&nbsp;</div>
                  <img className='iconImage' src={icon_url} alt='' />
                  <div className="title">{this.props.city.mainDescription}</div>
                  <input type="button" value="Delete" onClick={this.handleClick}></input>
                  <div>&nbsp;</div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default Card
