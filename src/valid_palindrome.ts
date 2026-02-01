// 125. Valid Palindrome
// Method: Two Pointers
// Time: O(n) — traverse the cleaned string once
// Space: O(n) — for storing the cleaned and lowercased string
function isPalindrome(s: string): boolean {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleaned = s.replace(/[^a-z0-9]/gi, "").toLowerCase();
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
