import React, { Component } from 'react';
// import Navbar from './components/layout/Navbar';
import AddCardAuto from './components/weather/AddCardAuto.1'
import ShowCards from './components/weather/ShowCards.1';


export default class App1 extends Component {
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

        <div className="w-100 border-0 py-3">
          <div className="container border rounded border-dark">
            <div className="row">
              <div className="col-md-12">

                <div className="row">
                  <div className="d-flex bg-info col-md-6 align-items-stretch">
                    <h3 className="py-0 my-0"><i className="fa fa-certificate"></i>  Weather</h3>
                  </div>
                  <div className="col-md-6 flex-grow-1 d-flex align-items-center justify-content-end w-75 bg-info">
                    <a className="btn btn-primary align-items-center addButton" value="add" onClick={this.handleClick} href="#">Add</a>
                  </div>
                </div>

                <div className="row">
                  <div className="card-body">
                    {this.state.showInput && <AddCardAuto addCard={this.addCard} showCards={this.showCards} />}
                    {this.state.show && <ShowCards cards={this.state.cards} delCard={this.delCard} />}
                  </div>

                </div>




              </div>




            </div>
          </div>
        </div>
      </div>
    );
  }
}