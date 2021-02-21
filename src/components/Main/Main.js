import React, { Component } from 'react';
import { Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { AppContext } from '../../AppProvider';
import { GAME_TYPES, PLAYER_TURNS } from '../../common';
import Music from '../Music/Music';
import './Main.css';

const ICON_PLACE_HOLDDER = 'I';

const GameType = (props) => {
  const { value, name } = props;

  return (
    <AppContext.Consumer>
      {(context) => (
        <p
          onClick={() => context.changeType(value)}
          className={value === context.gameType ? 'active' : ''}
        >
          {name}
        </p>
      )}
    </AppContext.Consumer>
  );
};

class Menu extends Component {
  render() {
    const computer = localStorage.getItem('Computer');
    const playerVSComputer = +localStorage.getItem('PlayerVSComputer');
    const playerOne = +localStorage.getItem('Player1');
    const playerTwo = +localStorage.getItem('Player2');
    const tie = +localStorage.getItem('Tie');
    return (
      <div className='game-info'>
        <div>
          <h2>Statistics</h2>
          <div>
            <p>Tie : {tie}</p>
            <h4>Wins (2 player)</h4>
            <p>Player 1 : {playerOne}</p>
            <p>Player 2 : {playerTwo}</p>
            <h4>Wins (play with computer)</h4>
            <p>Computer : {computer}</p>
            <p>Player : {playerVSComputer}</p>
          </div>
        </div>
        <div className='game-menu'>
          <h2>Game menu</h2>
          <ToggleButtonGroup type='radio' name='options' defaultValue={1}>
            <ToggleButton value={1} className='btn_radio'>
              <GameType value={GAME_TYPES.TWO_PLAYERS} name='2 Players' />
            </ToggleButton>
            <ToggleButton value={2} className='btn_radio'>
              <GameType
                value={GAME_TYPES.VERSUS_COMPUTER}
                name='Play with computer'
              />
            </ToggleButton>
          </ToggleButtonGroup>
          <div>
            <Button variant='warning' onClick={() => this.context.newGame()}>
              New Game
            </Button>{' '}
          </div>
        </div>
      </div>
    );
  }
}

Menu.contextType = AppContext;

const Cell = (props) => {
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
          context.colorBoard &&
          (props.index === 0) |
            (props.index === 2) |
            (props.index === 4) |
            (props.index === 6) |
            (props.index === 8)
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
    const computer = +localStorage.getItem('Computer');
    const playerVSComputer = +localStorage.getItem('PlayerVSComputer');
    const playerOne = +localStorage.getItem('Player1');
    const playerTwo = +localStorage.getItem('Player2');
    const tie = +localStorage.getItem('Tie');
    const startBoard = this.context.colorBoard;
    let textInfo = '';
    let message = '';
    const currentIconType = this.context.currentIcon;

    if (startBoard !== this.context.colorBoard) {
      message = 'изменения вступят только после начала новой игры';
    } else message = '';

    if (this.context.gameState.isTie) {
      textInfo = 'Tie!';
      localStorage.setItem('Tie', tie + 1);
    } else {
      if (this.context.gameType === GAME_TYPES.TWO_PLAYERS) {
        if (this.context.gameState.position === '') {
          textInfo = `It's player${currentIconType === 0 ? ' 2' : ' 1'} turn`;
        } else {
          textInfo = `Player${currentIconType === 0 ? ' 1' : ' 2'} wins!`;
          if (currentIconType === 0) {
            localStorage.setItem(`Player1`, playerOne + 1);
          } else localStorage.setItem(`Player2`, playerTwo + 1);
        }
      } else {
        if (this.context.gameState.position === '') {
          if (this.context.playerTurn === PLAYER_TURNS.HUMAN)
            textInfo = `It's your turn`;
          else textInfo = `It's computer turn`;
        } else {
          if (this.context.playerTurn === PLAYER_TURNS.HUMAN) {
            textInfo = `Computer win!`;
            localStorage.setItem('Computer', computer + 1);
          } else {
            textInfo = `You win!`;
            localStorage.setItem('PlayerVSComputer', playerVSComputer + 1);
          }
        }
      }
    }

    return (
      <main className='main'>
        <Menu />
        <div className='settings'>
          <h3 className='settings__title'>Settings</h3>
          <div className='settings__wrapper'>
            <div className='setting__player'>
              <p className='setting__title'>Player 1</p>
              <Form>
                <Form.Group controlId='iconPlayerOne'>
                  <Form.Label>Icon</Form.Label>
                  <Form.Control
                    as='select'
                    className='form__btn'
                    custom
                    onClick={(e) =>
                      (this.context.playerIconOne = e.target.value)
                    }
                  >
                    <option>Х</option>
                    <option>+</option>
                  </Form.Control>
                </Form.Group>
              </Form>
              <Form>
                <Form.Group controlId='colorIconPlayerOne'>
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    as='select'
                    className='form__btn'
                    custom
                    onClick={(e) =>
                      (this.context.playerColorOne = e.target.value)
                    }
                  >
                    <option>black</option>
                    <option>green</option>
                    <option>red</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <div className='setting__player'>
              <p className='setting__title'>Player 2 </p>
              <Form>
                <Form.Group controlId='iconPlayerTwo'>
                  <Form.Label>Icon</Form.Label>
                  <Form.Control
                    as='select'
                    className='form__btn'
                    custom
                    onClick={(e) =>
                      (this.context.playerIconTwo = e.target.value)
                    }
                  >
                    <option>О</option>
                    <option>/\</option>
                  </Form.Control>
                </Form.Group>
              </Form>
              <Form>
                <Form.Group controlId='colorIconPlayerTwo'>
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    as='select'
                    className='form__btn'
                    custom
                    onClick={(e) =>
                      (this.context.playerColorTwo = e.target.value)
                    }
                  >
                    <option>black</option>
                    <option>green</option>
                    <option>red</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </div>
            <div>
              <div className='setting__board'>
                <p className='setting__title'>
                  Color board (необходимо начать новую игру)
                </p>
                <Form>
                  <Form.Group controlId='exampleForm.SelectCustom'>
                    <Form.Control
                      as='select'
                      className='form__btn'
                      custom
                      onClick={(e) => {
                        this.context.colorBoard =
                          e.target.value === 'chess' ? true : false;
                      }}
                    >
                      <option>classic</option>
                      <option>chess</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>
              <Music />
            </div>
          </div>
        </div>
        <div className='info'>{textInfo}</div>
        <Board />
      </main>
    );
  }
}
Main.contextType = AppContext;

export default Main;
