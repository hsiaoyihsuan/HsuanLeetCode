// 97. Interleaving String

// Method: DFS (Brute Force)
//
// Idea:
// - At each position i3 in s3, try to match from:
//   1) s1[i1]
//   2) s2[i2]
// - If both match, branch into two recursive calls
// - If neither matches, return false
//
// Time: O(2^(m+n)) worst case
// - When characters are same, we branch
//
// Space: O(m+n)
// - Recursion depth
function isInterleave(s1: string, s2: string, s3: string): boolean {
  if (s1.length + s2.length !== s3.length) return false;

  function dfs(i1: number, i2: number, i3: number): boolean {
    if (i3 === s3.length) return true;

    if (s1[i1] !== s3[i3] && s2[i2] !== s3[i3]) return false;

    if (s1[i1] === s3[i3] && s2[i2] !== s3[i3]) {
      return dfs(i1 + 1, i2, i3 + 1);
    } else if (s1[i1] !== s3[i3] && s2[i2] === s3[i3]) {
      return dfs(i1, i2 + 1, i3 + 1);
    } else {
      return dfs(i1 + 1, i2, i3 + 1) || dfs(i1, i2 + 1, i3 + 1);
    }
  }

  return dfs(0, 0, 0);
}

// Method: DFS + Memoization
//
// Idea:
// - State defined by (i1, i2)
// - i3 can be derived as i1 + i2
// - At each step, try to match s3[i1+i2] with:
//     1) s1[i1]
//     2) s2[i2]
// - Cache results to avoid recomputation
//
// Time: O(m * n)
// Space: O(m * n)
function isInterleave2(s1: string, s2: string, s3: string): boolean {
  if (s1.length + s2.length !== s3.length) return false;

  const cache = Array.from({length: s1.length + 1}, () =>
    new Array(s2.length + 1).fill(null),
  );

  function dfs(i1: number, i2: number): boolean {
    const idx = i1 + i2;

    if (idx === s3.length) return true;

    if (cache[i1][i2] !== null) return cache[i1][i2];

    if (s1[i1] !== s3[idx] && s2[i2] !== s3[idx]) {
      cache[i1][i2] = false;
    } else if (s1[i1] === s3[idx] && s2[i2] !== s3[idx]) {
      cache[i1][i2] = dfs(i1 + 1, i2);
    } else if (s1[i1] !== s3[idx] && s2[i2] === s3[idx]) {
      cache[i1][i2] = dfs(i1, i2 + 1);
    } else {
      cache[i1][i2] = dfs(i1 + 1, i2) || dfs(i1, i2 + 1);
    }

    return cache[i1][i2];
  }

  return dfs(0, 0);
}

// Method: Bottom-up DP
// dp[i][j] = whether s1[0..i-1] and s2[0..j-1]
//             can form s3[0..i+j-1]
//
// Time: O(m * n)
// Space: O(m * n)
function isInterleave3(s1: string, s2: string, s3: string): boolean {
  const m = s1.length;
  const n = s2.length;

  if (m + n !== s3.length) return false;

  const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(false));

  dp[0][0] = true;

  for (let i = 0; i < m + 1; i++) {
    for (let j = 0; j < n + 1; j++) {
      if (i > 0 && dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) {
        dp[i][j] = true;
      }
      if (j > 0 && dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]) {
        dp[i][j] = true;
      }
    }
  }
  return dp[m][n];
}

// Method: Bottom-up DP (Reverse direction)
//
// dp[i][j] = whether s1[i:] and s2[j:]
//             can form s3[i+j:]
//
// Base case:
// dp[m][n] = true  (all strings consumed)
//
// Transition:
// From (i, j), we try:
// 1) Take s1[i] → check dp[i+1][j]
// 2) Take s2[j] → check dp[i][j+1]
//
// Time: O(m * n)
// Space: O(m * n)
function isInterleave4(s1: string, s2: string, s3: string): boolean {
  const m = s1.length;
  const n = s2.length;

  if (m + n !== s3.length) return false;

  const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(false));

  dp[m][n] = true;

  for (let i = m; i >= 0; i--) {
    for (let j = n; j >= 0; j--) {
      if (i < m && s1[i] === s3[i + j] && dp[i + 1][j]) {
        dp[i][j] = true;
      }
      if (j < n && s2[j] === s3[i + j] && dp[i][j + 1]) {
        dp[i][j] = true;
      }
    }
  }

  return dp[0][0];
}
