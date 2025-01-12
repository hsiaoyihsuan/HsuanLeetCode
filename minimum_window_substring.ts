// 76. Minimum Window Substring
// Time: O(n + m). Space: O(k)
function minWindow(s: string, t: string): string {
  if (s.length < t.length) return "";

  const tMap = new Map<string, number>();
  for (const char of t) {
    tMap.set(char, (tMap.get(char) ?? 0) + 1);
  }

  const required = tMap.size; // Number of unique characters in `t` that need to be matched.
  let have = 0; // Counter to track how many characters are fully matched.
  let minLength = Infinity;
  let res: [number, number] = [-1, -1];
  let left = 0;
  const windowMap = new Map<string, number>();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    windowMap.set(char, (windowMap.get(char) ?? 0) + 1);

    if (tMap.has(char) && windowMap.get(char) === tMap.get(char)) {
      have++;
    }

    while (have === required) {
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        res = [left, right];
      }

      // Remove the leftmost character from the window.
      windowMap.set(s[left], windowMap.get(s[left])! - 1);
      if (tMap.has(s[left]) && windowMap.get(s[left])! < tMap.get(s[left])!) {
        have--;
      }
      left++;
    }
  }

  return minLength === Infinity ? "" : s.slice(res[0], res[1] + 1);
}
