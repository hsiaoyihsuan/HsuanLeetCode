// 133. Clone Graph
/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     neighbors: _Node[]
 *
 *     constructor(val?: number, neighbors?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 *
 */

// DFS version. Time: O(N). Space: O(N). N = V + E
function cloneGraphDFS(node: _Node | null): _Node | null {
  if (!node) return null;

  const oldToNew = new Map<_Node, _Node>();

  function dfs(node: _Node): _Node {
    if (oldToNew.has(node)) return oldToNew.get(node);

    const newNode = new _Node(node.val);
    oldToNew.set(node, newNode);

    for (const neighbor of node.neighbors) {
      newNode.neighbors.push(dfs(neighbor));
    }

    return newNode;
  }

  const newGraph = dfs(node);
  return newGraph;
}

// BFS version.
function cloneGraphBFS(node: _Node | null): _Node | null {
  if (!node) return null;

  const oldToNew = new Map<_Node, _Node>();
  const queue: _Node[] = [node];
  oldToNew.set(node, new _Node(node.val));

  while (queue.length > 0) {
    const node = queue.shift();
    const newNode = oldToNew.get(node);

    for (const neighbor of node.neighbors) {
      if (!oldToNew.has(neighbor)) {
        queue.push(neighbor);
        oldToNew.set(neighbor, new _Node(neighbor.val));
      }

      newNode.neighbors.push(oldToNew.get(neighbor));
    }
  }

  return oldToNew.get(node);
}
