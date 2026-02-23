// 269. Alien Dictionary
//
// Method: Topological Sort (DFS + Cycle Detection)
//
// Idea:
// 1. Compare adjacent words to infer ordering rules (edges)
//    - First different character determines precedence: u -> v
// 2. Handle invalid prefix case:
//    - If "abc" comes before "ab", ordering is impossible
// 3. Build directed graph using all unique characters
// 4. Use DFS with 3 states:
//    - visiting: current recursion stack (detect cycle)
//    - visited: already processed nodes
// 5. Postorder DFS gives topological order (reverse at the end)
//
// Time: O(C + E)
//   C = total characters in words
//   E = number of precedence edges
// Space: O(C + E)
function alienDictionary(words: string[]): string {
  // Step 1: Build precedence edges by comparing adjacent words
  const edges: [string, string][] = [];

  for (let i = 1; i < words.length; i++) {
    const w1 = words[i - 1];
    const w2 = words[i];

    // Invalid case:
    // If previous word is longer and starts with current word,
    // e.g. ["abc", "ab"] -> impossible lexicographical order
    if (w1.length > w2.length && w1.startsWith(w2)) {
      return "";
    }

    // Find the first different character to determine ordering
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        // w1[j] must come before w2[j]
        edges.push([w1[j], w2[j]]);
        break; // Only the first mismatch matters
      }
    }
  }

  // Step 2: Collect all unique characters (nodes in graph)
  const charSet = new Set<string>();
  for (const word of words) {
    for (const ch of word) {
      charSet.add(ch);
    }
  }
  const chars = [...charSet];

  // Step 3: Build adjacency list graph
  // graph[u] = list of characters that must come after u
  const graph = new Map<string, string[]>();
  for (const ch of chars) {
    graph.set(ch, []);
  }

  for (const [u, v] of edges) {
    graph.get(u)!.push(v);
  }

  // Step 4: DFS Topological Sort with cycle detection
  const result: string[] = [];
  const visiting = new Set<string>(); // recursion stack
  const visited = new Set<string>(); // fully processed nodes

  function dfs(char: string): boolean {
    // If already processed, no need to explore again
    if (visited.has(char)) return true;

    // If currently in recursion stack, we found a cycle
    if (visiting.has(char)) return false;

    // Mark as visiting (enter recursion)
    visiting.add(char);

    // Explore all neighbors (characters that depend on this char)
    for (const neighbor of graph.get(char)!) {
      if (!dfs(neighbor)) {
        return false; // cycle detected in deeper recursion
      }
    }

    // Mark as visited (exit recursion)
    visiting.delete(char);
    visited.add(char);

    // Postorder insertion:
    // add after exploring dependencies (topological order)
    result.push(char);
    return true;
  }

  // Step 5: Run DFS for all characters (handle disconnected graph)
  for (const ch of chars) {
    if (!dfs(ch)) {
      // Cycle detected -> invalid alien dictionary
      return "";
    }
  }

  // Reverse because we built result in postorder
  return result.reverse().join("");
}
