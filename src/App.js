import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import AddCardAuto from './components/weather/AddCardAuto'
import ShowCards from './components/weather/ShowCards';
import './App.css';

class App extends Component {
  state = {
    cards: [],
    show: false,
    showInput: false,
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
      show: true,
      showInput: false
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

  handleClick = () => {
    this.setState({
      showInput: true
    })
  }

  render() {

    return (
      <div className="App">
        {/* <Navbar /> */}
        <React.Fragment>

          <div className="card">
            <div className="row card-header">
              <div className="col-sm-6 col-md-6 col-lg-6">
                Weather App
            </div>
              <div className=" col-sm-6 col-md-6 col-lg-6">
                <div className="addButton">
                  <input type="button" value="Add" onClick={this.handleClick}></input>
                </div>
              </div>
            </div>
            <div className="card-body">
              {this.state.showInput && <AddCardAuto addCard={this.addCard} showCards={this.showCards} />}
              {this.state.show && <ShowCards cards={this.state.cards} delCard={this.delCard} />}
            </div>


          </div>






        </React.Fragment>

      </div>
    );
  }
}

export default App;
