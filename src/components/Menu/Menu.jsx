import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { AppContext } from '../../context/AppContext';
import ToggleButtonExample from '../ToggleButtonExample/ToggleButtonExample';
import './Menu.css';

class Menu extends Component {
  render() {
    const computer = +localStorage.getItem('Computer');
    const playerVSComputer = +localStorage.getItem('PlayerVSComputer');
    const playerOne = +localStorage.getItem('Player1');
    const playerTwo = +localStorage.getItem('Player2');
    const tie = +localStorage.getItem('Tie');
    return (
      <div className='game-info'>
        <div className='statistics'>
          <h2>Statistics</h2>
          <div>
            <p className='statistics__tie'>Tie : {tie}</p>
            <h4 className='statistics__subtitle'>Wins</h4>
            <div className='statistics__wrapper'>
              <div className='statistics__type'>
                <h5>(2 player)</h5>
                <p>Player 1 : {playerOne}</p>
                <p>Player 2 : {playerTwo}</p>
              </div>
              <div className='statistics__type'>
                <h5>(play with computer)</h5>
                <p>Computer : {computer}</p>
                <p>Player : {playerVSComputer}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='game-menu'>
          <h2>Game menu</h2>
          <ToggleButtonExample />
          <Button
            variant='warning'
            className='btn_new-menu'
            onClick={() => this.context.newGame()}
          >
            New Game
          </Button>{' '}
        </div>
      </div>
    );
  }
}

Menu.contextType = AppContext;

export default Menu;
