// 40. Combination Sum II
// Method: DFS Backtracking
//
// Idea:
// - Sort candidates so duplicate values are adjacent
// - Use a decision tree where each candidate can be used at most once
// - Include the current candidate, then move to the next index
// - Skip all duplicate copies before exploring the exclude branch
//
// Time: O(n x 2^n)
// - sorting costs O(n log n)
// - each candidate can be included or skipped
// - copying a valid combination costs up to O(n)
//
// Space: O(k x n)
// - k is the number of valid combinations stored in the output
// - current path and recursion stack cost O(n)
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
