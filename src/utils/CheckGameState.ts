import { getEmptyCells } from './getEmptyCells';

const isMoveLeft = (cells:number[]) => {
    const emptyCells = getEmptyCells(cells);
    return emptyCells.length > 0;
  };

export const checkGameState = (cells:number[]) => {
    const lines = [
      [0, 1, 2], // h.h0
      [3, 4, 5], // h.h1
      [6, 7, 8], // h.h2
      [0, 3, 6], // v.v0
      [1, 4, 7], // v.v1
      [2, 5, 8], // v.v2
      [0, 4, 8], // d.d0
      [2, 4, 6], // d.d1
    ];
  
    let position = '';
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
  
      if (cells[a] !== null && cells[a] === cells[b] && cells[a] === cells[c]) {
        if (i >= 0 && i <= 2) position = `h h${i}`;
        else if (i >= 3 && i <= 5) position = `v v${i - 3}`;
        else position = `d${i - 6}`;
        return {
          position,
          iconType: cells[a],
          isTie: null,
        };
      }
    }
  
    return {
      position: '',
      iconType: null,
      isTie: isMoveLeft(cells) ? null : true,
    };
  };