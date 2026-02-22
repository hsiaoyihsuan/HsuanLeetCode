// 778. Swim in Rising Water
//
// Method: Dijkstra's Algorithm (Min Heap) on Grid
//
// Idea:
// 1. Each cell is a node, and moving to a neighbor has "cost" = grid[r][c]
// 2. We want to minimize the maximum height encountered along the path
// 3. Use a min heap to always explore the lowest elevation cell first
// 4. The answer is NOT the sum of weights, but the maximum height
//    seen along the chosen path
//
// Key Insight:
// This problem is equivalent to finding a path from (0,0) to (n-1,n-1)
// that minimizes the maximum elevation on the path (minimax path).
//
// Time: O(n^2 log n)
//   - n^2 cells, each pushed into heap once
// Space: O(n^2) for visited + heap
import {PriorityQueue} from "@datastructures-js/priority-queue";
function swimInWater(grid: number[][]): number {
  const n = grid.length;
  const minHeap = new PriorityQueue<number[]>((a, b) => a[0] - b[0]);
  const visited = Array.from({length: n}, () => Array(n).fill(false));

  visited[0][0] = true;
  minHeap.enqueue([grid[0][0], 0, 0]);

  let result = grid[0][0];
  while (!minHeap.isEmpty()) {
    const [w, r, c] = minHeap.dequeue()!;
    result = Math.max(result, w);

    if (r === n - 1 && c === n - 1) {
      break;
    }

    for (const [dr, dc] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const R = r + dr;
      const C = c + dc;
      if (R < 0 || C < 0 || R >= n || C >= n || visited[R][C]) {
        continue;
      }

      minHeap.enqueue([grid[R][C], R, C]);
      visited[R][C] = true;
    }
  }
  return result;
}
