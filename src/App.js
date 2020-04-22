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
    this.board.current.setPlace(true)
  }

  render() {
    return (
      <div className="App">
        <Board ref={this.board}/>
        <button className="settlementPlacer" onClick={() => this.placeSettlement()}>Place Settlement</button>
      </div>
    );
  }
}

export default App;
