// 213. House Robber II

/**
 * Houses are arranged in a circle, so the first and last houses cannot both be robbed.
 * Strategy:
 * Break the circular problem into two linear problems:
 * 1. Rob houses from index 0 to n-2
 * 2. Rob houses from index 1 to n-1
 * Take the maximum of the two results.
 * Time: O(N), Space: O(1)
 */
function rob(nums: number[]): number {
  function robLinear(nums: number[]): number {
    let rob1 = 0;
    let rob2 = 0;

    for (const num of nums) {
      const current = Math.max(rob1 + num, rob2);
      rob1 = rob2;
      rob2 = current;
    }

    return rob2;
  }

  return Math.max(
    robLinear([nums[0]]), // only first house (handles small arrays)
    robLinear(nums.slice(1)), // exclude first
    robLinear(nums.slice(0, -1)), // exclude last
  );
}
