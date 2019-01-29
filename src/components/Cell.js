import React, { Component } from 'react';

class Cell extends Component {
  getStyle = () => {
    let bkColor = 'darkgreen';
    if(this.props.endCell === true) {
      bkColor = 'red';
    } else {
      if(this.props.visited === true) bkColor = 'lightgreen';
    }

    return {
      borderTop: this.props.topWall ? '2px solid black' : 'none',
      borderRight: this.props.rightWall ? '2px solid black' : 'none',
      borderBottom: this.props.bottomWall ? '2px solid black' : 'none',
      borderLeft: this.props.leftWall ? '2px solid black' : 'none',
      backgroundColor: bkColor
    }
  }

  render() {
    return(
      <div 
        id={this.props.id} 
        style={this.getStyle()}
        onMouseOver={this.props.updateCell.bind(this, this.props.id)
        }
      >
      </div>
    );
  }
}

export default Cell;