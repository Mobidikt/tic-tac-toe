export function getEmptyCells(cells) {
  return cells
    .map((value, index) => [value, index])
    .filter((item) => item[0] === null);
}
