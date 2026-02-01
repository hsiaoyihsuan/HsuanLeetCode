// 261. Graph Valid Tree
// You are given:
// - An integer `n` (number of nodes), labeled from 0 to n - 1.
// - An array `edges`, where each element is a pair [u, v] representing an undirected edge between nodes u and v.
// Return `true` if the graph is a valid tree, otherwise return `false`.

/**
 * A valid tree must satisfy two conditions:
 * 1. Exactly n - 1 edges (no cycles).
 * 2. All nodes must be connected (only one connected component).
 *
 * @example
 * Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
 * Output: true
 * Explanation: The graph is connected and has exactly 5 - 1 = 4 edges, so it is a tree.
 *
 * @example
 * Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
 * Output: false
 * Explanation: The graph has a cycle (1-2-3-1), so it's not a tree.
 *
 * @example
 * Input: n = 4, edges = [[0,1],[2,3]]
 * Output: false
 * Explanation: The graph is disconnected, so it’s not a tree.
 */
function validTree(n: number, edges: number[][]): boolean {
  if (edges.length !== n - 1) return false;

  // Build the undirected graph using an adjacency list
  const graph = new Map<number, number[]>(
    Array.from({length: n}, (_, i) => [i, []])
  );

  for (const [u, v] of edges) {
    graph.get(u)!.push(v);
    graph.get(v)!.push(u);
  }

  // DFS to detect cycles
  function hasCycle(
    node: number,
    visited: Set<number>,
    parent: number | null
  ): boolean {
    if (visited.has(node)) return true;

    visited.add(node);

    for (const neighbor of graph.get(node) ?? []) {
      if (neighbor === parent) continue;
      if (hasCycle(neighbor, visited, node)) return true;
    }

    return false;
  }

  const visited = new Set<number>();
  if (hasCycle(0, visited, null)) return false;

  // After DFS, if some nodes are not visited → disconnected
  return visited.size === n;
}

// ✅ Should return true (valid tree)
console.log(
  validTree(5, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
  ])
);

// ❌ Should return false (contains cycle)
console.log(
  validTree(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [1, 3],
    [1, 4],
  ])
);
