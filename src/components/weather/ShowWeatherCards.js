import React, { Component } from 'react'
import WeatherCard from './WeatherCard'

export default class ShowCards1 extends Component {

  render() {

    const cardList = this.props.cards;
    // console.log('SHOWCARDS cardsList = ',cardList);

    return (
      <div className='container'>
        <div className='' id='accordion'>

          {cardList.map((city) => (
            <WeatherCard key={Math.random()} editMode={this.props.editMode} city={city} delCard={this.props.delCard} />
          ))}

        </div>
      </div>
    )
  }
}