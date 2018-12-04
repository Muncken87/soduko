import React, { Component } from 'react';
import './App.sass';

let soduko = [
  ["", "", 3, "", 2, "", 6, "", ""],
  [9, "", "", 3, "", 5, "", "", 1],
  ["", "", 1, 8, "", 6, 4, "", ""],
  ["", "", 8, 1, "", 2, 9, "", ""],
  [7, "", "", "", "", "", "", "", 8],
  ["", "", 6, 7, "", 8, 2, "", ""],
  ["", "", 2, 6, "", 9, 5, "", ""],
  [8, "", "", 2, "", 3, "", "", 9],
  ["", "", 5, "", 1, "", 3, "", ""],
];

class App extends Component {
  state = {
    board: soduko,
    error: '',
    valid: '',
  }

  renderGame = () => {
    return soduko.map((value, column) => (
      <div key={column} className={column % 3 === 2 && 'bottom-border'}>
        {value.map((col, row) => (
          <input
            key={row}
            className={col % 3 && 'right-border'}
            type="text"
            value={col}
            onChange={(value) => this.handleChange(column, value, row)}
            name="cell"
            min="1"
            max="9"
            maxLength="1"
          />
        ))}
      </div>
    ))
  }

  findNumberInRow = async (num, row) => {
    const { board } = this.state;
    for (var y = 0; y < board.length; y++) {
      for (var x = 0; x < board[y][row]; x++) {
        if (board[x][row] === num) {
          return true;
        }
      }
    }
    return false;
  }

  findNumberInColumn = async (num, col) => {
    const { board } = this.state;
    for (var y = 0; y < board.length; y++) {
      for (var x = 0; x < board[col][y]; x++) {
        if (board[col][y] === num) {
          return true;
        }
      }
    }
    return false;
  }

  // soduko[if i should go up or down]
  // slice(from pos 0 to pos 3, or 3, 6 or 6, 9)
  findNumberInBox = (num, row, col) => {
    // for (var y = 0; y < 3; y++) {
      // let c = soduko[gridIndex].slice(row, col);
      // let c = soduko[gridIndex];
      // console.log(c);
      // for (var d = 0; d < c.length; d++) {
      //   console.log(c[d]);
      //   if (c[d] === num) {
      //     return true;
      //   }
      // }
    }

  handleChange = (column, currentValue, row) => {
    const choosenNumber = Number(currentValue.target.value);
    console.log('col', column, 'value', choosenNumber, 'row', row);
    const isRowNumberValid = this.findNumberInRow(choosenNumber, row);
    const isColumnNumberValid = this.findNumberInColumn(choosenNumber, column);

    return Promise.all([isRowNumberValid, isColumnNumberValid]).then(x => {
      const reducedValues = x.reduce((a, b) => a + b);
      if (reducedValues === 0) {
        const copy = [...this.state.board];
        copy[column][row] = choosenNumber;
        this.setState({ 
          ...this.state, 
          valid: 'Number is valid', 
          error: '',
           copy 
        });
      } else {
        this.setState({ error: 'Number already exists', valid: '' });
        return false;
      }
    });
  }

  render() {
    const { error, valid } = this.state;
    return (
      <div className="container">
        <div className="inner-box-flex">
          {
            this.renderGame()
          }
        </div>
        {
          error && (
            <p className="helper-text">{error}</p>
          )
        }
        {
          valid && (
            <p className="helper-text">{valid}</p>
          )
        }
      </div>
    );
  }
}

export default App;
