import React, { Component } from 'react';
import Cell from './Cell';

// Factory function to create cell objects
function cell(index) {
  this.id = index;
  this.topWall = true;
  this.rightWall = true;
  this.bottomWall = true;
  this.leftWall = true;
  this.visited = false;
  this.endCell = false;
}

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
        cells.push(new cell(r * dimension + c));
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

    // Mark all cells back to not visited
    cells.map(cell => cell.visited = false);

    // Choose and set a random ending cell
    // Chosen cell is a random cell in the top row
    let randomEnd = Math.floor(Math.random() * dimension);
    cells[randomEnd].endCell = true;

    // Choose and set a random starting cell
    // Chosen cell is a random cell in the bottom row
    let min = cells.length - dimension;
    let max = cells.length;
    let randomStart = Math.floor(Math.random() * (max - min) + min);

    // Mark start cell as current cell
    cells[randomStart].visited = true;

    this.setState({cells: cells});
  }

  // Styling for grid
  getStyle = () => {
    return {

      margin: '0 auto',
      height: '85vmin',
      width: '85vmin',
      display: 'grid',
      gridTemplateColumns: `repeat(${this.props.dimension}, auto)`,
      gridTemplateRows: 'auto',
      border: '2px solid black'
    }
  }

  // This is called when the mouse hovers over a cell. It passes in the cell id and then this function determines
  // if that cell is a valid cell to move to. If it is, it updates the cells array and re-renders the grid with the
  // new cell background color as green.
  updateCell = (currentCell) => {
    this.setState(function(state, props) {
      const { dimension } = props;
      let up = -dimension;
      let down = dimension;
      let right = 1;
      let left = -1;

      let cells = state.cells;

      // Check if cell above is valid (not outside bounds of grid/maze)
      if(currentCell + up >= 0) {
        // Check if cell above has no bottom wall and current cell has no top wall (pathway open)
        if(cells[currentCell].topWall === false && cells[currentCell + up].bottomWall === false) {
          // Check if above cell has been visited
          if(cells[currentCell + up].visited === true) {
            // Check if current cell is end cell, if it is, win the game
            if(cells[currentCell].endCell === true) {
              this.props.onRouteChange('StartMenu');
            // If not, mark current cell as visited (green)
            } else {
              cells[currentCell].visited = true;
              cells[currentCell + up].visited = false;
            }
          }
        }
      }
      
      // Repeat steps above for the remaining cells around the cell the mouse cursor is over
      if(currentCell + down <= cells.length - 1) {
        if(cells[currentCell].bottomWall === false && cells[currentCell + down].topWall === false) {
          if(cells[currentCell + down].visited === true) {
            if(cells[currentCell].endCell === true) {
              this.props.onRouteChange('StartMenu');
            } else {
              cells[currentCell].visited = true;
              cells[currentCell + down].visited = false;
            }
          }
        }
      } 
      
      if(currentCell + left >= 0) {
        if(cells[currentCell].leftWall === false && cells[currentCell + left].rightWall === false) {
          if(cells[currentCell + left].visited === true) {
            if(cells[currentCell].endCell === true) {
              this.props.onRouteChange('StartMenu');
            } else {
              cells[currentCell].visited = true;
              cells[currentCell + left].visited = false;
            }
          }
        }
      } 
      
      if(currentCell + right <= cells.length - 1) {
        if(cells[currentCell].rightWall === false && cells[currentCell + right].leftWall === false) {
          if(cells[currentCell + right].visited === true) {
            if(cells[currentCell].endCell === true) {
              this.props.onRouteChange('StartMenu');
            } else {
              cells[currentCell].visited = true;
              cells[currentCell + right].visited = false;
            }
          }
        }
      }

      return {
        cells: cells
      };
    });
  }

  // This render includes iterating (mapping) through the cells array contained in the maze class state.
  // For each cell, it will create a cell component
  render() {
    return (
      <div style={this.getStyle()}>
        {this.state.cells.map(cell => (
          <Cell
            key={cell.id} 
            id={cell.id}
            topWall={cell.topWall}
            rightWall={cell.rightWall}
            bottomWall={cell.bottomWall}
            leftWall={cell.leftWall}
            visited={cell.visited}
            endCell={cell.endCell}
            updateCell={this.updateCell}
          />
        ))}
      </div>
    );
  }
}

export default Maze;
