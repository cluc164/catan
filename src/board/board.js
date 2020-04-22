import React, { Component } from 'react';
import Tile from './tile/tile';
import './board.css'

class Board extends Component {
  constructor(props) {
    // Initialize mutable state
    super(props);

    this.state = {
      board: [],
      placing: false,
      boardRef: [
        [React.createRef(), React.createRef(), React.createRef(), React.createRef()],
        [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()],
        [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()],
        [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()], 
        [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()], 
        [React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()],
        [React.createRef(), React.createRef(), React.createRef(), React.createRef()],
      ]
    };

    this.donePlacing = this.donePlacing.bind(this)
  }

  componentDidMount() {
    this.buildBoard()
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }

  buildBoard() {
    const newBoard = [
        {row: 'row1', resources: ['ocean', 'ocean', 'ocean', 'ocean'], values: [-1,-1,-1,-1]},
        {row: 'row2', resources: ['ocean', '', '', '', 'ocean'], values: [-1,0,0,0,-1]},
        {row: 'row3', resources: ['ocean', '', '', '', '', 'ocean'], values: [-1,0,0,0,0,-1]},
        {row: 'row4', resources: ['ocean', '', '', '', '', '', 'ocean'], values: [-1,0,0,0,0,0,-1]},
        {row: 'row5', resources: ['ocean', '', '', '', '', 'ocean'], values: [-1,0,0,0,0,-1]},
        {row: 'row6', resources: ['ocean', '', '', '', 'ocean'], values: [-1,0,0,0,-1]},
        {row: 'row7', resources: ['ocean', 'ocean', 'ocean', 'ocean'], values: [-1,-1,-1,-1]},
    ]  

    const resources = [ 
      'wheat', 'wheat', 'wheat', 'wheat',
      'wool', 'wool', 'wool', 'wool', 
      'wood', 'wood', 'wood', 'wood',
      'brick', 'brick', 'brick', 
      'ore', 'ore', 'ore',
      'desert'
    ]

    const values = [
      2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12
    ]
    
    const shuffledResources = this.shuffleArray(resources)
    const shuffledValues = this.shuffleArray(values)

    newBoard.forEach((row, i) => {
      row['resources'].forEach((resourceType, j) => {
        if (resourceType !== 'ocean') {
          const newResource = shuffledResources.pop()
          newBoard[i]['resources'][j] = newResource;
          if (newResource !== 'desert') {
            newBoard[i]['values'][j] = shuffledValues.pop()
          }
        }
      })
    })

    this.setState({board: newBoard, placing: false})
  }

  setPlace(roadOrSettlement, val) {
    this.state.boardRef.forEach((row) => {
      row.forEach((tile) => {
        if (tile) {
          tile.current.setPlacing(roadOrSettlement, val)
        }
      })
    })
  }

  donePlacing(roadOrSettlement) {
    this.setPlace(roadOrSettlement, false)
  }

  render() {
    const { board, boardRef } = this.state;

    return (
      <div>
        <div className='board'>
          {
            board.map((row, i) => {
              return <div className={row['row']} key={i}>
                {
                  row['resources'].map((resourceType, j) => {
                    return (<Tile resource={resourceType} ref={boardRef[i][j]} val={row['values'][j]} key={`${i}_${j}`} row={i} col={j} donePlacing={this.donePlacing}/>)
                  })
                }
              </div>
            })
          }
        </div>
      </div>
    );
  }
}

export default Board;
