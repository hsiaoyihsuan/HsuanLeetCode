// 136. Single Number
// Method: XOR (Bit Manipulation)
// Time: O(n), Space: O(1)
function singleNumber(nums: number[]): number {
  let result = 0;
  nums.forEach((num) => (result ^= num));
  return result;
}
