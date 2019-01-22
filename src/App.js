import React, { Component } from 'react';
import Game from './components/Game';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Maze Game</h2>
          <Game />
      </div>
    );
  }
}

export default App;
