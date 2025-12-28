// 684. Redundant Connection
// Approach 1: Incremental DFS cycle detection
//
// Idea:
// - Build the graph edge by edge
// - After adding each edge (u, v), run DFS to check
//   whether a cycle is created
// - The first edge that introduces a cycle is the answer
//
// Time Complexity:
// - For each edge, DFS takes O(V + E)
// - Total: O(E × (V + E))
//
// Space Complexity:
// - Graph adjacency list: O(V + E)
// - DFS recursion + visited set: O(V)
function findRedundantConnection(edges: number[][]): number[] {
  // Initialize adjacency list for nodes [1..n]
  const graph = new Map<number, number[]>(
    Array.from({length: edges.length}, (_, i) => [i + 1, []])
  );

  // DFS to detect a cycle in an undirected graph
  function dfs(node: number, parent: number, visited: Set<number>): boolean {
    // If we revisit a node in the same DFS path, a cycle exists
    if (visited.has(node)) return true;

    visited.add(node);

    for (const neighbor of graph.get(node) ?? []) {
      // Skip the edge leading back to the parent
      if (neighbor === parent) continue;

      if (dfs(neighbor, node, visited)) return true;
    }

    return false;
  }

  // Add edges one by one and check for cycles
  for (const [u, v] of edges) {
    graph.get(u)!.push(v);
    graph.get(v)!.push(u);

    // Start DFS from one endpoint of the new edge
    if (dfs(u, 0, new Set())) {
      return [u, v];
    }
  }

  return [];
}

// Approach 2: Single DFS + cycle node extraction (more optimal)
//
// Idea:
// - Build the full graph first
// - Run one DFS to identify all nodes that belong to the cycle
// - Iterate edges from back to front and return the last edge
//   whose endpoints are both in the cycle
//
// Time Complexity:
// - Graph construction: O(E)
// - DFS traversal: O(V + E)
// - Reverse edge scan: O(E)
// - Total: O(V + E)
//
// Space Complexity:
// - Graph adjacency list: O(V + E)
// - DFS recursion stack: O(V)
// - Sets for visited & cycle nodes: O(V)
function findRedundantConnectionOptimalDFS(edges: number[][]): number[] {
  // Build full adjacency list
  const graph = new Map<number, number[]>(
    Array.from({length: edges.length}, (_, i) => [i + 1, []])
  );
  for (const [u, v] of edges) {
    graph.get(u)!.push(v);
    graph.get(v)!.push(u);
  }

  // Store nodes that are part of the cycle
  const cycleNodes = new Set<number>();

  // Marks the node where the cycle was first detected
  let cycleStartNode = -1;

  function dfs(node: number, parent: number, visited: Set<number>): boolean {
    // If a node is visited again in the same DFS path,
    // a cycle is found
    if (visited.has(node)) {
      cycleStartNode = node;
      return true;
    }

    visited.add(node);

    for (const neighbor of graph.get(node) ?? []) {
      if (neighbor === parent) continue;

      if (dfs(neighbor, node, visited)) {
        // While unwinding recursion, mark nodes belonging to the cycle
        if (cycleStartNode !== -1) cycleNodes.add(node);

        // Stop marking once we return to the cycle start node
        if (node === cycleStartNode) cycleStartNode = -1;

        return true;
      }
    }

    return false;
  }

  // Graph is connected per problem constraints
  dfs(1, 0, new Set());

  // Return the last edge in input order that connects two cycle nodes
  for (let i = edges.length - 1; i >= 0; i--) {
    const [u, v] = edges[i];
    if (cycleNodes.has(u) && cycleNodes.has(v)) {
      return [u, v];
    }
  }

  return [];
}

// Union-Find (Disjoint Set Union)
//
// Idea:
// - Start with each node in its own set
// - Iterate through edges
// - If two nodes already have the same root, adding this edge creates a cycle
// - That edge is the redundant one
//
// Time: O(V + E * α(V)) ≈ O(V + E)
// Space: O(V)
function findRedundantConnectionUnionFind(edges: number[][]): number[] {
  const parent = new Map<number, number>();
  const rank = new Map<number, number>();

  for (let i = 1; i <= edges.length; i++) {
    parent.set(i, i);
    rank.set(i, 0);
  }

  function find(x: number): number {
    while (x !== parent.get(x)!) {
      parent.set(x, parent.get(parent.get(x)!)!);
      x = parent.get(x)!;
    }
    return x;
  }

  function union(n1: number, n2: number): boolean {
    const root1 = find(n1);
    const root2 = find(n2);

    if (root1 === root2) return false;

    if (rank.get(root1)! > rank.get(root2)!) {
      parent.set(root2, root1);
    } else if (rank.get(root2)! > rank.get(root1)!) {
      parent.set(root1, root2);
    } else {
      parent.set(root2, root1);
      rank.set(root1, rank.get(root1)! + 1);
    }

    return true;
  }

  for (const [u, v] of edges) {
    if (!union(u, v)) {
      return [u, v]; // redundant edge found
    }
  }

  return [];
}
