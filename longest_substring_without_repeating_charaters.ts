// 3. Longest Substring Without Repeating Characters
// Sliding Window.
// Time: O(n), Space: O(n)
function lengthOfLongestSubstringV2(s: string): number {
  const set = new Set<string>();
  let result = 0;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    result = Math.max(result, right - left + 1);
  }

  return result;
}
