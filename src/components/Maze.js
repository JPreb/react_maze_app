import React, { Component } from 'react';
import Cell from './Cell';

// Factory function to create cell objects
function cell(r, c) {
  this.r = r;
  this.c = c;
  this.topWall = true;
  this.rightWall = true;
  this.bottomWall = true;
  this.leftWall = true;
  this.visited = false;
}

// MAZE CLASS
class Maze extends Component {
  constructor(props) {
    super(props);

    // The state holds an array of cell objects which represents each space in the maze.
    // These cell objects hold information about each 'wall' of a cell, which will be hidden
    // or shown when the maze itself is generated effectively opening up paths through the maze.
    this.state = {
      cells: []
    }
  }

  // After the component mounts it will generate the maze.
  componentDidMount() {
    this.generateMaze();
  }

  // All of the cell objects will be constructed according to the dimension of the maze (dimension 
  // will be passed in as a prop). The next step will be to carve out all the possible paths of the 
  // maze according to the back-tracking algorithm.
  generateMaze = () => {
    const { dimension } = this.props;

    let cells = [];
    for(let r = 0; r < dimension; r++) {
      for(let c = 0; c < dimension; c++) {
        cells.push(new cell(r, c));
      }
    }

    let numOfCells = cells.length - 1;
    let currentCell = Math.floor(Math.random() * numOfCells);
    let previousMoves = [];
    let directionChoices = [];
    let visitedCount = 0;
    let up = -dimension;
    let down = dimension;
    let right = 1;
    let left = -1;

    // Check to see which cells are around the current cell, and if they are visited.
    // If they are not visited push the possible direction to an array of possible directions.
    while(visitedCount <= numOfCells) {
      directionChoices = [];
      if (currentCell + up >= 0) {
          if(cells[currentCell + up].visited === false) {
              directionChoices.push("up");
          }
      }

      if (currentCell + down <= numOfCells) {
          if(cells[currentCell + down].visited === false) {
              directionChoices.push("down");
          }
      }

      if ((currentCell + 1) % dimension !== 0) {
          if(cells[currentCell + right].visited === false) {
              directionChoices.push("right");
          }
      }

      if (currentCell % dimension !== 0) {
          if(cells[currentCell + left].visited === false) {
              directionChoices.push("left");
          }
      }
      
      // If all nearby cells have been visited then go back one move and remove that move
      // from the history of all previous moves.
      if (directionChoices.length === 0) {
          currentCell += previousMoves[previousMoves.length - 1];
          previousMoves.pop();
      }
      else {
          ++visitedCount;
      }
    
      // Pick a random number between 0 and the number of possible directions
      let randomNum = Math.floor(Math.random() * (directionChoices.length));

      // Remove walls on both cells to carve out the path in the direction that was chosen.
      // Then set the currentCell to the moved to cell. Then add this move to the array of
      // previous moves. Mark the moved to cell as visited.
      if (directionChoices[randomNum] === "up") {
          cells[currentCell].topWall = false;
          currentCell += up;
          previousMoves.push(up * -1);
          cells[currentCell].bottomWall = false;
          cells[currentCell].visited = true;
      }
      else if (directionChoices[randomNum] === "right") {
          cells[currentCell].rightWall = false;
          currentCell += right;
          previousMoves.push(right * -1);
          cells[currentCell].leftWall = false;
          cells[currentCell].visited = true;
      }
      else if (directionChoices[randomNum] === "down") {
          cells[currentCell].bottomWall = false;
          currentCell += down;
          previousMoves.push(down * -1);
          cells[currentCell].topWall = false;
          cells[currentCell].visited = true;
      }
      else if (directionChoices[randomNum] === "left") {
          cells[currentCell].leftWall = false;
          currentCell += left;
          previousMoves.push(left * -1);
          cells[currentCell].rightWall = false;
          cells[currentCell].visited = true;
      }
    }

    this.setState({cells: cells});
  }

  getStyle = () => {
    return {
      margin: '0 auto',
      height: '500px',
      width: '500px',
      display: 'grid',
      gridTemplateColumns: `repeat(${this.props.dimension}, auto)`,
      gridTemplateRows: 'auto',
      border: '1px solid black'
    }
  }

  // This render includes iterating (mapping) through the cells array contained in the maze class state.
  // For each cell, it will create a cell component
  render() {
    return (
      <div style={this.getStyle()}>
        {this.state.cells.map((cell) => (
          <Cell 
            key={"r" + cell.r + "c" + cell.c} 
            id={"r" + cell.r + "c" + cell.c} 
            topWall={cell.topWall}
            rightWall={cell.rightWall}
            bottomWall={cell.bottomWall}
            leftWall={cell.leftWall}
          />
        ))}
      </div>
    );
  }
}

export default Maze;
