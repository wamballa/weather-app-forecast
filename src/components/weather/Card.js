import React, { Component } from 'react'
import Moment from 'react-moment';
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


  checkTime = (i) => {
    console.log("CARD checkTime");
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
  }

  getTime = () => {
    console.log("CARD startTime");
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = this.checkTime(m);
    s = this.checkTime(s);
    let time = h + ":" + m;
    return time;
  }


  render() {

    console.log('Card props = ', this.props);
    console.log("time = "+this.props.city.time);
    // console.log('weathercard icon= ', this.props.city.icon);
    const icon_url = 'https://vortex.accuweather.com/adc2010/images/slate/icons/' + this.props.city.icon + '.svg';
    const id = this.firstWord(this.props.city.city);
    const panelRef = "#" + id;

    return (

      <div className="card" data-toggle="collapse" data-parent="#accordion" href={panelRef}>

        <div className="card-heading card-primary">

          <div className="row centered">


            <div className="col title text-center">
              <ul>
                <li><Moment format="HH:mm">{this.props.city.time}</Moment></li>
                <li>{this.props.city.city}</li>
              </ul>



            </div>
            <div className="col center"><img className='iconImageSmall' src={icon_url} alt='' /></div>
            <div className="col tempSummary">{Math.round(this.props.city.temp)}°C</div>

          </div>

        </div>

        <div id={id} className="collapse">

          <div className="card-block">
            <div className="row weather bg-dark text-white shadow">

              <div className="col-sm-6 col-md-6 col-lg-6 column">
                <div className="info">
                  <img className="picTure card-img-top post-content" src={this.props.city.image} alt={this.props.city.city} />
                  <div>&nbsp;</div>
                  <div className="city"><small><small>CITY: </small></small>{this.props.city.city}<div></div>{this.props.city.country}</div>
                  <div className="temp">{Math.round(this.props.city.temp)}&deg;<small>C</small></div>
                  <div>&nbsp;</div>
                </div>
              </div>

              <div className="col-sm-6 col-md-6 col-lg-6 column icon" >
                {/* <div className="col"> */}
                <div className=""><img className='iconImage' src={icon_url} alt='' /></div>
                <div className="title text-center pagination-centered">{this.props.city.description}</div>
                <div className=""><input type="button" value="Delete" onClick={this.handleClick}></input></div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card
