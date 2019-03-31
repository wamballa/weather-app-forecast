import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import WeatherSummary from './components/weather/WeatherSummary';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <WeatherSummary />
      </div>
    );
  }
}

export default App;
