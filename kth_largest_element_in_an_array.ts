// 215. Kth Largest Element in an Array

// Sorting
// Time: O(n log n), Space: O(n)
function findKthLargest1(nums: number[], k: number): number {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}

// Max-Heap approach
// Time: O(k log n), Space: O(n)
import {MaxPriorityQueue} from "@datastructures-js/priority-queue";
function findKthLargest2(nums: number[], k: number): number {
  const heap = MaxPriorityQueue.fromArray(nums);
  let result = 0;

  for (let i = 0; i < k; i++) {
    result = heap.dequeue()!;
  }

  return result;
}

// Quick select (optimal)
// Average Time: O(n), Worst: O(n^2), Space: O(1)
function findKthLargest3(nums: number[], k: number): number {
  k = nums.length - k;

  function quickSelect(l: number, r: number): number {
    let pivot = nums[r];
    let p = l;

    for (let i = l; i < r; i++) {
      if (nums[i] <= pivot) {
        [nums[i], nums[p]] = [nums[p], nums[i]];
        p++;
      }
    }
    [nums[p], nums[r]] = [nums[r], nums[p]];

    if (p > k) {
      return quickSelect(l, p - 1);
    } else if (p < k) {
      return quickSelect(p + 1, r);
    } else {
      return nums[p];
    }
  }

  return quickSelect(0, nums.length - 1);
}
