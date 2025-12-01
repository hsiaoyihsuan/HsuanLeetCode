// 200. Number of Islands

// BFS. Time: O(m x n). Space: O(m x n).
function numIslands(grid: string[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  function bfs(startR: number, startC: number) {
    const queue: [number, number][] = [[startR, startC]];
    grid[startR][startC] = "0"; // mark as visited

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;

      for (const [dr, dc] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const nr = r + dr;
        const nc = c + dc;

        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < rows &&
          nc < cols &&
          grid[nr][nc] === "1"
        ) {
          queue.push([nr, nc]);
          grid[nr][nc] = "0";
        }
      }
    }
  }

  let islands = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        islands++;
        bfs(r, c);
      }
    }
  }

  return islands;
}

// DFS
// Time: O(m x n), Space: O(m x n)
function numIslandsDFS(grid: string[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r: number, c: number) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === "0") {
      return;
    }

    grid[r][c] = "0";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}
