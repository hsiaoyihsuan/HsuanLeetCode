// 695. Max Area of Island
// DFS
// Time Complexity: O(m * n)
//   - Each cell is visited at most once.
// Space Complexity: O(m * n)
//   - Worst case: the recursion stack can grow to the size of the entire grid
//     (e.g., one large island filling the grid).

function maxAreaOfIsland(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r: number, c: number): number {
    // Out of bounds or water → no area
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== 1) {
      return 0;
    }

    // Mark as visited
    grid[r][c] = 0;

    // Count current land cell
    let area = 1;

    // Explore 4 directions
    area += dfs(r + 1, c);
    area += dfs(r - 1, c);
    area += dfs(r, c + 1);
    area += dfs(r, c - 1);

    return area;
  }

  let maxArea = 0;

  // Scan the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        maxArea = Math.max(maxArea, dfs(r, c));
      }
    }
  }

  return maxArea;
}

// BFS
// Time Complexity: O(m * n)
//   - Each cell is visited at most once.
// Space Complexity: O(m * n)
//   - In the worst case the queue can hold many cells (one large island).
function maxAreaOfIslandBFS(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  function bfs(startR: number, startC: number): number {
    const queue = [[startR, startC]];
    grid[startR][startC] = 0;
    let area = 1;

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;

      for (const [dr, dc] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const newR = r + dr;
        const newC = c + dc;
        if (
          newR < 0 ||
          newC < 0 ||
          newR >= rows ||
          newC >= cols ||
          grid[newR][newC] !== 1
        ) {
          continue;
        }

        queue.push([newR, newC]);
        grid[newR][newC] = 0;
        area++;
      }
    }

    return area;
  }

  let maxArea = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        maxArea = Math.max(maxArea, bfs(r, c));
      }
    }
  }
  return maxArea;
}
