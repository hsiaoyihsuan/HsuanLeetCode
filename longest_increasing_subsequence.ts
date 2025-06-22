// 300. Longest Increasing Subsequence
// O(n ^ 2). Count from the end. DF.
// 18 -> 1
// 101 -> 1
// 7, 101 -> 2
// 7, 18 -> 2
// 3, 7, (...) -> 3
// 5, 7, (...) -> 3
// 2, (5, 3) -> 4

// First try
function lengthOfLIS(nums: number[]): number {
  const map = new Map<number, number>();
  map.set(nums.at(-1)!, 1);
  let result = 1;

  for (let i = nums.length - 2; i >= 0; i--) {
    let max = 0;
    let j = i + 1;
    while (j < nums.length) {
      if (nums[j] > nums[i] && map.get(nums[j])! > max) {
        max = map.get(nums[j])!;
      }
      j++;
    }
    map.set(nums[i], 1 + max);
    result = Math.max(result, 1 + max);
  }
  return result;
}

// Refined version
function lengthOfLIS2(nums: number[]): number {
  const LIS = Array(nums.length).fill(1);

  for (let i = nums.length - 1; i >= 0; i--) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > nums[i]) {
        LIS[i] = Math.max(LIS[i], 1 + LIS[j]);
      }
    }
  }

  return Math.max(...LIS);
}
