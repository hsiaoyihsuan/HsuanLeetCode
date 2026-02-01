// 167. Two Sum II - Input Array Is Sorted
// Method: Two-pointer technique
// Time: O(n) — each element is visited at most once
// Space: O(1) — only two pointers used
function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;
  while (left <= right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}
