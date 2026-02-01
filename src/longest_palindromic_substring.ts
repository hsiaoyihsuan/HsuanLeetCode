// 5. Longest Palindromic Substring
// Expand Around Center
// Time: O(n^2), Space: O(1)
function longestPalindrome(s: string): string {
  // Track the longest palindrome boundaries
  let maxLength = 0;
  let maxLeft = 0;
  let maxRight = 0;

  for (let i = 0; i < s.length; i++) {
    // -------- Odd length palindrome (center at i) --------
    let left = i;
    let right = i;

    // Expand while valid and characters match
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currLen = right - left + 1;
      if (currLen > maxLength) {
        maxLength = currLen;
        maxLeft = left;
        maxRight = right;
      }
      left--;
      right++;
    }

    // -------- Even length palindrome (center between i and i + 1) --------
    left = i;
    right = i + 1;

    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currLen = right - left + 1;
      if (currLen > maxLength) {
        maxLength = currLen;
        maxLeft = left;
        maxRight = right;
      }
      left--;
      right++;
    }
  }

  // Return the longest palindromic substring found
  return s.slice(maxLeft, maxRight + 1);
}
