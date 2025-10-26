// 40. Combination Sum II
// Time: O(2^n) — each element has two choices (include or skip)
// Space: O(target) — recursion depth limited by sum to target
// Approach: Backtracking using a decision tree
function combinationSum2(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const result: number[][] = [];
  const cur: number[] = [];

  function dfs(i: number, sum: number) {
    if (sum === target) {
      result.push([...cur]);
      return;
    }

    if (i >= candidates.length || sum > target) return;

    cur.push(candidates[i]);
    dfs(i + 1, sum + candidates[i]);
    cur.pop();

    while (i + 1 < candidates.length && candidates[i + 1] === candidates[i]) {
      i++;
    }

    dfs(i + 1, sum);
  }

  dfs(0, 0);

  return result;
}
