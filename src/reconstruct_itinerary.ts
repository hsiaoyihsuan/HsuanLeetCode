// 332. Reconstruct Itinerary

// Method: Backtracking + Lexicographical Order
//
// Idea:
// 1. Sort tickets first so destinations are tried in lexical order
// 2. Build adjacency list graph: u -> list of v (sorted)
// 3. Use DFS + backtracking to try each unused ticket exactly once
// 4. When path length = tickets.length + 1, we used all tickets
// Time: O(V*E)
// Space: O(V*E)
function findItinerary(tickets: string[][]): string[] {
  const graph = new Map<string, string[]>();

  tickets.sort();

  for (const [u, v] of tickets) {
    if (!graph.has(u)) graph.set(u, []);
    graph.get(u)!.push(v);
  }

  function dfs(node: string, path: string[]): boolean {
    if (path.length === tickets.length + 1) return true;

    if (!graph.has(node)) return false;

    // Copy current adjacency list because we will mutate the original
    // during backtracking (removing used edges)
    const tmp = [...graph.get(node)!];

    // Try each possible next destination in lexical order
    for (let i = 0; i < tmp.length; i++) {
      graph.get(node)!.splice(i, 1);
      path.push(tmp[i]);

      if (dfs(tmp[i], path)) {
        return true;
      }

      graph.get(node)!.splice(i, 0, tmp[i]);
      path.pop();
    }

    return false;
  }

  const result = ["JFK"];
  dfs("JFK", result);

  return result;
}

// Method: Hierholzer's Algorithm (Eulerian Path) + Greedy (Lexicographical)
//
// Idea:
// 1. Each ticket is a directed edge that must be used exactly once
// 2. This is an Eulerian Path problem starting from "JFK"
// 3. Sort tickets in reverse lexical order so we can pop() the smallest
//    destination in O(1)
// 4. DFS: keep consuming edges until no outgoing edges left
// 5. Add node to result AFTER exploring all edges (postorder)
// 6. Reverse the result at the end to get the correct itinerary
//
// Time: O(E log E)  (sorting)
// Space: O(E)
function findItinerary2(tickets: string[][]): string[] {
  const graph = new Map<string, string[]>();

  // Sort in reverse lexical order.
  // So when we push into adjacency list and later pop(),
  // we always get the smallest lexical destination first.
  tickets.sort().reverse();

  // Build adjacency list: u -> list of destinations
  tickets.forEach(([u, v]) => {
    if (!graph.has(u)) graph.set(u, []);
    graph.get(u)!.push(v);
  });

  const result: string[] = [];

  function dfs(node: string): void {
    // Get all outgoing edges from current node
    const neighbors = graph.get(node);

    // Keep using edges until no edges left from this node
    // Each pop() represents "using" one ticket (edge)
    while (neighbors && neighbors.length > 0) {
      const next = neighbors.pop()!; // smallest lexical destination
      dfs(next);
    }

    // Postorder insertion:
    // When all outgoing edges are used, we finalize this node
    // This builds the Eulerian path in reverse order
    result.push(node);
  }

  // Start from the required starting airport
  dfs("JFK");

  // Reverse because nodes are added after exhausting edges (reverse path)
  return result.reverse();
}
