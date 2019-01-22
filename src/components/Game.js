import React, { Component } from 'react';
import Maze from './Maze';

class Game extends Component {
  render() {
    let dimension = 15;
    return(
      <div>
        <Maze dimension={dimension}/>
      </div>
    );
  }
}

export default Game;