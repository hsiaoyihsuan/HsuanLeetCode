// 212. Word Search II
export class TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;

  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  addWord(word: string) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEnd = true;
  }
}

// Method: Trie + DFS Backtracking
//
// Idea:
// - Build a Trie from words so DFS can stop early when a prefix does not exist
// - Start DFS from every board cell
// - Track visited cells to avoid reusing the same cell in one word path
// - Add a word to the result when the current Trie node marks the end of a word
//
// Time: O(m * n * 4 * 3^(t - 1) + s)
// - m is the number of rows
// - n is the number of columns
// - t is the maximum length of any word in words
// - s is the sum of all word lengths
// - O(s) builds the Trie
// - Each DFS starts with up to 4 directions, then up to 3 directions after that
//
// Space: O(s + m * n + t)
// - O(s) for the Trie that stores all words
// - O(m * n) for the visited matrix in this implementation
// - O(t) for DFS recursion depth
// - If board cells are marked in-place instead of using visited, this becomes O(s + t)
function findWords(board: string[][], words: string[]): string[] {
  const m = board.length;
  const n = board[0].length;
  const trie = new Trie();
  for (const word of words) {
    trie.addWord(word);
  }

  const result = new Set<string>();
  const visited = Array.from({length: m}, () => Array(n).fill(false));

  function dfs(r: number, c: number, node: TrieNode, word: string) {
    if (
      r < 0 ||
      c < 0 ||
      r >= m ||
      c >= n ||
      visited[r][c] ||
      !node.children.has(board[r][c])
    ) {
      return;
    }

    word += board[r][c];
    visited[r][c] = true;
    const newNode = node.children.get(board[r][c])!;
    if (newNode.isEnd) result.add(word);

    dfs(r + 1, c, newNode, word);
    dfs(r - 1, c, newNode, word);
    dfs(r, c + 1, newNode, word);
    dfs(r, c - 1, newNode, word);

    visited[r][c] = false;
  }

  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      dfs(row, col, trie.root, "");
    }
  }

  return Array.from(result);
}
