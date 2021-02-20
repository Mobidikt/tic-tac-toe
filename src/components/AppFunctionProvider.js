import React, { useState } from 'react';

function AppFunctionProvider() {
  const [gameMode, setGameMode] = useState(true); //true - два игрока, false -компьютер
  const [iconPlayerOne, setIconPlayerOne] = useState('X'); //Иконка игрока один
  const [iconPlayerTwo, setIconPlayerTwo] = useState('O'); //иконка игрока два
  const [cells, setCells] = useState(new Array(9).fill(null)); //создаём поле
  const [gameState, setGameState] = useState({
    position: '',
    iconType: null,
    isTie: null,
  }); //настройки

  const initGame = (mode = gameMode) => {
    setGameMode(mode);
  };

  initGame();
  return;
}
