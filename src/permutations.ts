// 46. Permutations
// Method: Recursive Insertion
//
// Idea:
// - Recursively get all permutations of the suffix
// - Insert the current number into every possible position of each suffix permutation
// - Build results bottom-up until all numbers are included
//
// Time: O(n^2 x n!)
// - there are n! permutations
// - each permutation has up to n insertion positions
// - copying and splicing each candidate costs O(n)
//
// Space: O(n x n!)
// - output stores n! permutations of length n
// - recursive intermediate results also store generated permutations
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

// Method: DFS Backtracking
//
// Idea:
// - Build one permutation from left to right
// - Use visited to avoid reusing the same index in one permutation
// - When the path length reaches nums.length, save a copy of the path
// - Backtrack by removing the last number and marking it unused
//
// Time: O(n x n!)
// - there are n! permutations
// - copying each completed permutation costs O(n)
//
// Space: O(n x n!)
// - output stores n! permutations of length n
// - visited, current path, and recursion stack cost O(n)
function permute2(nums: number[]): number[][] {
  const result: number[][] = [];

  // DFS builds one permutation at a time while `visited` marks which indices
  // are already in the current path.
  function dfs(perm: number[], visited: boolean[]) {
    if (perm.length >= nums.length) {
      result.push([...perm]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (visited[i] === true) continue;

      // Choose nums[i], explore all completions with it fixed here, then undo.
      perm.push(nums[i]);
      visited[i] = true;
      dfs(perm, visited);
      perm.pop();
      visited[i] = false;
    }
  }

  dfs([], new Array(nums.length).fill(false));

  return result;
}
