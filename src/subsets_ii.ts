// 90. Subsets II
// Backtracking
// Time: O(n x 2^n), Space: O(n)
function subsetsWithDup(nums: number[]): number[][] {
  const result: number[][] = [];
  const subset: number[] = [];

  nums.sort((a, b) => a - b);

  function dfs(i: number) {
    if (i >= nums.length) {
      result.push([...subset]);
      return;
    }

    subset.push(nums[i]);
    dfs(i + 1);
    subset.pop();

    while (i + 1 < nums.length && nums[i + 1] === nums[i]) {
      i++;
    }

    dfs(i + 1);
  }

  dfs(0);
  return result;
}
