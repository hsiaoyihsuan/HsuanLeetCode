// 45. Jump Game II
// DP (Bottom-up)
// Time: O(n^2), Space: O(n)
function jump(nums: number[]): number {
  const dp = new Array(nums.length).fill(Infinity);
  dp[nums.length - 1] = 0;

  for (let i = nums.length - 2; i >= 0; i--) {
    if (i + nums[i] >= nums.length - 1) {
      dp[i] = 1;
      continue;
    }

    for (let j = 1; j <= nums[i]; j++) {
      dp[i] = Math.min(dp[i], dp[i + j] + 1);
    }
  }

  return dp[0];
}

// Greedy
// Time: O(n), Space: O(1)
function jump2(nums: number[]): number {
  let jumps = 0;
  let l = 0;
  let r = 0;
  while (r < nums.length - 1) {
    let farthest = l;
    for (let i = l; i <= r; i++) {
      farthest = Math.max(farthest, i + nums[i]);
    }
    l = r + 1;
    r = farthest;
    jumps++;
  }
  return jumps;
}
