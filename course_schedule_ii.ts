// 210. Course Schedule II
// Topological Sort with DFS
// Time: O(V + E), Space: O(V + E)
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  // Build the graph
  const graph = new Map<number, number[]>();
  for (let i = 0; i < numCourses; i++) {
    graph.set(i, []);
  }
  for (const [a, b] of prerequisites) {
    graph.get(b)!.push(a);
  }

  const result: number[] = [];
  const visiting = new Set<number>();
  const visited = new Set<number>();

  //  Implement dfs
  function dfs(node: number): boolean {
    if (visiting.has(node)) return false;
    if (visited.has(node)) return true;

    visiting.add(node);

    for (const neighbor of graph.get(node)!) {
      const valid = dfs(neighbor);
      if (!valid) return false;
    }

    visiting.delete(node);
    visited.add(node);
    result.push(node);
    return true;
  }

  // Loop all courses with DFS
  for (let i = 0; i < numCourses; i++) {
    const valid = dfs(i);
    if (!valid) return [];
  }

  // Return reversed result array
  return result.reverse();
}
