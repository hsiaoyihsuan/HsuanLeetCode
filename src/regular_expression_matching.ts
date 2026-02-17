// 10. Regular Expression Matching

// Method: DFS + Memoization
//
// dfs(i, j):
//   whether s[i:] matches p[j:]
//
// Time:  O(m * n)
// Space: O(m * n)
function isMatch(s: string, p: string): boolean {
  const m = s.length;
  const n = p.length;

  // memo[i][j] stores result of dfs(i, j)
  const memo: (boolean | undefined)[][] = Array.from({length: m + 1}, () =>
    Array(n + 1),
  );

  function dfs(i: number, j: number): boolean {
    // If pattern is exhausted, string must also be exhausted
    if (j === n) return i === m;

    if (memo[i][j] !== undefined) return memo[i][j];

    // Check if current character matches
    const firstMatch = i < m && (s[i] === p[j] || p[j] === ".");

    let result: boolean;

    // If next char is '*', we have two choices:
    if (j + 1 < n && p[j + 1] === "*") {
      result =
        dfs(i, j + 2) || // skip "x*"
        (firstMatch && dfs(i + 1, j)); // use "x*"
    } else {
      // Otherwise we must match current char and move both pointers
      result = firstMatch && dfs(i + 1, j + 1);
    }

    memo[i][j] = result;
    return result;
  }

  return dfs(0, 0);
}

// Method: Bottom-Up Dynamic Programming (2D DP Table)
//
// dp[i][j] = whether s[i:] matches p[j:]
//
// Transition:
// 1) If next pattern char is '*':
//      dp[i][j] =
//          dp[i][j + 2]                 // skip "x*"
//          ||
//          (firstMatch && dp[i + 1][j]) // use "x*"
//
// 2) Otherwise:
//      dp[i][j] = firstMatch && dp[i + 1][j + 1]
//
// Base Case:
//   dp[m][n] = true
//   Initialize last row dp[m][j] for patterns like "a*b*c*"
//
// Time Complexity:  O(m * n)
//   - We fill an (m+1) × (n+1) table once.
//   - Each cell does O(1) work.
//
// Space Complexity: O(m * n)
//   - 2D DP table.
function isMatch2(s: string, p: string): boolean {
  const m = s.length;
  const n = p.length;

  const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(false));
  dp[m][n] = true;

  // Initialize last row (empty string vs pattern)
  for (let j = n - 1; j >= 0; j--) {
    if (j + 1 < n && p[j + 1] === "*") {
      dp[m][j] = dp[m][j + 2];
    }
  }

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const firstMatch = s[i] === p[j] || p[j] === ".";

      if (j + 1 < n && p[j + 1] === "*") {
        dp[i][j] = dp[i][j + 2] || (firstMatch && dp[i + 1][j]);
      } else {
        dp[i][j] = firstMatch && dp[i + 1][j + 1];
      }
    }
  }

  return dp[0][0];
}

//    a * b _
// a [T F F F]
// a [T F F F]
// b [T F T F]
// _ [F F F T]
