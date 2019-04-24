import React, { Component } from 'react'
import Moment from 'react-moment';
// import './weather.css'

export default class Card1 extends Component {

  handleClick = () => {
    console.log(`City to delete: ${this.props.city.id}`);
    this.props.delCard(this.props.city.id);
  }

  firstWord = (totalWords) => {
    var firstWord = totalWords.replace(/ .*/, '');
    return firstWord;
  }

  getClass = (mode)=> {
    const baseClass = "fa fa-3x fa-times-circle red";
    const visible = " visible";
    let className = "";
    if (mode){
      className = baseClass + " showButton";
    } else {
      className = baseClass + " hideButton";
    }
    return className;
    // "<i className="fa fa-3x fa-times-circle visible" onClick=${this.handleClick}></i>`
  }

  render() {

    console.log('Card props = ', this.props);
    console.log("time = " + this.props.city.time);
    // console.log('weathercard icon= ', this.props.city.icon);
    const icon_url = 'https://vortex.accuweather.com/adc2010/images/slate/icons/' + this.props.city.icon + '.svg';
    const id = this.firstWord(this.props.city.city);
    const panelRef = "#" + id;
    const imageBGstyle = {
      backgroundImage: `url('${this.props.city.image}')`,
      // filter: `brightness(50%)`
    };
    console.log("image = " + imageBGstyle);

    const cardDeleteClass = this.getClass(this.props.editMode);

    return (

      <div data-toggle="collapse" data-parent="#accordion" href={panelRef}>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row border-bottom  py-1">
                <div className="col-md-1 d-flex justify-content-center align-items-center"><i className={cardDeleteClass} onClick={this.handleClick}></i></div>
                <div className="col-md-3 text-center justify-content-center d-flex flex-column">
                  <div className="row w-100">
                    <div className="col-md-12">
                      <h5 className="my-0"><Moment format="HH:mm">{this.props.city.time}</Moment></h5>
                    </div>
                  </div>
                  <div className="row w-100">
                    <div className="col-md-12">
                      <h4 className="my-0">{this.props.city.city}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-center"><img className='iconImage' src={icon_url} alt='' /></div>
                <div className="col-md-4">
                  <h1 className="display-4 my-0 text-center">{Math.round(this.props.city.temp)}°C</h1>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div id={id} className="collapse">


          <div className="container">
            <div className="row border-bottom">
              <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center px-0 imageColumn" style={imageBGstyle}>
                <div className="row w-100 maxBright">
                  <div className="col-md-12">
                    <h1 className="text-white my-0 imageText">City: {this.props.city.city}</h1>
                  </div>
                </div>
                <div className="row w-100">
                  <div className="col-md-12">
                    <h3 className="text-white my-0 imageText">{this.props.city.country}</h3>
                    <h3 className="display-3 text-white my-0 imageText">{Math.round(this.props.city.temp)}&deg;C</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-6 justify-content-center align-items-center d-flex flex-column px-0 mx-0">
                <div className="row w-100 my-1">
                  <div className="col-md-12 text-center px-0"><img className='iconImage' src={icon_url} alt='' /></div>
                </div>
                <div className="row w-100">
                  <div className="col-md-12 text-center mx-0 px-0">
                    <h1 className="display-4 w-100 py-0 px-0 my-0 mx-0">{this.props.city.description}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>












        </div>






      </div>
    )
  }
}