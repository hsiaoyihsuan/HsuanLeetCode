// 211. Design Add and Search Words Data Structure
// Solving Notes:
// - Use a Trie (prefix tree) for storing words.
// - For search, support '.' as a wildcard character using DFS traversal.

class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEnd: boolean = false;
}

class WordDictionary {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  addWord(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEnd = true;
  }

  search(word: string): boolean {
    function dfs(index: number, node: TrieNode): boolean {
      if (index === word.length) return node.isEnd;

      const char = word[index];
      if (char === ".") {
        for (const child of node.children.values()) {
          if (dfs(index + 1, child)) return true;
        }
        return false;
      }

      const nextNode = node.children.get(char)!;
      return nextNode ? dfs(index + 1, nextNode) : false;
    }

    return dfs(0, this.root);
  }
}
