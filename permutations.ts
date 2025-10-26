// 46. Permutations
// Backtracking
// Time: O(n^2 x n!), Space output: O(n x n!)
function permute(nums: number[]): number[][] {
  function helper(i: number): number[][] {
    if (i >= nums.length) {
      return [[]];
    }

    const perms = helper(i + 1);
    const result: number[][] = [];

    for (const perm of perms) {
      for (let j = 0; j <= perm.length; j++) {
        const copy = [...perm];
        copy.splice(j, 0, nums[i]);
        result.push(copy);
      }
    }

    return result;
  }

  return helper(0);
}
