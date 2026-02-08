// 62. Unique Paths
// Method: Memoization
// Time: O(m x n), Space: O(m x n)
export function uniquePaths(m: number, n: number): number {
  const cache = Array.from({length: m}, () => new Array(n).fill(-1));

  function dfs(r: number, c: number) {
    if (r === m || c === n) return 0;

    if (cache[r][c] !== -1) return cache[r][c];

    if (r === m - 1 && c === n - 1) {
      cache[r][c] = 1;
    } else {
      cache[r][c] = dfs(r, c + 1) + dfs(r + 1, c);
    }

    return cache[r][c];
  }

  return dfs(0, 0);
}

// Method: DP (Bottom-up)
// Time: O(m x n), Space: O(m x n)
export function uniquePaths2(m: number, n: number): number {
  const dp = Array.from({length: m}, () => new Array(n).fill(1));

  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }

  return dp[m - 1][n - 1];
}
