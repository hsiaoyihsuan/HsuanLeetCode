// 647. Palindromic Substrings
// Brute force solution: Time: O(n2), Space: O(1)

// Two Pointers & Dynamic Programming. Time: O(n2), Space: O(1)
function countSubstrings(s: string): number {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    // Odd-length palindromes (single character as the center)
    let left = i;
    let right = i;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      result++;
      left--;
      right++;
    }

    // Even-length palindromes (two characters as the center)
    left = i;
    right = i + 1;
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      result++;
      left--;
      right++;
    }
  }

  return result;
}
