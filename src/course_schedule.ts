// 207. Course Schedule
// Time: O(V+E). Space: O(V+E)
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph = new Map<number, number[]>();
  for (const [a, b] of prerequisites) {
    if (!graph.has(a)) graph.set(a, []);
    graph.get(a)!.push(b);
  }

  function hasCycle(
    graph: Map<number, number[]>,
    start: number,
    visited: Set<number>
  ): boolean {
    if (visited.has(start)) return true;

    visited.add(start);
    for (const neighbor of graph.get(start) ?? []) {
      if (hasCycle(graph, neighbor, visited)) return true;
    }

    visited.delete(start);
    graph.delete(start);
    return false;
  }

  for (const key of graph.keys()) {
    if (hasCycle(graph, key, new Set<number>())) return false;
  }

  return true;
}

const numCourses = 5;
const prerequisites = [
  [1, 4],
  [2, 4],
  [3, 1],
  [3, 2],
];

console.log(canFinish(numCourses, prerequisites));
