// 416. Partition Equal Subset Sum

// Method 1: Recursion (Brute Force)
// Time: O(2^n)
// Space: O(n) (recursion stack)
function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b);

  if (total % 2 !== 0) return false;

  const target = total / 2;

  function dfs(i: number, sum: number): boolean {
    if (sum === 0) return true;

    if (i >= nums.length || sum < 0) return false;

    if (dfs(i + 1, sum)) return true;
    if (dfs(i + 1, sum - nums[i])) return true;
    return false;
  }

  return dfs(0, target);
}

// Method 2: DP (Top-down / Memoization)
// Time: O(n × target)
// Space: O(n × target)
function canPartition2(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b);

  if (total % 2 !== 0) return false;

  const target = total / 2;

  // memo[index][sum] = whether sum can be formed from nums[index...]
  const memo = Array.from(
    {length: nums.length},
    () => new Map<number, boolean>(),
  );

  function dfs(i: number, sum: number): boolean {
    if (sum === 0) return true;
    if (i >= nums.length || sum < 0) return false;

    if (memo[i].has(sum)) return memo[i].get(sum)!;

    const result = dfs(i + 1, sum) || dfs(i + 1, sum - nums[i]);

    memo[i].set(sum, result);
    return result;
  }

  return dfs(0, target);
}

// Method 3: DP (Bottom-up)
// Time: O(n × target), Space: O(target)
function canPartition3(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b);

  if (total % 2 !== 0) return false;

  const target = total / 2;

  let dp = new Set<number>();
  dp.add(0);

  for (let i = nums.length - 1; i >= 0; i--) {
    const nextDp = new Set<number>();

    for (const t of dp) {
      nextDp.add(nums[i] + t);
      nextDp.add(t);
    }

    dp = nextDp;
  }

  return dp.has(target);
}
