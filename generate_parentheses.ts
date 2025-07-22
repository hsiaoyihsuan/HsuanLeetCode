// 22. Generate Parentheses
// Solution 1: Brute solution
// Generate all ( and ) combinations and validate them at the end
// Time: O(2 ^ (2n) * n), Space: O(2 ^ (2n) * n)

// Solution 2: Backtracking
// Time: O(4^n / sqrt(n)), Space: O(n)
function generateParenthesis(n: number): string[] {
  const result: string[] = [];

  function backtrack(stack: string[], openCount: number, closeCount: number) {
    if (stack.length === 2 * n) {
      result.push(stack.join(""));
      return;
    }

    if (openCount < n) {
      stack.push("(");
      backtrack(stack, openCount + 1, closeCount);
      stack.pop();
    }

    if (openCount > closeCount) {
      stack.push(")");
      backtrack(stack, openCount, closeCount + 1);
      stack.pop();
    }
  }

  backtrack([], 0, 0);

  return result;
}
