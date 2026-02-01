// 212. Word Search II
class TrieNode {
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
