// 207. Course Schedule
// Time: O(V+E). Space: O(V+E)
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph = new Map<number, number[]>();

  for (let i = 0; i < numCourses; i++) {
    graph.set(i, []);
  }

  prerequisites.forEach(([a, b]) => graph.get(a)!.push(b));

  const visited = new Set<number>();
  const visiting = new Set<number>();

  function canFinish(course: number): boolean {
    if (visiting.has(course)) {
      return false;
    }

    if (visited.has(course)) {
      return true;
    }

    visiting.add(course);

    for (const neighbor of graph.get(course) ?? []) {
      if (!canFinish(neighbor)) {
        return false;
      }
    }

    visited.add(course);
    visiting.delete(course);

    return true;
  }

  for (let i = 0; i < numCourses; i++) {
    if (!canFinish(i)) {
      return false;
    }
  }

  return true;
}
