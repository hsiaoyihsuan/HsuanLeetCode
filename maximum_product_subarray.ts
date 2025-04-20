// 152. Maximum Product Subarray
// Time: O(n). Space: O(1).
// Dynamic programming. Record the maximum and minimum product at each index.
function maxProduct(nums: number[]): number {
  let result = nums[0];
  let curMax = nums[0];
  let curMin = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // This if statement is unnecessary but still works
    if (nums[i - 1] === 0) {
      curMax = 1;
      curMin = 1;
    }

    // Becareful of the order of operations. We want to use the previous curMax and curMin
    const tempMax = Math.max(nums[i], curMax * nums[i], curMin * nums[i]);
    curMin = Math.min(nums[i], curMax * nums[i], curMin * nums[i]);
    curMax = tempMax;

    result = Math.max(result, curMax);
  }

  return result;
}
