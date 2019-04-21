import React, { Component } from 'react'
// import Card from './Card'
import Card1 from './Card.1'

export default class ShowCards1 extends Component {

  render() {

    const cardList = this.props.cards;
    // console.log("SHOWCARDS cardsList = ",cardList);

    return (
      <div className="container">
        <div className="" id="accordion">

          {cardList.map((city) => (
            <Card1 key={Math.random()} city={city} delCard={this.props.delCard} />
          ))}

        </div>
      </div>
    )
  }
}