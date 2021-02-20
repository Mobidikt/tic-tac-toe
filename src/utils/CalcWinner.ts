import { WINNING_COMBINATIONS_3X3 } from './constants';

export function calcWinner(squares:any) {
  for (let i = 0; i < WINNING_COMBINATIONS_3X3.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS_3X3[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
