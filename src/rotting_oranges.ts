// 994. Rotting Oranges
// BFS
function orangesRotting(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue: number[][] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) {
        queue.push([r, c]);
      }
    }
  }

  let time = 0;
  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift()!;
      for (const [dr, dc] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const R = r + dr;
        const C = c + dc;
        if (R < 0 || C < 0 || R >= rows || C >= cols || grid[R][C] !== 1) {
          continue;
        }

        queue.push([R, C]);
        grid[R][C] = 2;
      }
    }
    time++;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        return -1;
      }
    }
  }

  return Math.max(time - 1, 0);
}
