// 1584. Min Cost to Connect All Points

// Method: Prim's Algorithm (Minimum Spanning Tree) + Min Heap
//
// Idea:
// 1. Treat each point as a node in a complete graph
// 2. Edge weight = Manhattan distance between two points
// 3. Start from any node (here: point 0)
// 4. Always pick the minimum cost edge that connects
//    a visited node to an unvisited node (greedy)
// 5. Repeat until all points are included in the MST
//
// This avoids building all O(n^2) edges explicitly.
// Instead, we dynamically compute distances when needed.
//
// Time: O(n^2 log n)
//   - For each point added, we may push up to n edges into heap
// Space: O(n^2) in worst case due to heap growth

import {PriorityQueue} from "@datastructures-js/priority-queue";

function minCostConnectPoints(points: number[][]): number {
  // Track which points are already included in MST
  const visited = new Set<number>();

  // Start from point 0 (arbitrary choice)
  visited.add(0);

  // Min Heap: [distance, target point index]
  // Always pick the smallest edge that connects to an unvisited point
  const minHeap = new PriorityQueue<[number, number]>((a, b) => a[0] - b[0]);

  // Initialize heap with edges from point 0 to all other points
  // (Equivalent to adding all neighbors of the starting node)
  for (let i = 1; i < points.length; i++) {
    const dist =
      Math.abs(points[0][0] - points[i][0]) +
      Math.abs(points[0][1] - points[i][1]);

    minHeap.enqueue([dist, i]);
  }

  // Total cost of the Minimum Spanning Tree
  let result = 0;

  // Continue until we connect all points (MST has n nodes)
  while (!minHeap.isEmpty() && visited.size !== points.length) {
    const [w1, node] = minHeap.dequeue()!;

    // If this node is already in MST, skip (lazy deletion)
    // This happens because we may push multiple edges to same node
    if (visited.has(node)) continue;

    // Add this node to MST
    visited.add(node);

    // Add the chosen edge weight to total cost
    result += w1;

    // From the newly added node, try to connect to all remaining unvisited nodes
    // (Expand the frontier of the MST)
    for (let i = 0; i < points.length; i++) {
      if (!visited.has(i)) {
        const dist =
          Math.abs(points[node][0] - points[i][0]) +
          Math.abs(points[node][1] - points[i][1]);

        // Push new candidate edges into the heap
        minHeap.enqueue([dist, i]);
      }
    }
  }

  return result;
}
