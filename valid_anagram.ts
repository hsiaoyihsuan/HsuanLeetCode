// 242. Valid Anagram
// Two possible approaches: sorting or using a hash table.
// Sorting has a time complexity of O(n log n), which is less efficient.
// A hash table offers a better approach with O(n) time complexity, making it faster for this problem.

// Version 1
function isAnagramV1(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const map = new Map<string, number>();

  for (const char of t) {
    if (!map.has(char)) {
      map.set(char, 1);
    } else {
      const number = map.get(char);
      map.set(char, number + 1);
    }
  }

  for (const char of s) {
    if (!map.has(char)) return false;

    let number = map.get(char);
    number--;

    if (number === 0) {
      map.delete(char);
    } else {
      map.set(char, number);
    }
  }
  return true;
}

// Version 2
function isAnagramV2(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const map = new Map<string, number>();

  for (const char of t) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (const char of s) {
    if (!map.has(char)) return false;

    map.set(char, map.get(char)! - 1);
    if (map.get(char)! < 0) return false;
  }
  return true;
}
