// 322. Coin Change
/**
 * Key Notes:
 * - Greedy does NOT always work
 *   Example: 6 → greedy [4,1,1], optimal [3,3]
 * - Use -1 to represent "cannot form the amount"
 * - Always skip invalid sub-results (-1)
 */

// Method 1: Recursion (Brute Force)
// Time: O(coins.length ^ amount), Space: O(amount)
function coinChange(coins: number[], amount: number): number {
  if (amount === 0) return 0;
  if (amount < 0) return -1;

  let min = Infinity;

  for (const coin of coins) {
    const res = coinChange(coins, amount - coin);
    if (res === -1) continue;

    min = Math.min(min, res + 1);
  }

  return min === Infinity ? -1 : min;
}

// Method 2: DP (Top-down / Memoization)
// Time: O(amount × coins.length), Space: O(amount)
function coinChange2(coins: number[], amount: number): number {
  const memo = new Map<number, number>();

  function dfs(amount: number): number {
    if (memo.has(amount)) return memo.get(amount)!;
    if (amount === 0) return 0;
    if (amount < 0) return -1;

    let min = Infinity;

    for (const coin of coins) {
      const res = dfs(amount - coin);
      if (res === -1) continue;

      min = Math.min(min, res + 1);
    }

    memo.set(amount, min === Infinity ? -1 : min);
    return memo.get(amount)!;
  }

  return dfs(amount);
}

// Method 3: DP (Bottom-up)
// Time: O(amount × coins.length), Space: O(amount)
function coinChange3(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

function coinChange4(coins: number[], amount: number): number {
  let dp = Array(amount + 1).fill(Infinity);
  dp[amount] = 0;

  for (let i = coins.length - 1; i >= 0; i--) {
    let tmp = Array(amount + 1).fill(Infinity);
    tmp[amount] = 0;
    for (let j = amount - 1; j >= 0; j--) {
      tmp[j] = dp[j];
      if (j + coins[i] < amount + 1) {
        tmp[j] = Math.min(tmp[j], 1 + tmp[j + coins[i]]);
      }
    }
    dp = tmp;
  }

  return dp[0] === Infinity ? -1 : dp[0];
}

//    11 10 ... 2 1 0
// 1 [0, 0, ...     0]
// 2 [0, 0, ...     0]
// 5 [0, 0, ...     0]
// x [I, I, ...     0]
