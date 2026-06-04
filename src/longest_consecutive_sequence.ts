// 128. Longest Consecutive Sequence
//
// Method 1: Sorting
// Idea:
// - Remove duplicates first
// - Sort numbers in ascending order
// - Track the current consecutive window
// Time: O(n log n)
// Space: O(n)
function longestConsecutive(nums: number[]): number {
  if (nums.length === 0) return 0;

  const uniqNums = Array.from(new Set(nums)).sort((a, b) => a - b);
  let result = 1;
  let l = 0;
  for (let r = 1; r < uniqNums.length; r++) {
    if (uniqNums[r] === uniqNums[r - 1] + 1) {
      result = Math.max(result, r - l + 1);
    } else {
      l = r;
    }
  }
  return result;
}

// Method 2: Hash Set
// Idea:
// - Put all numbers into a set
// - Only start counting from numbers that have no previous number
// - Expand forward to find the full consecutive length
// Time: O(n)
// Space: O(n)
function longestConsecutive2(nums: number[]): number {
  const uniq = new Set<number>(nums);

  let maxLength = 0;
  for (let num of uniq) {
    // Skip if this number is not the start of a sequence
    if (uniq.has(num - 1)) continue;

    let currentNum = num;
    while (uniq.has(currentNum)) {
      currentNum++;
    }
    maxLength = Math.max(maxLength, currentNum - num);
  }

  return maxLength;
}
