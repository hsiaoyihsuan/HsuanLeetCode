// 53. Maximum Subarray
// Kadane's Algorithm
// Time: O(n), Space: O(1)
function maxSubArrayV2(nums: number[]): number {
  let curMax = nums[0];
  let result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curMax = Math.max(curMax + nums[i], nums[i]);
    result = Math.max(result, curMax);
  }
  return result;
}
