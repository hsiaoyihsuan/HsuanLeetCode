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

// Method: Bottom-up DP (2D)
//
// dp[i][j] = number of ways to make amount j
//            using first i coins
//
// Transition:
// 1) Not take coin i:
//      dp[i][j] = dp[i - 1][j]
//
// 2) Take coin i (unbounded):
//      dp[i][j] += dp[i][j - coin]
//
// Time: O(n * amount)
// Space: O(n * amount)
function change2(amount: number, coins: number[]): number {
  const dp = Array.from({length: coins.length + 1}, () =>
    new Array(amount + 1).fill(0),
  );

  // Base case: amount 0 has exactly 1 way (choose nothing)
  for (let i = 0; i < coins.length + 1; i++) {
    dp[i][0] = 1;
  }

  for (let i = 1; i < coins.length + 1; i++) {
    for (let j = 1; j < amount + 1; j++) {
      dp[i][j] = dp[i - 1][j];

      const coin = coins[i - 1];
      if (j >= coin) {
        dp[i][j] += dp[i][j - coin];
      }
    }
  }

  return dp[coins.length][amount];
}

/*
Example:
coins = [1,2,5], amount = 5

        amount →
        0 1 2 3 4 5
i=0     1 0 0 0 0 0
i=1(1)  1 1 1 1 1 1
i=2(2)  1 1 2 2 3 3
i=3(5)  1 1 2 2 3 4

Answer = dp[3][5] = 4
*/
