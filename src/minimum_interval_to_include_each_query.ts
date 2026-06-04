// 1851. Minimum Interval to Include Each Query
//
// Method: Sweep Line + Min Heap
// Idea:
// - Sort intervals by start and queries by value
// - Add intervals whose start is less than or equal to the current query
// - Remove intervals whose end is smaller than the current query
// - The heap top is the smallest valid interval for that query
// Time: O((n + m) log n)
// - n intervals, m queries
// Space: O(n + m)
import {MinPriorityQueue} from "@datastructures-js/priority-queue";
function minInterval(intervals: number[][], queries: number[]): number[] {
  intervals.sort((a, b) => a[0] - b[0]);
  const sortedQueries = [...queries].sort((a, b) => a - b);
  const queryMap = new Map<number, number>();
  const minHeap = new MinPriorityQueue<number[]>((a) => a[0]); // [size, end]

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
