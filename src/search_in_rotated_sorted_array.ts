// 33. Search in Rotated Sorted Array
// Time: O(log n), Space: O(1)
// Binary Search
function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    if (nums[mid] < nums[right]) {
      // Right side is sorted
      // ex: [6, 7, 1, 2, 3, 4, 5]
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else {
      // Left side is sorted
      // ex: [3, 4, 5, 6, 7, 1, 2]
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }

  return -1;
}
