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

  addCard = (val) => {
    console.log("addCard() ",val);

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
    console.log("app state = ",this.state);
    return (
      <div className="App">
        <Navbar />
        <React.Fragment>
          <AddCard addCard={this.addCard}/>
          {this.state.cards && <ShowCards cards={this.state.cards}/>}

        </React.Fragment>

      </div>
    );
  }
}

export default App;
