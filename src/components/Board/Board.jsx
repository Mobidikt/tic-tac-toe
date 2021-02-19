import React, { Component } from 'react';
import Cell from '../Cell/Cell';

class Board extends Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
    console.log(this.boardRef);
    console.log(props);
  }

  renderCell(i) {
    return <Cell index={i} onClick={() => this.props.onClick(i)} />;
  }

  componentDidUpdate() {
    // if (this.context.gameState.position !== '') {
    //   setTimeout(() => {
    //     this.boardRef.current.classList.add('full');
    //   }, 50);
    // } else {
    this.boardRef.current.classList.remove('full');
    // }
  }

  render() {
    return (
      <div className={`board `} ref={this.boardRef}>
        <div className='board-row'>
          {this.renderCell(0)}
          {this.renderCell(1)}
          {this.renderCell(2)}
        </div>

        <div className='board-row'>
          {this.renderCell(3)}
          {this.renderCell(4)}
          {this.renderCell(5)}
        </div>

        <div className='board-row'>
          {this.renderCell(6)}
          {this.renderCell(7)}
          {this.renderCell(8)}
        </div>
      </div>
    );
  }
}

export default Board;
