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

    // console.log('weathercard = ', this.props);
    // console.log('weathercard icon= ', this.props.city.icon);
    const icon_url = 'https://vortex.accuweather.com/adc2010/images/slate/icons/' + this.props.city.icon + '.svg';
    const id = this.firstWord(this.props.city.city);
    const panelRef = "#" + id;

    return (

      <div className="card" data-toggle="collapse" data-parent="#accordion" href={panelRef}>

        <div className="card-heading card-primary">

          <div className="row">
            <div className="col">{this.props.city.city}</div>
            <div className="col"><img className='iconImageSmall' src={icon_url} alt='' /></div>
            <div className="col">{Math.round(this.props.city.temp)}°C</div>
          
          </div>

        </div>

        <div id={id} className="collapse">

          <div className="card-block">
            <div className="row weather bg-dark text-white shadow m-2 p-4 mb-4 ">

              <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="info">
                  <img className="card-img-top" src={this.props.city.image} alt={this.props.city.city}/>
                  <div>&nbsp;</div>
                  <div className="city"><small><small>CITY: </small></small>{this.props.city.city}<div></div>{this.props.city.country}</div>
                  <div className="temp">{Math.round(this.props.city.temp)}&deg;<small>C</small></div>
                  <div>&nbsp;</div>
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-6 container" >
                <div className="row">
                  <div className="col align-self-start"><img className='iconImage' src={icon_url} alt='' /></div>
                  <div className="title col align-self-center">{this.props.city.description}</div>
                  <div className="col align-self-end"><input type="button" value="Delete" onClick={this.handleClick}></input></div>
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
