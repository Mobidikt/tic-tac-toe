import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from '../../context/AppContext';
import { GAME_TYPES, PLAYER_TURNS } from '../../utils/constants';
import Board from '../Board/Board';
import Menu from '../Menu/Menu';
import Music from '../Music/Music';
import './Main.css';

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
      if (!this.context.gameOwer) {
        localStorage.setItem('Tie', tie + 1);
        this.context.gameOwer = true;
      } else {
      }
    } else {
      if (this.context.gameType === GAME_TYPES.TWO_PLAYERS) {
        if (this.context.gameState.position === '') {
          textInfo = `It's player${currentIconType === 0 ? ' 2' : ' 1'} turn`;
        } else {
          textInfo = `Player${currentIconType === 0 ? ' 1' : ' 2'} wins!`;
          if (currentIconType === 0) {
            if (!this.context.gameOwer) {
              localStorage.setItem(`Player1`, playerOne + 1);
              this.context.gameOwer = true;
            } else {
            }
          } else {
            if (!this.context.gameOwer) {
              localStorage.setItem(`Player2`, playerTwo + 1);
              this.context.gameOwer = true;
            } else {
            }
          }
        }
      } else {
        if (this.context.gameState.position === '') {
          if (this.context.playerTurn === PLAYER_TURNS.HUMAN)
            textInfo = `It's your turn`;
          else textInfo = `It's computer turn`;
        } else {
          if (this.context.playerTurn === PLAYER_TURNS.HUMAN) {
            textInfo = `Computer win!`;
            if (!this.context.gameOwer) {
              localStorage.setItem('Computer', computer + 1);
              this.context.gameOwer = true;
            } else {
            }
          } else {
            textInfo = `You win!`;
            if (!this.context.gameOwer) {
              localStorage.setItem('PlayerVSComputer', playerVSComputer + 1);
              this.context.gameOwer = true;
            } else {
            }
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
