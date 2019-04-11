import React, { Component } from 'react'
import Card from './Card'

export class ShowCards extends Component {



  render() {

    // console.log('showcards prop ',this.props.cards);
    // console.log('showcards prop.... ',this.props.cards[0]);
    let cardList = this.props.cards;
    console.log('showcards prop ',cardList);
    // console.log('cardList '+cardList.length);
    // if (cardList.length == 0){
    //   console.log ("Card list empty",this.props.cards)
    // } else {
    //   console.log('card list not empty.... ',this.props.cards);

    // }
    // console.log('showcards prop.... ',this.props.cards[0]);
    // console.log('showcards icon ',cardList[0].icon);
    // const icon_url = 'http://openweathermap.org/img/w/' + this.props.cards.icon + '.png';
    // console.log('Showcard props '+icon_url);

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
