import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import WeatherSummary from './components/weather/WeatherSummary';
import AddCard from './components/weather/AddCard';
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
    // console.log("addCard() ",val);

    this.setState({cards:
      [...this.state.cards, val]});

      this.setState({
        show: true
      })
  }

  delCard = () => {
    console.log("deleCard()");
  }

  render() {
    console.log("app state = ",this.state.show);
    return (
      <div className="App">
        <Navbar />
        <React.Fragment>
          <AddCard addCard={this.addCard} showCards={this.showCards}/>
          {this.state.show && <ShowCards cards={this.state}/>}

        </React.Fragment>

      </div>
    );
  }
}

export default App;
