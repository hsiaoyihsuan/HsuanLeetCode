// 36. Valid Sudoku
function isValidSudoku(board: string[][]): boolean {
  const rowSets = Array.from({length: 9}, () => new Set<string>());
  const colSets = Array.from({length: 9}, () => new Set<string>());
  const squareSets = Array.from({length: 9}, () => new Set<string>());

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const cell = board[row][col];
      if (cell === ".") continue;

      const squareIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
      if (
        rowSets[row].has(cell) ||
        colSets[col].has(cell) ||
        squareSets[squareIndex].has(cell)
      ) {
        return false;
      }
      rowSets[row].add(cell);
      colSets[col].add(cell);
      squareSets[squareIndex].add(cell);
    }
  }

  return true;
}
