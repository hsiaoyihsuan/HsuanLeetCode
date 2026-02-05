// 268. Missing Number

// Sum Formula
// Time: O(n), Space: O(1)
function missingNumber(nums: number[]): number {
  const n = nums.length;
  const sum = nums.reduce((a, b) => a + b, 0);
  const expect = ((1 + n) * n) / 2;
  return expect - sum;
}

// XOR
// Time: O(n), Space: O(1)
function missingNumber2(nums: number[]): number {
  const n = nums.length;
  let result = 0;
  for (let i = 0; i <= n; i++) {
    result ^= nums[i] ^ i;
  }
  return result;
}
