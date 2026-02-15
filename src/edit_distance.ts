// 72. Edit Distance
//
// Method: Bottom-up Dynamic Programming (2D DP on suffix states)
//
// dp[i][j] = minimum operations needed to convert
//            word1[i:] into word2[j:]
//
// Fill table from bottom-right → top-left
// because each state depends on:
//   dp[i+1][j]     (delete)
//   dp[i][j+1]     (insert)
//   dp[i+1][j+1]   (replace / match)
//
// Time:  O(m * n)
// Space: O(m * n)
function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;

  const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(0));

  for (let i = 0; i < m + 1; i++) {
    dp[i][n] = m - i;
  }

  for (let i = 0; i < n + 1; i++) {
    dp[m][i] = n - i;
  }

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      // If characters match, no operation needed
      if (word1[i] === word2[j]) {
        dp[i][j] = dp[i + 1][j + 1];
        continue;
      }

      dp[i][j] = Math.min(
        1 + dp[i][j + 1], // Insert
        1 + dp[i + 1][j], // Delete
        1 + dp[i + 1][j + 1], // Replace
      );
    }
  }

  return dp[0][0];
}

//    r o s _
// h [3 3 4 5]
// o [3 2 3 4]
// r [2 2 2 3]
// s [3 2 1 2]
// e [3 2 1 1]
// _ [3 2 1 0]
