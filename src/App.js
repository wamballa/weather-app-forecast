import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import AddCardAuto from './components/weather/AddCardAuto'
import ShowCards from './components/weather/ShowCards';
import './App.css';

class App extends Component {
  state = {
    cards: [],
    show: false
  }

  showCards = (val) => {
    this.setState({
      show: val
    })
  }

  addCard = (val) => {

    this.setState({
      cards:
        [...this.state.cards, val],
      show: true
    });
  }

  delCard = (id) => {
    console.log("deleCard() state " + this.state.cards[0].id);

    this.setState(state => {
      return {
        cards: state.cards.filter(
          card => card.id !== id
        )
      }
    });
  }

  render() {

    return (
      <div className="App">
        <Navbar />
        <React.Fragment>

          <AddCardAuto addCard={this.addCard} showCards={this.showCards} />
          {this.state.show && <ShowCards cards={this.state.cards} delCard={this.delCard} />}

        </React.Fragment>

      </div>
    );
  }
}

export default App;
