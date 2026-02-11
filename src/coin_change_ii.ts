// 518. Coin Change II
// Method: DFS + Memoization (Top-down DP)
// Time: O(n × amount), Space: O(n × amount)
function change(amount: number, coins: number[]): number {
  const cache = Array.from({length: coins.length}, () =>
    new Array(amount + 1).fill(-1),
  );

  function dfs(i: number, remain: number): number {
    if (remain === 0) return 1; // found a valid combination
    if (i === coins.length) return 0; // no coins left

    if (cache[i][remain] !== -1) return cache[i][remain];

    // Option 1: skip current coin
    let ways = dfs(i + 1, remain);

    // Option 2: take current coin (stay at i because unlimited usage)
    if (remain >= coins[i]) {
      ways += dfs(i, remain - coins[i]);
    }

    cache[i][remain] = ways;
    return ways;
  }

  return dfs(0, amount);
}
