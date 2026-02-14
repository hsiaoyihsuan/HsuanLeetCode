// 115. Distinct Subsequences

// Method: DFS + Memoization
//
// dfs(i1, i2) = number of ways to form t[i2:] using s[i1:]
//
// At each position in s, we have two choices:
// 1) Skip current character in s
//      dfs(i1 + 1, i2)
// 2) If characters match, use it
//      dfs(i1 + 1, i2 + 1)
//
// Time:  O(|s| * |t|)
// Space: O(|s| * |t|)
function numDistinct(s: string, t: string): number {
  const cache = Array.from({length: s.length}, () =>
    new Array(t.length).fill(-1),
  );

  function dfs(i1: number, i2: number) {
    if (i2 === t.length) return 1;

    if (i1 === s.length) return 0;

    if (cache[i1][i2] !== -1) return cache[i1][i2];

    cache[i1][i2] = dfs(i1 + 1, i2);

    if (s[i1] === t[i2]) {
      cache[i1][i2] += dfs(i1 + 1, i2 + 1);
    }

    return cache[i1][i2];
  }

  return dfs(0, 0);
}

// Method: Bottom-up DP (1D rolling array)
//
// dp[j] = number of ways to form t[j:]
//         using the suffix of s starting at current i
//
// Transition (from right → left):
// 1) Skip s[i]:
//      dp[j] = dp[j]   (value from next row)
//
// 2) If s[i] === t[j], use it:
//      dp[j] += dp[j+1]
//
// Time:  O(|s| * |t|)
// Space: O(|t|)
function numDistinct2(s: string, t: string): number {
  let dp = Array(t.length + 1).fill(0);
  dp[t.length] = 1;

  for (let i = s.length - 1; i >= 0; i--) {
    let tmp = Array(t.length + 1).fill(0);
    tmp[t.length] = 1;

    for (let j = t.length - 1; j >= 0; j--) {
      tmp[j] = dp[j];
      if (s[i] === t[j]) {
        tmp[j] += dp[j + 1];
      }
    }
    dp = tmp;
  }

  return dp[0];
}

// s = redd
// t = red
//    r e d
// r [2 2 2 1]
// e [0 2 2 1]
// d [0 0 2 1]
// d [0 0 1 1]
//   [0 0 0 1]
