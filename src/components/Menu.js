import React, { Component } from 'react';

class Menu extends Component {
  onSubmit = () => {
    this.props.onRouteChange('PlayGame');
  }
  
  render() {
    return (  
      <div>
        <h3>Play Again?</h3>
        <button onClick={this.onSubmit}>Play</button>
      </div>
    );
  }
}

export default Menu;