// 39. Combination Sum
// Time: O(2^n) — each element has two choices (include or skip)
// Space: O(target) — recursion depth limited by sum to target
// Approach: Backtracking using a decision tree
// At each step, decide to:
// - Include the current candidate (can reuse it, so keep index)
// - Skip the current candidate (move to next index)

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
