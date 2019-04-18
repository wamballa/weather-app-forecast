import React, { Component } from 'react'
import Card from './Card'

export class ShowCards extends Component {

  render() {

    const cardList = this.props.cards;
    // console.log("SHOWCARDS cardsList = ",cardList);

    return (
      <div className="container">
        <div className="" id="accordion">

          {cardList.map((city) => (
            <Card key={Math.random()} city={city} delCard={this.props.delCard} />
          ))}

        </div>
      </div>
    )
  }
}

export default ShowCards
