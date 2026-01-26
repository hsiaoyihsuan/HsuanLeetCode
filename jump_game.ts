// 55. Jump Game

// Method 1: DP (Backward Reachability)
//
// Idea:
// - dp[i] = whether we can reach the last index starting from i
// - Base case: dp[last] = true
// - For each index i, try all reachable positions j (i < j ≤ i + nums[i])
// - If any dp[j] is true, then dp[i] is true
//
// Time: O(n^2)
// - In the worst case, for each index we scan up to nums[i] positions
//
// Space: O(n)
// - dp array stores reachability for each index
function canJump(nums: number[]): boolean {
  const dp = new Array(nums.length).fill(false);
  dp[nums.length - 1] = true;

  for (let i = nums.length - 2; i >= 0; i--) {
    for (let j = i + 1; j <= i + nums[i] && j < nums.length; j++) {
      if (dp[j]) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[0];
}

// Method 2: Greedy (Farthest Reach)
//
// Idea:
// - Track the farthest index we can reach so far
// - If we ever reach an index i that is beyond this range, we are stuck
// - Otherwise, keep extending the reachable range
//
// Time: O(n)
// - Single pass through the array
//
// Space: O(1)
// - Only one variable is used
function canJump2(nums: number[]): boolean {
  let farthest = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false;

    farthest = Math.max(farthest, i + nums[i]);
  }

  return true;
}
