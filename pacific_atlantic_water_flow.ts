// 417. Pacific Atlantic Water Flow
// Version 1: Brute-force solution. Use BFS for every points. Time: O((M x N)2)
function pacificAtlanticV1(heights: number[][]): number[][] {
  const rows = heights.length; // Number of rows
  const cols = heights[0].length; // Number of columns
  const result: [number, number][] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (
        searchOcean(i, j, [0, 0]) && // Check Pacific
        searchOcean(i, j, [rows - 1, cols - 1]) // Check Atlantic
      ) {
        result.push([i, j]); // Be care of the coordinates
      }
    }
  }

  return result;

  function searchOcean(
    i: number,
    j: number,
    target: [number, number]
  ): boolean {
    const visited: boolean[][] = Array.from({length: rows}, () =>
      Array(cols).fill(false)
    );
    const queue: [number, number][] = [[i, j]];
    visited[i][j] = true;

    while (queue.length > 0) {
      const [x, y] = queue.shift()!;

      // If we reach the boundary (target ocean), return true
      if (x === target[0] || y === target[1]) return true;

      for (const [dx, dy] of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]) {
        const newX = x + dx;
        const newY = y + dy;

        // Check bounds and whether the new cell is valid
        if (
          newX >= 0 &&
          newY >= 0 &&
          newX < rows &&
          newY < cols &&
          !visited[newX][newY] &&
          heights[newX][newY] <= heights[x][y]
        ) {
          queue.push([newX, newY]);
          visited[newX][newY] = true;
        }
      }
    }

    return false;
  }
}

// Version 2: Strating from the edges, use DFS to find the points in the opposite way.
// Time: O(M x N). Space: O(M x N) for pacific and atlantic. O(M + N) for DFS
function pacificAtlanticV2(heights: number[][]): number[][] {
  const rows = heights.length;
  const cols = heights[0].length;
  const pacific = Array.from({length: rows}, () => Array(cols).fill(false));
  const atlantic = Array.from({length: rows}, () => Array(cols).fill(false));
  const result: [number, number][] = [];

  function dfs(
    r: number,
    c: number,
    visited: boolean[][],
    prevHeight: number
  ): void {
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      visited[r][c] ||
      heights[r][c] < prevHeight
    ) {
      return;
    }

    visited[r][c] = true;
    for (const [dr, dc] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      dfs(r + dr, c + dc, visited, heights[r][c]);
    }
  }

  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pacific, heights[r][0]); // Left column (Pacific)
    dfs(r, cols - 1, atlantic, heights[r][cols - 1]); // Right column (Atlantic)
  }
  for (let c = 0; c < cols; c++) {
    dfs(0, c, pacific, heights[0][c]); // Top row (Pacific)
    dfs(rows - 1, c, atlantic, heights[rows - 1][c]); // Bottom row (Atlantic)
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pacific[r][c] && atlantic[r][c]) {
        result.push([r, c]);
      }
    }
  }
  return result;
}
