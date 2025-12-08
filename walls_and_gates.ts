// 286. Walls and Gates
// BFS. Time: O((m x n)^2), Space: O(m x n)
function wallsAndGates(grid: number[][]) {
  const rows = grid.length;
  const cols = grid[0].length;
  const INF = 2147483647;

  function bfs(startR: number, startC: number) {
    const queue = [[startR, startC]];
    const visited = Array.from({length: rows}, () =>
      new Array(cols).fill(false)
    );
    visited[startR][startC] = true;

    let distance = 0;
    while (queue.length > 0) {
      const size = queue.length;
      for (let i = 0; i < size; i++) {
        const [r, c] = queue.shift()!;

        if (grid[r][c] === 0) {
          grid[startR][startC] = distance;
          return;
        }

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
            grid[newR][newC] === -1 ||
            visited[newR][newC]
          ) {
            continue;
          }

          queue.push([newR, newC]);
          visited[newR][newC] = true;
        }
      }

      distance++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== INF) continue;

      bfs(r, c);
    }
  }

  return grid;
}

// Multi source BFS. Time: O(m x n), Space: O(m x n)
function wallsAndGatesV2(grid: number[][]) {
  const INF = 2147483647;
  const rows = grid.length;
  const cols = grid[0].length;
  const queue: number[][] = [];
  const visited = Array.from({length: rows}, () => new Array(cols).fill(false));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 0) {
        queue.push([r, c]);
        visited[r][c] = true;
      }
    }
  }

  let distance = 0;
  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift()!;
      grid[r][c] = distance;

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
          visited[newR][newC] ||
          grid[newR][newC] !== INF
        ) {
          continue;
        }

        queue.push([newR, newC]);
        visited[newR][newC] = true;
      }
    }
    distance++;
  }

  return grid;
}
