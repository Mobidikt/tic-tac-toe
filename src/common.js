import { getEmptyCells } from './utils/getEmptyCells';

const isMoveLeft = (cells) => {
  const emptyCells = getEmptyCells(cells);
  return emptyCells.length > 0;
};

export const getRandom = (start, end) => {
  return start + Math.floor(Math.random() * (end - start));
};

export const replace = (cells, index, value) => {
  return [
    ...cells.slice(0, index),
    value,
    ...cells.slice(index + 1, cells.length),
  ];
};

export const findRandomMove = (cells) => {
  const emptyCells = getEmptyCells(cells);

  if (emptyCells.length > 0) {
    const randomNum = getRandom(0, emptyCells.length);
    const index = emptyCells[randomNum][1];

    return index;
  }

  return null;
};

const evaluate = (cells, computerType) => {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (cells[a] !== null && cells[a] === cells[b] && cells[a] === cells[c]) {
      if (cells[a] === computerType) return 10;
      return -10;
    }
  }

  return 0;
};

const minimax = (cells, depth, computerType, isMax) => {
  const score = evaluate(cells, computerType);

  if (score === 10) return score - depth;

  if (score === -10) return score + depth;

  if (!isMoveLeft(cells)) return 0;

  const lengthCells = cells.length;
  let best;

  if (isMax) {
    best = -1000;

    for (let i = 0; i < lengthCells; i++) {
      const cell = cells[i];

      if (cell === null) {
        const nextCells = replace(cells, i, computerType);

        best = Math.max(
          best,
          minimax(nextCells, depth + 1, computerType, !isMax),
        );
      }
    }
  } else {
    best = 1000;

    for (let i = 0; i < lengthCells; i++) {
      const cell = cells[i];

      if (cell === null) {
        const nextCells = replace(cells, i, 1 - computerType);

        best = Math.min(
          best,
          minimax(nextCells, depth + 1, computerType, !isMax),
        );
      }
    }
  }

  return best;
};

export const findBestMove = (cells, computerType) => {
  let bestVal = -1000;
  let bestMove = null;

  const lengthCells = cells.length;

  for (let i = 0; i < lengthCells; i++) {
    const cell = cells[i];

    if (cell === null) {
      const nextCells = replace(cells, i, computerType);

      const moveVal = minimax(nextCells, 0, computerType, false);

      if (moveVal > bestVal) {
        bestVal = moveVal;
        bestMove = i;
      }
    }
  }

  return bestMove;
};
