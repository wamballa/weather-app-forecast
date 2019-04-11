import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
//import WeatherSummary from './components/weather/WeatherSummary';
import AddCard from './components/weather/AddCard';
import AddCardAuto from './components/weather/AddCardAuto'
import ShowCards from './components/weather/ShowCards';
// https://www.w3schools.com/howto/howto_js_autocomplete.asp
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
    // console.log("addCard() ",val);

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
        // cards: this.state.cards.filter((_, i) => i !== id)
        cards: state.cards.filter(
          card => card.id !== id
        )
      }
    });
  }

  render() {
    // console.log("app state = ", this.state);

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
