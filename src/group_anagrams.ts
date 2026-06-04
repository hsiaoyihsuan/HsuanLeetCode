// 49. Group Anagrams

// Method 1: Sorted String Key
// Idea:
// - Sort each string to create the same key for anagrams
// - Group strings by that sorted key
// Time: O(m * n log n)
// - m is the number of strings, n is the maximum string length
// Space: O(m * n)
// - store grouped strings and map keys
function groupAnagrams(strs: string[]): string[][] {
  const sortMap = new Map<string, string[]>();

  for (const str of strs) {
    const sorted = [...str].sort().join("");

    if (!sortMap.has(sorted)) {
      sortMap.set(sorted, []);
    }

    sortMap.get(sorted)!.push(str);
  }

  return Array.from(sortMap.values());
}
// Method 2: Character Count Key
// Idea:
// - Count letters for each string
// - Use the 26-letter count as the anagram key
// - Group strings by the count key
// Time: O(m * n)
// - m is the number of strings, n is the maximum string length
// Space: O(m * n)
// - store grouped strings and map keys
function groupAnagrams2(strs: string[]): string[][] {
  const countMap = new Map<string, string[]>();

  for (const str of strs) {
    const count = new Array(26).fill(0);

    for (const char of str) {
      const i = char.charCodeAt(0) - "a".charCodeAt(0);
      count[i]++;
    }

    const key = count.join("#");

    if (!countMap.has(key)) {
      countMap.set(key, []);
    }
    countMap.get(key)!.push(str);
  }

  return Array.from(countMap.values());
}
