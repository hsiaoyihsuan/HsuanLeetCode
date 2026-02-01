// 49. Group Anagrams
// Time: O(M * N log N), where N is the maximum length of a string and M is the number of strings
// Space: O(M * N)
function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  strs.forEach((str) => {
    const sortedStr = [...str].sort().join("");
    if (map.has(sortedStr)) {
      map.get(sortedStr)!.push(str);
    } else {
      map.set(sortedStr, [str]);
    }
  });
  return [...map.values()];
}

// Time: O(M * N), where N is the maximum length of a string and M is the number of strings
// Space: O(M * N)
function groupAnagrams2(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const str of strs) {
    const count = new Array(26).fill(0);
    for (const c of str) {
      count[c.charCodeAt(0) - "a".charCodeAt(0)] += 1;
    }
    const key = count.join(",");
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(str);
  }
  console.log(map);
  return Array.from(map.values());
}
