// 743. Network Delay Time

// Dijkstra's Algorithm
// Time Complexity: O(E log V)
//   - Each edge may push into heap once
//   - Heap operations cost log V
//
// Space Complexity: O(V + E)
//   - Graph adjacency list + heap + distance map

import {PriorityQueue} from "@datastructures-js/priority-queue";

function networkDelayTime(times: number[][], n: number, k: number): number {
  const graph = new Map<number, number[][]>();
  for (let i = 0; i < n; i++) {
    graph.set(i + 1, []);
  }

  for (const [u, v, w] of times) {
    graph.get(u)!.push([v, w]);
  }

  const minHeap = new PriorityQueue<number[]>((a, b) => a[0] - b[0]);
  minHeap.enqueue([0, k]); // [time, node]

  const shortest = new Map<number, number>();

  while (!minHeap.isEmpty()) {
    const [w1, n1] = minHeap.dequeue()!;

    if (shortest.has(n1)) continue;

    shortest.set(n1, w1);

    for (const [n2, w2] of graph.get(n1) || []) {
      if (!shortest.has(n2)) {
        minHeap.enqueue([w1 + w2, n2]);
      }
    }
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    const n = i + 1;
    if (!shortest.has(n)) return -1;

    result = Math.max(result, shortest.get(n)!);
  }

  return result;
}
