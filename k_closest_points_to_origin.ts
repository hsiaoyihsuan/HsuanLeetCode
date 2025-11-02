// 973. K Closest Points to Origin
// Sorting, Time: O(n x log n), Space: O(n) or O(1) depending on sort algorithm
function kClosest(points: number[][], k: number): number[][] {
  points.sort((a, b) => a[0] ** 2 + a[1] ** 2 - b[0] ** 2 - b[1] ** 2);
  return points.slice(0, k);
}

// Min Heap, Time: O(k x log n), Space: O(n)
import {MinPriorityQueue} from "@datastructures-js/priority-queue";
function kClosest2(points: number[][], k: number): number[][] {
  const distArr: [number, number[]][] = [];
  for (const point of points) {
    const dist = point[0] ** 2 + point[1] ** 2;
    distArr.push([dist, point]);
  }

  const heap = MinPriorityQueue.fromArray(distArr, (dist) => dist[0]);

  const result: number[][] = [];
  for (let i = 0; i < k; i++) {
    const [_, point] = heap.dequeue()!;
    result.push(point);
  }
  return result;
}
