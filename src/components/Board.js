import React from 'react'
import Square from './Square'

export default class Board extends React.Component {

  renderSquare(i) {

    let [a,b,c] = Array(3).fill(null)

    if (this.props.winner) [a,b,c] = this.props.winner

    return <Square
      value={this.props.squares[i]}
      onclick={() => this.props.onClick(i)}
      winner={ a===i || b===i  || c===i }
    />;
  }


  render() {

    return (
      <div>

        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}