// 79. Word Search
// Backtracking (DFS with visited tracking)
// Time: O(m x n x 4^l), where m × n is the board size and l is the word length
// Space: O(l) for recursion depth
function exist(board: string[][], word: string): boolean {
  const rows = board.length;
  const cols = board[0].length;
  const visited = Array.from({length: rows}, () => Array(cols).fill(false));

  function dfs(r: number, c: number, i: number): boolean {
    if (i >= word.length) return true;

    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      board[r][c] !== word[i] ||
      visited[r][c]
    ) {
      return false;
    }

    // Mark current cell as visited
    visited[r][c] = true;

    if (
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1)
    ) {
      return true;
    }

    // Backtrack: unmark cell for next paths
    visited[r][c] = false;

    return false;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }

  return false;
}
