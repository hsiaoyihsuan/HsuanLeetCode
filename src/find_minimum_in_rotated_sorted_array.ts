// 153. Find Minimum in Rotated Sorted Array
//
// Method: Binary Search
// Idea:
// - Compare middle value with right value
// - If nums[m] > nums[r], the minimum is on the right side
// - Otherwise, the minimum is at m or on the left side
// Time: O(log n)
// Space: O(1)
function findMin(nums: number[]): number {
  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    if (nums[m] > nums[r]) {
      l = m + 1;
    } else {
      r = m;
    }
  }
  return nums[l];
}
