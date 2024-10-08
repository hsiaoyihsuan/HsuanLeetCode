// 53. Maximum Subarray
// Version 1: Brute force solution
function maxSubArrayV1(nums: number[]): number {
  const sums: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      sums.push(nums.slice(i, j + 1).reduce((a, b) => a + b, 0));
    }
  }
  return Math.max(...sums);
}

// Version 2: Kadane's Algorithm
function maxSubArrayV2(nums: number[]): number {
  let currentMax = nums[0];
  let globalMax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(currentMax + nums[i], nums[i]);
    if (currentMax > globalMax) {
      globalMax = currentMax;
    }
  }
  return globalMax;
}
