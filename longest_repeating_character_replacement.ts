// 424. Longest Repeating Character Replacement
// Sliding Window with finding max. Time: O(26n) => O(n)
function characterReplacementV1(s: string, k: number): number {
  const map = new Map<string, number>();
  let result = 0;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    map.set(s[right], (map.get(s[right]) ?? 0) + 1);

    while (right - left + 1 - Math.max(...map.values()) > k) {
      map.set(s[left], map.get(s[left]) - 1);
      left++;
    }

    result = Math.max(right - left + 1, result);
  }
  return result;
}

// Optimize the max frequency
// If the maxCount doesn't change or goes down, the potential best answer doesn't change. We don't need to change the masCount
function characterReplacementV2(s: string, k: number): number {
  const map = new Map<string, number>();
  let maxCount = 0;
  let result = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    map.set(s[right], (map.get(s[right]) ?? 0) + 1);
    maxCount = Math.max(maxCount, map.get(s[right]));

    while (right - left + 1 - maxCount > k) {
      map.set(s[left], map.get(s[left]) - 1);
      left++;
    }

    result = Math.max(right - left + 1, result);
  }
  return result;
}
