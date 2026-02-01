// 567. Permutation in String
function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  const map = new Map<string, number>();
  for (const char of s1) {
    map.set(char, (map.get(char) ?? 0) + 1);
  }

  let left = 0;
  for (let right = 0; right < s2.length; right++) {
    if (map.has(s2[right])) {
      while (map.get(s2[right])! <= 0) {
        map.set(s2[left], map.get(s2[left])! + 1);
        left++;
      }
      map.set(s2[right], map.get(s2[right])! - 1);
    } else {
      while (left < right) {
        map.set(s2[left], map.get(s2[left])! + 1);
        left++;
      }
      left++;
    }

    if (right - left + 1 === s1.length) return true;
  }

  return false;
}
