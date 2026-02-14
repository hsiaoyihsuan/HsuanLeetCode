// 329. Longest Increasing Path in a Matrix

// Method: DFS + Memoization
//
// Idea:
// From each cell, try to move to its 4 neighbors that have
// strictly larger values. Use memoization so each cell is
// computed only once.
//
// Time:  O(m * n)
// Space: O(m * n)
function longestIncreasingPath(matrix: number[][]): number {
  const m = matrix.length;
  const n = matrix[0].length;

  const cache = Array.from({length: m}, () => new Array(n).fill(-1));

  function dfs(r: number, c: number, prev: number): number {
    if (r < 0 || c < 0 || r >= m || c >= n || matrix[r][c] <= prev) {
      return 0;
    }

    if (cache[r][c] !== -1) return cache[r][c];

    let longest = 1;
    longest = Math.max(longest, 1 + dfs(r + 1, c, matrix[r][c]));
    longest = Math.max(longest, 1 + dfs(r - 1, c, matrix[r][c]));
    longest = Math.max(longest, 1 + dfs(r, c + 1, matrix[r][c]));
    longest = Math.max(longest, 1 + dfs(r, c - 1, matrix[r][c]));

    cache[r][c] = longest;
    return longest;
  }

  let result = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      result = Math.max(result, dfs(i, j, -1));
    }
  }

  return result;
}
