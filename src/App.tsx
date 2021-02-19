import React, { useState } from 'react';
import './App.css';
import Board from './components/Board/Board';
import Main from './components/Main/Main';
import { calcWinner } from './utils/CalcWinner';


function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0)
  const handleClick=(i:number)=> {
    // Копируем! в history массив с объектом созданный из текущего состояние this.state.history
    // (от начал массива до номера текущего хода)
     setHistory (history.slice(0, stepNumber + 1))
    // Записываем в current объект над которым производится работа извлекая его из массива
    const current = history[history.length - 1];
    // Копируем! в squares массив отмеченых и пустых клеток
    const squares = current.squares.slice();
    // Если текущий массив содержит выигрышную комбинацию выходим из обработки события
    // if (calcWinner(squares) || squares[i]) {
    //   return;
    // }
  }
  console.log(history)
  return (
    <div className="App">
      <Main /> 
      <Board onClick={(i:number) => handleClick(i)}/>
    </div>
  );
}

export default App;
