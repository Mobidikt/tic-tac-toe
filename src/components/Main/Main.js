import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from '../../AppProvider';
import {
  GAME_TYPES,
  PLAYER_TURNS,
} from '../../common';
import './Main.css';

const ICON_PLACE_HOLDDER = 'I';

const GameType = (props) => {
  const { value, name } = props;

  return (
    <AppContext.Consumer>
      {(context) => (
        <li
          onClick={() => context.changeType(value)}
          className={value === context.gameType ? 'active' : ''}
        >
          {name}
        </li>
      )}
    </AppContext.Consumer>
  );
};

class Menu extends Component {
  render() {
    return (
      <header className='header'>
        <ul>
          <GameType value={GAME_TYPES.TWO_PLAYERS} name='2 Players' />
          <GameType value={GAME_TYPES.VERSUS_COMPUTER} name='Versus Computer' />
        </ul>
        <div>
          <button onClick={() => this.context.newGame()}>New Game</button>
        </div>
      </header>
    );
  }
}

Menu.contextType = AppContext;

const Cell = (props) => {
  return (
    <AppContext.Consumer>
      {(context) => {
        console.log(context.playerIconOne);
        const value = context.cells[props.index];
        const icon =
          value !== null
            ? value === 1
              ? context.playerIconOne
              : context.playerIconTwo
            : ICON_PLACE_HOLDDER;
        const isDoneClass = icon !== ICON_PLACE_HOLDDER ? 'done' : '';
        return (
          <button
            className={`cell cell-${props.index} ${isDoneClass}`}
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
  constructor(props) {
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

class Main extends Component {
  render() {
    let textInfo = '';
    const currentIconType = this.context.currentIcon;

    if (this.context.gameState.isTie) {
      textInfo = 'Tie!';
    } else {
      if (this.context.gameType === GAME_TYPES.TWO_PLAYERS) {
        if (this.context.gameState.position === '') {
          textInfo = `It's player${currentIconType === 0 ? ' 1' : ' 2'} turn`;
        } else {
          textInfo = `Player${currentIconType === 0 ? ' 1' : ' 2'} wins!`;
        }
      } else {
        if (this.context.gameState.position === '') {
          if (this.context.playerTurn === PLAYER_TURNS.HUMAN)
            textInfo = `It's your turn`;
          else textInfo = `It's computer turn`;
        } else {
          if (this.context.playerTurn === PLAYER_TURNS.HUMAN)
            textInfo = `Computer win!`;
          else textInfo = `You win!`;
        }
      }
    }

    return (
      <main className='main'>
        <Menu />
        <div className='settings'>
          <Form>
            <Form.Group controlId='exampleForm.SelectCustom'>
              <Form.Label>Player 1</Form.Label>
              <Form.Control
                as='select'
                custom
                onClick={(e) => (this.context.playerIconOne = e.target.value)}
              >
                <option>Х</option>
                <option>+</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Form>
            <Form.Group controlId='exampleForm.SelectCustom'>
              <Form.Label>Player 2</Form.Label>
              <Form.Control
                as='select'
                custom
                onClick={(e) => (this.context.playerIconTwo = e.target.value)}
              >
                <option>О</option>
                <option>/\</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </div>
        <Form>
          <Form.Group controlId='exampleForm.SelectCustom'>
            <Form.Label>Цветовая схема поля</Form.Label>
            <Form.Control
              as='select'
              custom
              onClick={(e) =>
                (this.context.colorBoard =
                  e.target.value === 'chess' ? true : false)
              }
            >
              <option>classic</option>
              <option>chess</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <div className='info'>{textInfo}</div>
        <Board />
      </main>
    );
  }
}
Main.contextType = AppContext;

export default Main;
