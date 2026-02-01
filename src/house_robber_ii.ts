// 213. House Robber II
// Time: O(N), Space: O(1)
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
    robLinear([nums[0]]),
    robLinear(nums.slice(1)),
    robLinear(nums.slice(0, -1))
  );
}
