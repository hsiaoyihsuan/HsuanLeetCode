// 494. Target Sum

// Method: DFS + Memoization (Top-down DP)
// Time: O(n × totalSum)
// - n positions × possible sum states
// Space: O(n × totalSum)
// - Memo table + recursion stack
function findTargetSumWays(nums: number[], target: number): number {
  const total = nums.reduce((a, b) => a + b, 0);

  const cache = Array.from({length: nums.length}, () =>
    new Array(1 + 2 * total).fill(-1),
  );

  function dfs(i: number, remain: number): number {
    if (i === nums.length) {
      return remain === target ? 1 : 0;
    }

    const idx = remain + total;
    if (cache[i][idx] !== -1) return cache[i][idx];

    let result = dfs(i + 1, remain - nums[i]) + dfs(i + 1, remain + nums[i]);

    cache[i][idx] = result;
    return result;
  }

  return dfs(0, 0);
}
