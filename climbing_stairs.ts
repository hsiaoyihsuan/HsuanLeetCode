// 70. Climbing Stairs

// -----------------------------
// Brute Force: Decision Tree
// -----------------------------
// This explores every possible way to reach step `n` by recursively choosing
// either 1-step or 2-step at each level.
// It builds a binary tree of possibilities with height ~n.
// Time Complexity: O(2^n) — exponential growth
// Space Complexity: O(n) — recursive call stack
// This approach will hit Time Limit Exceeded (TLE) for larger inputs.
function climbStairs(n: number): number {
  let count = 0;
  function findAndCountN(currentNum: number) {
    if (currentNum > n) return;

    if (currentNum === n) {
      count++;
      return;
    }

    findAndCountN(currentNum + 1);
    findAndCountN(currentNum + 2);
  }

  findAndCountN(0);
  return count;
}

// -----------------------------
// Optimized: Bottom-Up DP
// -----------------------------
// This uses dynamic programming to build up the result iteratively.
// Essentially calculates the nth Fibonacci number.
// Time Complexity: O(n)
// Space Complexity: O(1
function climbStairsDP(n: number): number {
  let one = 1;
  let two = 1;
  for (let i = 0; i < n - 1; i++) {
    const tmp = one;
    one = one + two;
    two = tmp;
  }
  return one;
}
