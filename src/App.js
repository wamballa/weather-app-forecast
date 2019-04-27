import React, { Component } from 'react';
import AddWeatherCardManually from './components/weather/AddWeatherCardManually';
import AddWeatherCardAutomatically from './components/weather/AddWeatherCardAutomatically';
import ShowWeatherCards from './components/weather/ShowWeatherCards';

export default class App1 extends Component {
  constructor() {
    super();
    this.editMode = false;
  }
  state = {
    cards: [],
    show: false,
    showInput: false,
    mode: 'edit',
    editMode: false,
    buttonClass:
      'btn btn-primary align-items-center addButton fa fa-3 fa-info-circle'
  };

  showCards = val => {
    this.setState({
      show: val
    });
  };

  addCard = val => {
    this.setState({
      cards: [...this.state.cards, val],
      show: true,
      showInput: false
    });
  };

  delCard = id => {
    // console.log('deleCard() state ' + this.state.cards[0].id);

    this.setState(state => {
      return {
        cards: state.cards.filter(card => card.id !== id)
      };
    });
  };

  handleClick = e => {
    this.toggleEditMode();
    // console.log('2 edit mode = ' + this.state.editMode);
  };

  toggleEditMode = () => {
    const base = 'btn btn-primary align-items-center';
    const fade = ' addButton';
    const edit = ' fa fa-2 fa-info-circle';
    const done = ' fa fa-2 fa-thumbs-o-up';

    this.editMode = !this.editMode;
    // console.log("1 edit mode = " + this.state.editMode);

    if (this.editMode) {
      this.setState({
        editMode: true,
        buttonClass: base + done
      });
    } else {
      this.setState({
        editMode: false,
        buttonClass: base + fade + edit
      });
    }
  };

  render() {
    return (
      <div className='App'>
        <div className='w-100 border-0 py-3'>
          <div className='container border rounded border-dark'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='row'>
                  <div className='d-flex bg-info col-md-6 align-items-stretch'>
                    <h3 className='py-0 my-0'>
                      <i className='fa fa-certificate' /> Weather
                    </h3>
                  </div>
                  <div className='col-md-6 flex-grow-1 d-flex align-items-center 
                  justify-content-end w-75 bg-info'>
                    <button className={this.state.buttonClass} onClick={this.handleClick}/>
                  </div>
                </div>

                <div className='row'>
                  <div className='card-body'>
                    {/* {this.state.cards.length === 0 && (
                      <AddWeatherCardAutomatically
                        toggleEdit={this.toggleEditMode}
                        addCard={this.addCard}
                        showCards={this.showCards}
                      />
                    )} */}
                    {this.state.show && (
                      <ShowWeatherCards
                        cards={this.state.cards}
                        editMode={this.editMode}
                        delCard={this.delCard}
                      />
                    )}
                    {this.state.editMode && (
                      <AddWeatherCardManually
                        toggleEdit={this.toggleEditMode}
                        addCard={this.addCard}
                        showCards={this.showCards}
                      />
                    )}
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