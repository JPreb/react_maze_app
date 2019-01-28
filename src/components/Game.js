import React, { Component } from 'react';
import Maze from './Maze';

class Game extends Component {
  render() {
    let dimension = 25;
    return(
      <div>
        <Maze dimension={dimension}/>
      </div>
    );
  }
}

export default Game;