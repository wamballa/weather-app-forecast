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

    this.setState({
      cards:
        [...this.state.cards, val]
    });

    this.setState({
      show: true
    })
  }

  delCard = (id) => {
    console.log("deleCard() state " + this.state.cards[0].id);

    this.setState({
      // cards: this.state.cards.filter((_, i) => i !== id)
      cards: [...this.state.cards.filter(
        card => card.id !== id
      )]
    });
    // this.setState ({
    //   todos: [...this.state.todos.filter(
    //     todo => todo.id!==id
    //   )]});
    // Axios.delete("https://jsonplaceholder.typicode.com/todos/${id}")
    //   .then(res => this.setState({
    //     todos:
    //       [...this.state.todos.filter(todo => todo.id !== id)]
    //   }));

  }

  render() {
    console.log("app state = ", this.state);
    return (
      <div className="App">
        <Navbar />
        <React.Fragment>
          <AddCard addCard={this.addCard} showCards={this.showCards} />
          {this.state.show && <ShowCards state={this.state} delCard={this.delCard} />}

        </React.Fragment>

      </div>
    );
  }
}

export default App;
