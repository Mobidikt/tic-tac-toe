import React, { Component } from 'react';
import { getRandom, replace, findBestMove, findRandomMove } from '../common';
import { checkGameState } from '../utils/CheckGameState';
import { GAME_TYPES, PLAYER_TURNS } from '../utils/constants';

const THINKING_TIME = 500;

export const AppContext = React.createContext();

export default class AppProvider extends Component {
  initState = {
    gameType: GAME_TYPES.TWO_PLAYERS,
    playerTurn: getRandom(0, 2),
    currentIcon: getRandom(0, 2),
    playerIconOne: 'X',
    playerColorOne: 'black',
    playerIconTwo: 'O',
    playerColorTwo: 'black',
    colorBoard: false,
    textPopup: '',
    gameOwer: false,
    openPopup: false,
    cells: new Array(9).fill(null),
    gameState: {
      position: '',
      iconType: null,
      isTie: null,
    },
  };

  state = {
    gameType: this.initState.gameType,
    currentIcon: this.initState.currentIcon,
    playerTurn: this.initState.playerTurn,
    playerIconOne: this.initState.playerIconOne,
    playerColorOne: this.initState.playerColorOne,
    playerIconTwo: this.initState.playerIconTwo,
    playerColorTwo: this.initState.playerColorTwo,
    colorBoard: this.initState.colorBoard,
    textPopup: '',
    openPopup: false,
    gameOwer: this.initState.gameOwer,
    cells: this.initState.cells,
    gameState: this.initState.gameState,

    changeType: (type) => {
      if (this.state.gameType !== type) {
        this.initNewGame(type);
      }
    },
    humanPlay: (index) => {
      this.humanPlay(index);
    },
    newGame: () => {
      this.initNewGame(this.state.gameType);
    },
  };
  initGame = () => {
    localStorage.setItem('stay', JSON.stringify(this.state));
    if (
      this.state.gameType === GAME_TYPES.VERSUS_COMPUTER &&
      this.state.playerTurn === PLAYER_TURNS.COMPUTER
    ) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        const randomMove = findRandomMove(this.state.cells);
        this.computerPlay(randomMove);
      }, THINKING_TIME);
    }
  };
  initLastGame = (state) => {
    this.setState(
      () => {
        return {
          gameType: state.gameType,
          currentIcon: state.currentIcon,
          playerTurn: state.playerTurn,
          playerIconOne: state.playerIconOne,
          playerColorOne: state.playerColorOne,
          playerIconTwo: state.playerIconTwo,
          playerColorTwo: state.playerColorTwo,
          colorBoard: state.colorBoard,
          textPopup: '',
          openPopup: false,
          gameOwer: state.gameOwer,
          cells: state.cells,
          gameState: state.gameState,
        };
      },
      () => {
        this.initGame();
      },
    );
  };

  initNewGame = (type = this.initState.gameType) => {
    this.setState(
      () => {
        return {
          gameType: type,
          currentIcon: getRandom(0, 2),
          playerTurn: getRandom(0, 2),
          playerIconOne: this.state.playerIconOne,
          playerColorOne: this.state.playerColorOne,
          playerIconTwo: this.state.playerIconTwo,
          playerColorTwo: this.state.playerColorTwo,
          colorBoard: this.state.colorBoard,
          textPopup: '',
          openPopup: false,
          gameOwer: false,
          cells: this.initState.cells,
          gameState: this.initState.gameState,
        };
      },
      () => {
        this.initGame();
      },
    );
  };
  applyState = (prevState, index) => {
    const cells = prevState.cells;
    const nextIcon = 1 - prevState.currentIcon;
    const nextPlayerTurn = 1 - prevState.playerTurn;
    const nextCells = replace(cells, index, prevState.currentIcon);
    const gameState = checkGameState(nextCells);

    return {
      gameState: gameState,
      currentIcon: nextIcon,
      playerTurn: nextPlayerTurn,
      cells: nextCells,
    };
  };

  humanPlay = (index) => {
    if (
      this.state.gameState.position === '' &&
      this.state.cells[index] === null &&
      (this.state.gameType === GAME_TYPES.TWO_PLAYERS ||
        this.state.playerTurn === PLAYER_TURNS.HUMAN)
    ) {
      this.setState(
        (prevState) => {
          return this.applyState(prevState, index);
        },
        () => {
          if (
            this.state.gameState.position === '' &&
            this.state.gameType === GAME_TYPES.VERSUS_COMPUTER &&
            this.state.playerTurn === PLAYER_TURNS.COMPUTER
          ) {
            setTimeout(() => {
              this.makeAIMove();
            }, THINKING_TIME);
          } else localStorage.setItem('stay', JSON.stringify(this.state));
        },
      );
      localStorage.setItem('stay', JSON.stringify(this.state));
    } else localStorage.setItem('stay', JSON.stringify(this.state));
  };

  computerPlay = (index) => {
    if (
      this.state.gameState.position === '' &&
      this.state.cells[index] === null &&
      this.state.gameType === GAME_TYPES.VERSUS_COMPUTER &&
      this.state.playerTurn === PLAYER_TURNS.COMPUTER
    ) {
      this.setState((prevState) => this.applyState(prevState, index));
    }
    localStorage.setItem('stay', JSON.stringify(this.state));
  };

  makeAIMove = () => {
    const bestMove = findBestMove(this.state.cells, this.state.currentIcon);

    if (bestMove !== null) {
      this.computerPlay(bestMove);
    }
  };

  componentDidMount() {
    const stay = JSON.parse(localStorage.getItem('stay'));
    if (stay) {
      this.initLastGame(stay);
    } else this.initGame();
  }

  render() {
    const currentIconType = this.state.currentIcon;

    if (this.state.gameState.isTie) {
      this.state.textPopup = 'Tie!';
      this.state.openPopup = true;
    } else {
      if (this.state.gameType === GAME_TYPES.TWO_PLAYERS) {
        if (this.state.gameState.position !== '') {
          this.state.textPopup = `Player${
            currentIconType === 0 ? ' 1' : ' 2'
          } wins!`;
          this.state.openPopup = true;
        }
      } else {
        if (this.state.gameState.position !== '') {
          if (this.state.playerTurn === PLAYER_TURNS.HUMAN) {
            this.state.textPopup = `Computer win!`;
            this.state.openPopup = true;
          } else {
            this.state.textPopup = `You win!`;
            this.state.openPopup = true;
          }
        }
      }
    }
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
