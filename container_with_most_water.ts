// 11. Container With Most Water
// Method: Two-pointer technique
// Time: O(n) — each element is visited at most once
// Space: O(1) — only a few variables used
function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let result = 0;
  while (left < right) {
    const amount = Math.min(height[left], height[right]) * (right - left);
    if (result < amount) result = amount;

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return result;
}
