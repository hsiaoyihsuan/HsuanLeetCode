// 994. Rotting Oranges
// BFS
function orangesRotting(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const queue: [number, number][] = [];
  let fresh = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) {
        queue.push([r, c]);
      } else if (grid[r][c] === 1) {
        fresh++;
      }
    }
  }

  if (fresh === 0) {
    return 0;
  }

  let minute = 0;

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
        const newR = r + dr;
        const newC = c + dc;
        if (
          newR >= 0 &&
          newC >= 0 &&
          newR < rows &&
          newC < cols &&
          grid[newR][newC] === 1
        ) {
          queue.push([newR, newC]);
          grid[newR][newC] = 2;
          fresh--;
        }
      }
    }
    minute++;
  }

  if (fresh > 0) {
    return -1;
  }

  return minute - 1;
}
