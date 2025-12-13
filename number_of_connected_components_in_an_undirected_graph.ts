// 323. Number of Connected Components in an Undirected Graph
// DFS. Time: O(V + E), Space: O(V + E)
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

// Unioin Find
// Time: O(V+(E∗α(V))), Space: O(V)
function countComponentsByUnionFind(n: number, edges: number[][]) {
  const pair = new Map();
  const rank = new Map();
  for (let i = 0; i < n; i++) {
    pair.set(i, i);
    rank.set(i, 0);
  }

  function find(node: number): number {
    const parent = pair.get(node);

    if (parent !== node) {
      const root = find(parent);
      pair.set(node, root);
      return root;
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
