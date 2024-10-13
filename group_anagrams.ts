// 49. Group Anagrams
function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  strs.forEach((str) => {
    const sortedStr = [...str].sort().join("");
    if (map.has(sortedStr)) {
      map.get(sortedStr).push(str);
    } else {
      map.set(sortedStr, [str]);
    }
  });
  return [...map.values()];
}
