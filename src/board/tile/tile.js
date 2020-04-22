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
      roads: [],
      row: props.row,
      col: props.col,
      placingSettlement: false,
      placingRoad: false,
    };
  }

  setPlacing(roadOrSettlement, val) {
    switch(roadOrSettlement) {
      case 'road':
        this.setState({placingRoad: val})
        break;
      case 'settlement':
        this.setState({placingSettlement: val})
        break;
      default: break;
    }
    console.log(this.state)
  }

  placeSettlement(s_) {
    const newSettlement = {space: s_, src: require('./images/reds.png')}
    this.state.settlements.push(newSettlement)
    this.props.donePlacing('settlement')
  }

  placeRoad(s_) {
    const newRoad = {space: s_, src: require('./images/redr.png')}
    this.state.roads.push(newRoad)
    this.props.donePlacing('road')
  }

  validRoads() {
    return ['r1', 'r2', 'r3']
  }

  validSettlements() {
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
    
    let {resource, val, settlements, roads, row, col} = this.state
    
    const pathToImage = `./images/${resource}.png`
    const tileSrc = require(pathToImage)
    let validSettlements = this.validSettlements()
    let validRoads = this.validRoads()

    if (!this.state.placingSettlement) {
      validSettlements = []
    } if (!this.state.placingRoad) {
      validRoads = []
    } if (resource === 'desert' || resource === 'ocean') {
      val = ''
    }

    return (
      <div  className="tileWrapper">
        <img className="tile" src={tileSrc}/>
        <div className="diceValue">
          {val} 
        </div>
        <div> 
          {
            validSettlements.map((space, index) => {
              return (<img className={space} key={index} onClick={() => this.placeSettlement(space)} src={require('./images/blacks.png')}></img>)
            })
          }
          {
            validRoads.map((space, index) => {
              return (<img className={space} key={index} onClick={() => this.placeRoad(space)} src={require('./images/blackr.png')}></img>)
            })
          }
        </div>
        <div> 
          {
            settlements.map((s, index) => {
              return (<img className={s['space']} key={index} src={s['src']}></img>)
            })
          }
          {
            roads.map((s, index) => {
              return (<img className={s['space']} key={index} src={s['src']}></img>)
            })
          }
        </div>
      </div>
    );
  }
}

export default Tile;
