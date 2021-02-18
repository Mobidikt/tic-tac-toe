import { WINNING_COMBINATIONS_3X3 } from './constants';

export function calculateWinner(squares:any) {
  console.log(squares);
  // сравниваем комбинации из активированных клеток с выигрышными комбинациями
  for (let i = 0; i < WINNING_COMBINATIONS_3X3.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS_3X3[i];
    console.log(squares[a]);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
