// 127. Word Ladder
// BFS
// Time: O(N x M^2) (Build graph) + O(N^2 x M) (BFS)
// Space: O(N x M^2)
// N = number of words
// M = word length
function ladderLength(
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  if (!wordList.includes(endWord)) return 0;

  // 1. build the graph
  const patternMap = new Map<string, string[]>();
  const allWords = [...wordList, beginWord];
  const wordLength = beginWord.length;

  for (const word of allWords) {
    for (let i = 0; i < wordLength; i++) {
      const pattern = word.slice(0, i) + "*" + word.slice(i + 1);
      if (!patternMap.has(pattern)) patternMap.set(pattern, []);
      patternMap.get(pattern)!.push(word);
    }
  }

  // 2. DFS
  const visited = new Set<string>();
  const queue = [beginWord];
  let result = 1;

  while (queue.length > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      if (node === endWord) return result;

      for (let j = 0; j < wordLength; j++) {
        const pattern = node.slice(0, j) + "*" + node.slice(j + 1);
        for (const neighbor of patternMap.get(pattern) ?? []) {
          if (visited.has(neighbor)) continue;

          queue.push(neighbor);
          visited.add(neighbor);
        }
      }
    }
    result++;
  }

  return 0;
}
