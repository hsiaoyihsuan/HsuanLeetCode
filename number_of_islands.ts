// 200. Number of Islands
// BFS. Time: O(m x n). Space: O(min(m x n)).
function numIslands(grid: string[][]): number {
  if (!grid || grid.length === 0) return 0;

  let result = 0;
  let rows = grid.length;
  let cols = grid[0].length;

  function bfs(grid: string[][], i: number, j: number): void {
    const queue: [number, number][] = [[i, j]];
    grid[i][j] = "0"; // visited

    while (queue.length > 0) {
      const [x, y] = queue.shift()!;
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const newX = x + dx;
        const newY = y + dy;
        if (newX < 0 || newY < 0 || newX >= rows || newY >= cols) continue;

        if (grid[newX][newY] === "1") {
          queue.push([newX, newY]);
          grid[newX][newY] = "0";
        }
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === "1") {
        result++;
        bfs(grid, i, j);
      }
    }
  }

  return result;
}
