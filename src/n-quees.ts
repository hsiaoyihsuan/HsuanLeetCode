// 51. N-Queens
// Method: Backtracking
//
// Idea:
// - Try each cell from left to right, top to bottom
// - For each cell, choose whether to place a queen or skip it
// - A queen can only be placed when its row, column, and diagonals are clear
// - When n queens are placed, convert the board into one answer
//
// Time: O(n x C(n^2, n))
// - In the worst case, explore many ways to choose n cells from n^2 cells
// - Checking whether a cell is available costs O(n)
//
// Space: O(n^2)
// - board stores n x n cells
// - recursion stack can go through n^2 cells
function solveNQueens1(n: number): string[][] {
  const result: string[][] = [];
  const board: string[][] = Array.from({length: n}, () => Array(n).fill("."));

  function isAvailable(r: number, c: number): boolean {
    // check horizontal & vertical line
    for (let i = 0; i < n; i++) {
      if (board[r][i] === "Q" || board[i][c] === "Q") return false;
    }

    let curR = r;
    let curC = c;
    // check left up
    while (curR >= 0 && curC >= 0 && curR < n && curC < n) {
      if (board[curR][curC] === "Q") return false;
      curR--;
      curC--;
    }
    curR = r;
    curC = c;
    // check left down
    while (curR >= 0 && curC >= 0 && curR < n && curC < n) {
      if (board[curR][curC] === "Q") return false;
      curR++;
      curC--;
    }
    curR = r;
    curC = c;
    // check right up
    while (curR >= 0 && curC >= 0 && curR < n && curC < n) {
      if (board[curR][curC] === "Q") return false;
      curR--;
      curC++;
    }
    curR = r;
    curC = c;
    // check right down
    while (curR >= 0 && curC >= 0 && curR < n && curC < n) {
      if (board[curR][curC] === "Q") return false;
      curR++;
      curC++;
    }

    return true;
  }

  function dfs(r: number, c: number, totalQ: number) {
    if (totalQ === n) {
      result.push(board.map((row) => row.join("")));
      return;
    }

    if (r < 0 || c < 0 || r >= n || c >= n) {
      return;
    }

    if (isAvailable(r, c)) {
      // option 1 place a queen
      board[r][c] = "Q";
      if (c === n - 1) {
        dfs(r + 1, 0, totalQ + 1);
      } else {
        dfs(r, c + 1, totalQ + 1);
      }
      board[r][c] = ".";
    }

    // option 2 not place a queen
    // just move to the next one
    if (c === n - 1) {
      dfs(r + 1, 0, totalQ);
    } else {
      dfs(r, c + 1, totalQ);
    }
  }

  dfs(0, 0, 0);

  return result;
}

// Method: DFS Backtracking with Sets
//
// Idea:
// - Place exactly one queen per row
// - Track blocked columns and diagonals with sets for O(1) conflict checks
// - Positive diagonals share the same r + c
// - Negative diagonals share the same r - c
// - Backtrack by removing the queen and its recorded conflicts
//
// Time: O(n!)
// - Each row chooses from the remaining valid columns
// - Diagonal pruning removes invalid branches early
//
// Space: O(n^2)
// - board stores n x n cells
// - sets and recursion stack cost O(n)
function solveNQueens2(n: number): string[][] {
  const result: string[][] = [];
  const board: string[][] = Array.from({length: n}, () => Array(n).fill("."));

  const colSet = new Set<number>();
  const posSet = new Set<number>(); // (r + c)
  const negSet = new Set<number>(); // (r - c)

  function dfs(r: number) {
    if (r === n) {
      result.push(board.map((row) => row.join("")));
      return;
    }

    for (let c = 0; c < n; c++) {
      if (colSet.has(c) || posSet.has(r + c) || negSet.has(r - c)) {
        continue;
      }

      colSet.add(c);
      posSet.add(r + c);
      negSet.add(r - c);
      board[r][c] = "Q";
      dfs(r + 1);

      colSet.delete(c);
      posSet.delete(r + c);
      negSet.delete(r - c);
      board[r][c] = ".";
    }
  }

  dfs(0);

  return result;
}
