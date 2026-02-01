// 1851. Minimum Interval to Include Each Query
// Sweep Line + Min Heap
// Time: O((n + m) log n)
// Space: O(n + m)
import {MinPriorityQueue} from "@datastructures-js/priority-queue";
function minInterval(intervals: number[][], queries: number[]): number[] {
  intervals.sort((a, b) => a[0] - b[0]);
  const sortedQueries = [...queries].sort((a, b) => a - b);
  const queryMap = new Map<number, number>();
  const minHeap = new MinPriorityQueue<number[]>((a) => a[0]); // [intervalSize, intervalEnd]

  let i = 0;

  for (const q of sortedQueries) {
    while (i < intervals.length && intervals[i][0] <= q) {
      const [l, r] = intervals[i];
      minHeap.push([r - l + 1, r]);
      i++;
    }

    while (!minHeap.isEmpty() && minHeap.front()![1] < q) {
      minHeap.pop();
    }

    queryMap.set(q, minHeap.isEmpty() ? -1 : minHeap.front()![0]);
  }

  return queries.map((q) => queryMap.get(q)!);
}
