// 91. Decode Ways

// Method 1: Recursion
// Time: O(2 ^ n), Space: O(n)
function numDecodings(s: string): number {
  function dfs(i: number): number {
    // successfully decode entire string
    if (i === s.length) return 1;

    if (s[i] === "0") return 0;

    let result = dfs(i + 1);
    if (
      i + 1 < s.length &&
      (s[i] === "1" || (s[i] === "2" && s[i + 1] < "7"))
    ) {
      result += dfs(i + 2);
    }

    return result;
  }

  return dfs(0);
}

// DP (Top-down)
// Time: O(n), Space: O(n)
function numDecodings2(s: string): number {
  const memo = new Map<number, number>();

  function dfs(i: number): number {
    if (memo.has(i)) return memo.get(i)!;

    // successfully decode entire string
    if (i === s.length) return 1;

    if (s[i] === "0") return 0;

    let result = dfs(i + 1);
    if (
      i + 1 < s.length &&
      (s[i] === "1" || (s[i] === "2" && s[i + 1] < "7"))
    ) {
      result += dfs(i + 2);
    }

    memo.set(i, result);

    return result;
  }

  return dfs(0);
}

// DP (Bottom-up)
// Time: O(n), Space: O(n)
function numDecodings3(s: string): number {
  const dp = new Array(s.length + 1).fill(0);
  dp[s.length] = 1;

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === "0") {
      dp[i] = 0;
      continue;
    }

    dp[i] = dp[i + 1];

    if (
      i + 1 < s.length &&
      (s[i] === "1" || (s[i] === "2" && s[i + 1] < "7"))
    ) {
      dp[i] += dp[i + 2];
    }
  }

  return dp[0];
}

// DP (Bottom-up) (Space-optimized)
// Time: O(n), Space: O(1)
function numDecodings4(s: string): number {
  let dp1 = 1;
  let dp2 = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === "0") {
      dp2 = dp1;
      dp1 = 0;
      continue;
    }

    let tmp = dp1;

    if (
      i + 1 < s.length &&
      (s[i] === "1" || (s[i] === "2" && s[i + 1] < "7"))
    ) {
      tmp += dp2;
    }
    dp2 = dp1;
    dp1 = tmp;
  }

  return dp1;
}
