// 3. Longest Substring Without Repeating Characters
// Time: O(n2)
function lengthOfLongestSubstringV1(s: string): number {
  let result: number = 0;
  for (let i = 0; i < s.length; i++) {
    const set = new Set();
    for (let j = i; j < s.length; j++) {
      if (!set.has(s[j])) {
        set.add(s[j]);
      } else {
        break;
      }
    }
    result = Math.max(result, set.size);
  }
  return result;
}

// Sliding Window. Time: O(n), Space: O(n)
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
