// 323. Number of Connected Components in an Undirected Graph
// DFS (Depth-First Search)
// Time: O(V + E) — visit each node and edge once
// Space: O(V + E) — recursion stack + adjacency list
function countComponents(n: number, edges: number[][]) {
  const graph = new Map<number, number[]>(
    Array.from({length: n}, (_, i) => [i, []])
  );
  for (const [a, b] of edges) {
    graph.get(a)!.push(b);
    graph.get(b)!.push(a);
  }

  const visited = new Set();

  function dfs(node: number) {
    if (visited.has(node)) return;

    visited.add(node);
    for (const neighbor of graph.get(node) ?? []) {
      dfs(neighbor);
    }
  }

  let total = 0;
  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      dfs(i);
      total++;
    }
  }

  return total;
}

// Union-Find (Disjoint Set Union)
// Time: O(V + E · α(V))
//   - O(V) to initialize parent and rank arrays
//   - O(E · α(V)) for union/find operations with path compression
// Space: O(V) for parent and rank storage
function countComponentsByUnionFind(n: number, edges: number[][]) {
  const pair = new Map();
  const rank = new Map();
  for (let i = 0; i < n; i++) {
    pair.set(i, i);
    rank.set(i, 0);
  }

  function find(node: number): number {
    while (node !== pair.get(node)!) {
      pair.set(node, pair.get(pair.get(node)!)!);
      node = pair.get(node)!;
    }

    return node;
  }

  function union(n1: number, n2: number) {
    const root1 = find(n1);
    const root2 = find(n2);
    if (root1 === root2) return false;

    if (rank.get(root1) > rank.get(root2)) {
      pair.set(root2, root1);
    } else if (rank.get(root2) > rank.get(root1)) {
      pair.set(root1, root2);
    } else {
      pair.set(root2, root1);
      rank.set(root1, rank.get(root1) + 1);
    }
    return true;
  }

  let result = n;
  for (const [u, v] of edges) {
    if (union(u, v)) {
      result--;
    }
  }
  return result;
}
