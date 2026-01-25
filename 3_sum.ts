// 15. 3Sum
// Method: Sorting + Two-pointer
// - Sort the array first
// - Iterate each number nums[i] as the first element of the triplet
// - Skip duplicates to avoid repeated triplets
// - Use two pointers (left, right) to find the other two numbers such that sum = 0
// - Move pointers inward, skipping duplicates
//
// Time: O(n^2)
//   - Outer loop runs n times
//   - Inner two-pointer scan takes O(n) in total per outer iteration
// Space: O(n) if considering sort, O(1) extra otherwise
function threeSum(nums: number[]): number[][] {
  const result: number[][] = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicate first numbers

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // skip duplicate second numbers
        while (left < right && nums[left] === nums[left + 1]) left++;
        // skip duplicate third numbers
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum > 0) {
        right--;
      } else {
        left++;
      }
    }
  }

  return result;
}
