// 39. Combination Sum
// Method: DFS Backtracking
//
// Idea:
// - Use a decision tree for each candidate
// - Include the current candidate and stay at the same index so it can be reused
// - Skip the current candidate and move to the next index
// - Stop when the running sum reaches target or becomes too large
//
// Time: O(2^(n + t / m))
// - n is the number of candidates
// - t is target
// - m is the smallest candidate value
// - the path can include at most t / m numbers before exceeding target
//
// Space: O(k x t / m)
// - k is the number of valid combinations stored in the output
// - current path and recursion stack cost O(t / m)
function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = [];

  function dfs(index: number, list: number[], sum: number) {
    // Base case: exceeded bounds or sum
    if (index >= candidates.length || sum > target) return;

    // Found a valid combination
    if (sum === target) {
      result.push([...list]);
      return;
    }

    // Decision 1: Include current candidate (can reuse, so stay at index)
    list.push(candidates[index]);
    dfs(index, list, sum + candidates[index]);
    list.pop(); // Backtrack

    // Decision 2: Skip current candidate
    dfs(index + 1, list, sum);
  }

  dfs(0, [], 0);
  return result;
}
