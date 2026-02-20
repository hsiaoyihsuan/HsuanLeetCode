// 139. Word Break
// Method 1: Recursion (Brute Force)
// Time: Exponential
// Space: O(n) (recursion depth)
function wordBreak(s: string, wordDict: string[]): boolean {
  if (s.length === 0) return true;

  for (const word of wordDict) {
    if (!s.startsWith(word)) continue;

    if (wordBreak(s.slice(word.length), wordDict)) {
      return true;
    }
  }

  return false;
}

// Method 2: DP (Top-down / Memoization)
// Time: O(n × m × k)
//   n = length of s
//   m = number of words
//   k = average word length
// Space: O(n)
function wordBreak2(s: string, wordDict: string[]): boolean {
  const cache = Array(s.length).fill(null);

  function dfs(i: number): boolean {
    if (i === s.length) return true;
    if (cache[i] !== null) return cache[i];

    const subString = s.slice(i);

    for (const word of wordDict) {
      if (subString.startsWith(word) && dfs(i + word.length)) {
        return true;
      }
    }

    cache[i] = false;
    return false;
  }

  return dfs(0);
}

// Method 3: DP (Bottom-up)
// Time: O(n × m × k)
//   n = length of s
//   m = number of words
//   k = average word length
// Space: O(n)
function wordBreak3(s: string, wordDict: string[]): boolean {
  const dp = new Array(s.length + 1).fill(false);
  dp[dp.length - 1] = true;

  for (let i = dp.length; i >= 0; i--) {
    for (const word of wordDict) {
      if (i + word.length >= dp.length || !dp[i + word.length]) continue;

      if (s.slice(i, i + word.length) === word) {
        dp[i] = true;
      }
    }
  }
  return dp[0];
}
