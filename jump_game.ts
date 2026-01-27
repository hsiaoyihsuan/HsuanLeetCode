// 55. Jump Game

// Method 1: DP (Backward Reachability)
// Time: O(n^2), Space: O(n)
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
// Time: O(n), Space: O(1)
function canJump2(nums: number[]): boolean {
  let goal = nums.length - 1;

  for (let i = nums.length - 2; i >= 0; i--) {
    if (i + nums[i] >= goal) goal = i;
  }

  return goal === 0;
}
