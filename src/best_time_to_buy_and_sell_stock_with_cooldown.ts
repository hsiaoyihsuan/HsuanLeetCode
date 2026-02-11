// 309. Best Time to Buy and Sell Stock with Cooldown

// Method: DFS + Memoization (Top-down DP)
// Time: O(n)
// - n × 2 states, each computed once
// Space: O(n)
// - Memo table + recursion stack
function maxProfit(prices: number[]): number {
  const cache = Array.from({length: prices.length}, () => [-1, -1]);

  function dfs(i: number, shouldBuy: boolean): number {
    if (i >= prices.length) return 0;

    const stateIndex = shouldBuy ? 0 : 1;
    if (cache[i][stateIndex] !== -1) return cache[i][stateIndex];

    if (shouldBuy) {
      cache[i][0] = Math.max(-prices[i] + dfs(i + 1, false), dfs(i + 1, true));
    } else {
      cache[i][1] = Math.max(prices[i] + dfs(i + 2, true), dfs(i + 1, false));
    }

    return cache[i][stateIndex];
  }

  return dfs(0, true);
}
