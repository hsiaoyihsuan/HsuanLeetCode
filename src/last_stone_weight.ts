// 1046. Last Stone Weight
// MaxHeap
// Time: O(n log n), Space: O(n)

import {MaxPriorityQueue} from "@datastructures-js/priority-queue";
function lastStoneWeight(stones: number[]): number {
  const heap = new MaxPriorityQueue<number>();
  for (const stone of stones) {
    heap.enqueue(stone);
  }

  while (heap.size() > 1) {
    const y = heap.dequeue()!;
    const x = heap.dequeue()!;
    if (x !== y) {
      heap.enqueue(y - x);
    }
  }

  return heap.size() === 0 ? 0 : heap.front()!;
}

// Sorting
// Time: O(n^2 x log n)
// Space: O(n) or O(1) depending on the sorting algorithm.
