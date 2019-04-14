import React, { Component } from 'react'
import Card from './Card'

export class ShowCards extends Component {



  render() {

    const cardList = this.props.cards;

    return (
      <div>
        {cardList.map((city) => (
          <Card key={Math.random()} city={city} delCard={this.props.delCard}/>
        ))}
      </div>
    )
  }
}

export default ShowCards
