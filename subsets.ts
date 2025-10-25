// 78. Subsets
// Backtracking, Subsets
// Time: O(n x 2^n), Space: O(n)
function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const subset: number[] = [];

  function helper(i: number) {
    if (i >= nums.length) {
      result.push([...subset]);
      return;
    }

    subset.push(nums[i]);
    helper(i + 1);
    subset.pop();

    helper(i + 1);
  }

  helper(0);
  return result;
}
