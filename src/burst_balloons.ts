// 312. Burst Balloons
//
// Method: Interval DP (Top-down + Memo)
//
// dfs(l, r) = maximum coins obtainable
//             by bursting balloons in interval [l, r]
//
// Key idea:
// Assume balloon i is the LAST balloon burst in [l, r].
// Then its neighbors must be:
//   arr[l - 1] and arr[r + 1]
//
// Transition:
// dfs(l, r) = max over i in [l, r]:
//   dfs(l, i - 1) +
//   dfs(i + 1, r) +
//   arr[l - 1] * arr[i] * arr[r + 1]
//
// Time:  O(n^3)
// Space: O(n^2)
export function maxCoins(nums: number[]): number {
  const arr = [1, ...nums, 1];
  const n = arr.length;

  const dp = Array.from({length: n}, () => Array(n).fill(-1));

  function dfs(l: number, r: number): number {
    if (l > r) return 0;

    if (dp[l][r] !== -1) return dp[l][r];

    for (let i = l; i <= r; i++) {
      let coins = arr[l - 1] * arr[i] * arr[r + 1];
      coins += dfs(l, i - 1);
      coins += dfs(i + 1, r);
      dp[l][r] = Math.max(dp[l][r], coins);
    }

    return dp[l][r];
  }

  return dfs(1, n - 2);
}
