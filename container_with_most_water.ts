// 11. Container With Most Water
// Time: O(n)
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
