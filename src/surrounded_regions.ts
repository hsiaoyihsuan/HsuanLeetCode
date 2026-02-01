// 130. Surrounded Regions
// DFS
// Time: O(m × n) We visit each cell at most once.
// Space: O(m × n) worst case recursion depth (DFS stack).
function solve(board: string[][]): void {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(r: number, c: number, str: string) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== "O") {
      return;
    }

    board[r][c] = str;

    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    for (const [dr, dc] of dirs) {
      dfs(r + dr, c + dc, str);
    }
  }

  // 1. DFS from the borders to find non-capturable 'O'
  for (let r = 0; r < rows; r++) {
    dfs(r, 0, "E");
    dfs(r, cols - 1, "E");
  }

  for (let c = 0; c < cols; c++) {
    dfs(0, c, "E");
    dfs(rows - 1, c, "E");
  }

  // 2. Convert remaining O → X (these are captured regions)
  // 3. Convert E back → O (these were safe)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === "E") {
        board[r][c] = "O";
      } else if (board[r][c] === "O") {
        board[r][c] = "X";
      }
    }
  }
}
