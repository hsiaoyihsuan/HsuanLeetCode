// 26. Remove Duplicates from Sorted Array
// Two pointer

// Time: O(n), Space: O(n)
function removeDuplicates(nums: number[]): number {
  const set = new Set<number>();
  let left = 0;
  for (let right = 0; right < nums.length; right++) {
    if (!set.has(nums[right])) {
      set.add(nums[right]);
      nums[left] = nums[right];
      left++;
    }
  }
  return set.size;
}

// Time: O(n), Space: O(1)
function removeDuplicates2(nums: number[]): number {
  if (nums.length === 0) return 0;

  let left = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[left - 1] !== nums[right]) {
      nums[left] = nums[right];
      left++;
    }
  }

  return left;
}
