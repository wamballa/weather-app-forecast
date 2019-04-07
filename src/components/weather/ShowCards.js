import React, { Component } from 'react'

export class ShowCards extends Component {



  render() {

    console.log('showcards prop ',this.props.cards);
    const cardList = this.props.cards;
    console.log('showcards icon ',cardList[0].icon);
    const icon_url = 'http://openweathermap.org/img/w/' + this.props.cards.icon + '.png';
    console.log('Showcard props '+icon_url);

    return (
      <div>
        <h1>showcards</h1>
      </div>
    )
  }
}

export default ShowCards
