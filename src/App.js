import React, { Component } from 'react';
import Board from './board/board';
import './App.css';

class App extends Component {
  constructor(props) {
    // Initialize mutable state
    super(props);
    this.board = React.createRef();
  }

  componentDidMount() {
  }

  placeSettlement() {
    this.board.current.setPlace('settlement', true)
  }

  placeRoad() {
    this.board.current.setPlace('road', true)
  }

  render() {
    return (
      <div className="App">
        <Board ref={this.board}/>
        <button className="settlementPlacer" onClick={() => this.placeSettlement()}>Place Settlement</button>
        <button className="settlementPlacer" onClick={() => this.placeRoad()}>Place Road</button>
      </div>
    );
  }
}

export default App;
