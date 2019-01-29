import React, { Component } from 'react';
import Maze from './components/Maze';
import Menu from './components/Menu';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'PlayGame',
      dimension: 25
    }
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
  }

  render() {
    return (
      <div className="App">
        <h1 style={{fontSize: '4vmin', margin: '0.5vmin'}}>Maze Game</h1>
        { this.state.route === 'StartMenu'
          ? 
          <Menu onRouteChange={this.onRouteChange} />
          : 
          <div>
            <Maze dimension={this.state.dimension} onRouteChange={this.onRouteChange} />
            <h3>Use your mouse to move the green dot to the red dot.</h3>
          </div>
        }
      </div>
    );
  }
}

export default App;
