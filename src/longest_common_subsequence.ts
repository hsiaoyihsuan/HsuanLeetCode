// 1143. Longest Common Subsequence
// DP (Bottom-up)
// Time: O(n * m), Space: O(n * m)
function longestCommonSubsequence(text1: string, text2: string): number {
  const dp = Array.from({length: text1.length + 1}, () =>
    new Array(text2.length + 1).fill(0),
  );

  for (let i = 0; i < text1.length; i++) {
    for (let j = 0; j < text2.length; j++) {
      if (text1[i] === text2[j]) {
        dp[i + 1][j + 1] = 1 + dp[i][j];
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    }
  }
  return dp[text1.length][text2.length];
}
//     a  c  e
// [0, 0, 0, 0]
//a[0, 1, 0, 0]
//b[0, 0, 0, 0]
//c[0, 0, 0, 0]
//d[0, 0, 0, 0]
//e[0, 0, 0, 0]
