import React, { Component } from 'react';

class Cell extends Component {
  getStyle = () => {
    let bkColor = 'white';
    if(this.props.endCell === true) {
      bkColor = 'red';
    } else {
      if(this.props.visited === true) bkColor = 'green';
    }

    return {
      borderTop: this.props.topWall ? '1px solid black' : 'none',
      borderRight: this.props.rightWall ? '1px solid black' : 'none',
      borderBottom: this.props.bottomWall ? '1px solid black' : 'none',
      borderLeft: this.props.leftWall ? '1px solid black' : 'none',
      backgroundColor: bkColor
    }
  }

  render() {
    return(
      <div 
        id={this.props.id} 
        style={this.getStyle()}
        onMouseOver={this.props.updateCell.bind(this, this.props.id)}
      >
      </div>
    );
  }
}

// todo: add prop validation

export default Cell;