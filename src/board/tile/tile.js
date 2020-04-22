import React, { Component } from 'react';
import hexagon from './images/hex.png';

import './tile.css';

class Tile extends Component {
  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = {
      resource: props.resource,
      val: props.val,
      settlements: [],
      row: props.row,
      col: props.col,
    };
  }

  setPlacing(val) {
    this.setState({placing: val})
  }

  placeSettlement(s_) {
    const newSettlement = {space: s_, src: require('./images/reds.png')}
    let ssettlements = [...this.state.settlements]
    this.state.settlements.push(newSettlement)
    //this.setState({settlements: ssettlements})
    this.props.donePlacing()
    console.log(this.state)
  }

  validSpaces() {
    const row = this.state.row
    const col = this.state.col
    const s1 = ["s1"]; const s2 = ['s2']; const both = ["s1", "s2"]; const none = []
    if (row === 0) {
      return none
    }
    else if (row === 1) {
      if (col === 0) {
        return s1
      }
      if (col === 4) {
        return none
      }
    }
    else if (row === 2) {
      if (col === 0) {
        return s1
      }
      if (col === 5) {
        return none
      }
    }
    else if (row === 3) {
      if (col === 0) {
        return s1
      }
      if (col === 6) {
        return none
      }
    }
    else if (row === 4 && col === 5) {
      return s2
    }
    else if (row === 5 && col === 4) {
      return s2
    }
    else if (row === 6 && col === 3) {
      return s2
    }
    return both
  }

  render() {
    let tileSrc = hexagon
    let val = this.state.val
    let settlements = this.state.settlements
    console.log(settlements)
    let validSpaces = this.validSpaces()
    if (!this.state.placing) {
      validSpaces = []
    }
    switch(this.state.resource) {
      case "wheat":
        tileSrc = require('./images/wheat.png')
        break;
      case "wool":
        tileSrc = require('./images/wool.png')
        break;
      case "desert":
        val = ""
        tileSrc = require('./images/desert.png')
        break;
      case "ore":
        tileSrc = require('./images/stone.png')
        break;
      case "brick":
        tileSrc = require('./images/brick.png')
        break;
      case "wood":
        tileSrc = require('./images/wood.png')
        break;
      case "ocean":
        val = ""
        tileSrc = require('./images/ocean.png');
        break;
    }

    return (
      <div  className="tileWrapper">
        <img className="tile" src={tileSrc}/>
        <div className="diceValue">
          {val}
        </div>
        <div> 
          {
            validSpaces.map((space, index) => {
              return (<img className={space} key={index} onClick={() => this.placeSettlement(space)} src={require('./images/blacks.png')}></img>)
            })
          }
        </div>
        <div> 
          {
            settlements.map((s, index) => {
              return (<img className={s['space']} key={index} src={s['src']}></img>)
            })
          }
        </div>
      </div>
    );
  }
}

export default Tile;
