// 153. Find Minimum in Rotated Sorted Array
// O(log n)
// Version 1
function findMinV1(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // minimum is in the left half (including mid)
    if (nums[mid] < nums[right]) {
      right = mid;
    } else {
      // minimum is in the right half
      left = mid + 1;
    }
  }
  return nums[right];
}

// Version 2
function findMinV2(nums: number[]): number {
  if (nums.length === 1) return nums[0];

  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < nums[right]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return nums[left];
}
