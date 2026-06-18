// 347. Top K Frequent Elements

import {PriorityQueue} from "@datastructures-js/priority-queue";

// Method 1: Frequency Map + Sorting
// Idea:
// - Count each number with a frequency map
// - Sort numbers by frequency in descending order
// - Return the first k numbers
// Time: O(n log n)
// Space: O(n)
function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  nums.forEach((num) => freq.set(num, (freq.get(num) ?? 0) + 1));

  return Array.from(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map((e) => e[0]);
}

// Method 2: Frequency Map + Min Heap
// Idea:
// - Count each number with a frequency map
// - Keep a min heap of size k by frequency
// - Remove the smallest frequency whenever heap size is greater than k
// - The heap keeps the k most frequent numbers
// Time: O(n log k)
// Space: O(n + k)
function topKFrequent2(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  nums.forEach((num) => freq.set(num, (freq.get(num) ?? 0) + 1));

  const minHeap = new PriorityQueue<[number, number]>((a, b) => a[1] - b[1]);
  for (const [num, count] of freq) {
    minHeap.enqueue([num, count]);

    if (minHeap.size() > k) {
      minHeap.dequeue();
    }
  }

  const result: number[] = [];
  for (let i = 0; i < k; i++) {
    const [num, _count] = minHeap.dequeue()!;
    result.push(num);
  }
  return result;
}

// Method 3: Frequency Map + Bucket Sort
// Idea:
// - Count each number with a frequency map
// - Put each number into the bucket matching its frequency
// - Traverse buckets from high frequency to low frequency
// Time: O(n)
// Space: O(n)
function topKFrequent3(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  nums.forEach((num) => freq.set(num, (freq.get(num) ?? 0) + 1));

  // bucket index means frequency
  const buckets: number[][] = Array.from({length: nums.length + 1}, () => []);

  for (const [num, count] of freq) {
    buckets[count].push(num);
  }

  const result: number[] = [];
  for (let i = buckets.length - 1; i >= 0; i--) {
    result.push(...buckets[i]);

    if (result.length >= k) break;
  }

  return result;
}
// buckets = [
//   [], // 0 (no elements with 0 frequency)
//   [3], // 1 (3 appears once)
//   [2], // 2 (2 appears twice)
//   [1], // 3 (1 appears three times)
//   [], // 4
//   [], // 5
//   [],
// ];
