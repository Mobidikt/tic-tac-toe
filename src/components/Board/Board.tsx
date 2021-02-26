import React, { Component } from 'react';
import { AppContext } from '../../context/AppContext';
import { ICON_PLACE_HOLDDER } from '../../utils/constants';
import { PropsCell } from './TypeBoard';
import './Board.css'

const Cell = (props :PropsCell) => {
  return (
    <AppContext.Consumer>
      {(context) => {
        const value = context.cells[props.index];
        const icon =
          value !== null
            ? value === 1
              ? context.playerIconOne
              : context.playerIconTwo
            : ICON_PLACE_HOLDDER;
        const isDoneClass = icon !== ICON_PLACE_HOLDDER ? 'done' : '';
        const isColorClass =
          value !== null
            ? value === 1
              ? context.playerColorOne
              : context.playerColorTwo
            : '';
        const chess =
          context.colorBoard &&(
            (props.index === 0) ||
              (props.index === 2) ||
              (props.index === 4) ||
              (props.index === 6) ||
              (props.index === 8)
          )
            ? 'black-background'
            : null;
        return (
          <button
            className={`cell cell-${props.index} ${isDoneClass} ${isColorClass} ${chess}`}
            onClick={() => context.humanPlay(props.index)}
          >
            {icon}
          </button>
        );
      }}
    </AppContext.Consumer>
  );
};


class Board extends Component {
  private boardRef: any
  constructor(props:any) {
    super(props);
    this.boardRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.context.gameState.position !== '') {
      setTimeout(() => {
        this.boardRef.current.classList.add('full');
      }, 50);
    } else {
      this.boardRef.current.classList.remove('full');
    }
  }
  render() {
    return (
      <div
        className={`board ${this.context.gameState.position}`}
        ref={this.boardRef}
      >
        <div className='board-row'>
          <Cell index={0} />
          <Cell index={1} />
          <Cell index={2} />
        </div>
        <div className='board-row'>
          <Cell index={3} />
          <Cell index={4} />
          <Cell index={5} />
        </div>
        <div className='board-row'>
          <Cell index={6} />
          <Cell index={7} />
          <Cell index={8} />
        </div>
      </div>
    );
  }
}
Board.contextType = AppContext;

export default Board;
