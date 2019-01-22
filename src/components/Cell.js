import React, { Component } from 'react';

class Cell extends Component {
  getStyle = () => {
    return {
      borderTop: this.props.topWall ? '1px solid black' : 'none',
      borderRight: this.props.rightWall ? '1px solid black' : 'none',
      borderBottom: this.props.bottomWall ? '1px solid black' : 'none',
      borderLeft: this.props.leftWall ? '1px solid black' : 'none'
    }
  }

  render() {
    return(
      <div 
        id={this.props.id} 
        style={this.getStyle()}>
      </div>
    );
  }
}

export default Cell;