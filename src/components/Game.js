import React from 'react'
import Board from './Board'


export default class Game extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      history: [{ squares: Array(9).fill(null)},],
      xIsNext: true,
      stepNumber: 0,
      winner: null
    }
  }

  handleClick = (i) => {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const squares = current.squares.slice()
    //const tab = this.state.squares.slice()
    if (this.calculateWinner(squares) || squares[i]) { return; }
    squares[i] = this.state.xIsNext ? "X" : "O"

    this.setState({
      history: history.concat([{ squares: squares, }]),
      xIsNext: !this.state.xIsNext,
      stepNumber : this.state.stepNumber + 1
    })

  }

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {lettre : squares[a], liste: [a,b,c]};
      }
    }
    return null;
  }

  jumpTo = (i) => {
    this.setState({
      stepNumber: i,
      xIsNext: i%2 === 0,
    })
  }

  

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    let liste

    const moves = history.map((step, move) => {
     
      let button
      if (move === 0) button =  <button onClick={() => this.jumpTo(move)}>Revenir au début de la partie</button>
      else button =  <button onClick={() => this.jumpTo(move)}>Revenir au tour n° <strong>{move}</strong></button>

      return (
        <li key={move}>
          {button}
          <span>move = {move}</span>
        </li>);
    })

    let status;
    if (winner) {
      status = winner.lettre + ' a gagné';
      liste = winner.liste
    }
    else {
      status = 'Prochain joueur : ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={this.handleClick} winner={liste}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

