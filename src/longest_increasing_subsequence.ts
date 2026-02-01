// 300. Longest Increasing Subsequence

// Method 1: Recursion
//
// Idea:
// - At each index, choose to either:
//   1) skip the current number
//   2) take it if it is larger than the previously chosen number
// - Explore all possible subsequences
//
// Time: O(2^n)
// - Each element can be taken or skipped
//
// Space: O(n)
// - Recursion stack depth
function lengthOfLIS(nums: number[]): number {
  function dfs(index: number, prevIndex: number): number {
    if (index === nums.length) return 0;

    // Option 1: skip nums[index]
    let max = dfs(index + 1, prevIndex);

    // Option 2: take nums[index] if increasing
    if (prevIndex === -1 || nums[index] > nums[prevIndex]) {
      max = Math.max(max, 1 + dfs(index + 1, index));
    }

    return max;
  }

  return dfs(0, -1);
}

// Method 2: DP (Top-down / Memoization)
//
// Idea:
// - Same recursion as Method 1
// - Memoize results using (index, prevIndex) as state
// - Avoid recomputing overlapping subproblems
//
// Time: O(n^2)
// - n * (n + 1) possible states
//
// Space: O(n^2)
// - 2D memo table + recursion stack
function lengthOfLIS2(nums: number[]): number {
  const n = nums.length;
  const memo = Array.from({length: n}, () => new Array(n + 1).fill(-1));

  function dfs(index: number, prevIndex: number): number {
    if (index === n) return 0;

    const memoKey = prevIndex + 1;
    if (memo[index][memoKey] !== -1) {
      return memo[index][memoKey];
    }

    // Option 1: skip nums[index]
    let max = dfs(index + 1, prevIndex);

    // Option 2: take nums[index] if increasing
    if (prevIndex === -1 || nums[index] > nums[prevIndex]) {
      max = Math.max(max, 1 + dfs(index + 1, index));
    }

    memo[index][memoKey] = max;
    return max;
  }

  return dfs(0, -1);
}

// Method 3: DFS + Memoization (Top-down DP)
//
// Idea:
// - Define dfs(i) as the LIS length starting at index i
// - From i, try all j > i where nums[j] > nums[i]
// - Memoize dfs(i) to avoid repeated work
//
// Time: O(n^2)
// - n states, each scans up to n elements
//
// Space: O(n)
// - memo array + recursion stack
function lengthOfLIS3(nums: number[]): number {
  // memo[i] stores the LIS length starting at index i
  const memo = new Array(nums.length).fill(-1);

  function dfs(i: number): number {
    if (memo[i] !== -1) return memo[i];

    let LIS = 1;

    // Try extending the sequence using elements after i
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > nums[i]) {
        LIS = Math.max(LIS, dfs(j) + 1);
      }
    }

    memo[i] = LIS;
    return LIS;
  }

  // LIS can start at any index
  return Math.max(...nums.map((_, i) => dfs(i)));
}

// Method 4: DP (Bottom-up)
//
// Idea:
// - LIS[i] = length of the longest increasing subsequence starting at index i
// - Initialize LIS[i] = 1 (each element alone)
// - Compute from right to left so future states are known
//
// Time: O(n^2)
// - Two nested loops
//
// Space: O(n)
// - LIS array
function lengthOfLIS4(nums: number[]): number {
  // LIS[i] = length of the LIS starting at index i
  const LIS = new Array(nums.length).fill(1);

  // Process from right to left
  for (let i = nums.length - 1; i >= 0; i--) {
    for (let j = i + 1; j < nums.length; j++) {
      // Extend the sequence if increasing
      if (nums[i] < nums[j]) {
        LIS[i] = Math.max(LIS[i], 1 + LIS[j]);
      }
    }
  }

  return Math.max(...LIS);
}
