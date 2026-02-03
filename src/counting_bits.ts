// 338. Counting Bits

// Method 1: Brute Force
// Time: O(n log n), Space: O(1)
function countBits(n: number): number[] {
  const result = [];

  for (let i = 0; i <= n; i++) {
    let count = 0;
    let num = i;
    while (num !== 0) {
      count += num & 1;
      num >>>= 1;
    }
    result.push(count);
  }

  return result;
}

// Method 2: DP using Highest Power of Two
// Time: O(n), Space: O(n)
function countBits2(n: number): number[] {
  const dp = new Array(n + 1).fill(0);
  let offset = 1;
  for (let i = 1; i <= n; i++) {
    if (i === offset * 2) {
      offset = i;
    }
    dp[i] = 1 + dp[i - offset];
  }
  return dp;
}

// Method 3: DP using Last Bit
// Time: O(n), Space: O(n)
function countBits3(n: number): number[] {
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i >>> 1] + (i & 1);
  }
  return dp;
}
