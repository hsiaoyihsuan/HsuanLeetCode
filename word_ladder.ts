// 127. Word Ladder
//
// Approach: BFS + Pattern Mapping
//
// Idea:
// - Each word is a node
// - Two words are connected if they differ by exactly one character
// - We want the shortest transformation sequence → use BFS
//
// Optimization:
// - Preprocess words into patterns using '*' (e.g. "hot" → "*ot", "h*t", "ho*")
// - Words sharing the same pattern differ by only one letter
// - This avoids O(N^2) pairwise comparisons
//
// Time Complexity:
// - Building pattern map: O(N × L)
// - BFS traversal: O(N × L)
//   (Each word is visited once, and for each we generate L patterns)
// - Total: O(N × L)
//
// Space Complexity:
// - Pattern map stores up to N × L entries
// - Queue + visited set store up to N words
// - Total: O(N × L)
//
// N = number of words, L = word length

function ladderLength(
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  // If endWord is not present, no valid transformation exists
  if (!wordList.includes(endWord)) return 0;

  const patternMap = new Map<string, string[]>();
  const wordLength = beginWord.length;

  // Include beginWord so it participates in pattern mapping
  const allWords = [beginWord, ...wordList];

  // Build pattern → words adjacency mapping
  for (const word of allWords) {
    for (let i = 0; i < wordLength; i++) {
      const pattern = word.slice(0, i) + "*" + word.slice(i + 1);
      if (!patternMap.has(pattern)) patternMap.set(pattern, []);
      patternMap.get(pattern)!.push(word);
    }
  }

  // BFS queue stores [currentWord, transformationLength]
  const queue: [string, number][] = [[beginWord, 1]];
  const visited = new Set<string>([beginWord]);

  while (queue.length > 0) {
    const [word, level] = queue.shift()!;

    // Reached target word → shortest path found
    if (word === endWord) {
      return level;
    }

    // Try all possible one-letter transformations
    for (let j = 0; j < wordLength; j++) {
      const pattern = word.slice(0, j) + "*" + word.slice(j + 1);

      for (const neighbor of patternMap.get(pattern) ?? []) {
        if (visited.has(neighbor)) continue;

        visited.add(neighbor);
        queue.push([neighbor, level + 1]);
      }
    }
  }

  // No valid transformation sequence
  return 0;
}
