// 42. Trapping Rain Water
// Trapped water in each position i: min(maxLeft[i], maxRight[i]) - height[i];

// The first try. Time: O(n), Space: O(n)
// Prefix & Suffix Arrays: Use leftMax and rightMax arrays to record the max left and max right for each position
function trap(height: number[]): number {
  const n = height.length;
  if (n === 0) return 0;

  const leftMax = new Array(n).fill(0);
  const rightMax = new Array(n).fill(0);

  for (let i = 1; i < n - 1; i++) {
    leftMax[i] = Math.max(height[i - 1], leftMax[i - 1]);
  }

  for (let i = n - 2; i >= 1; i--) {
    rightMax[i] = Math.max(height[i + 1], rightMax[i + 1]);
  }

  let water = 0;
  for (let i = 1; i < n - 1; i++) {
    const minHeight = Math.min(leftMax[i], rightMax[i]);
    if (minHeight > height[i]) {
      water += minHeight - height[i];
    }
  }
  return water;
}

// Time: O(n), Space: O(1)
// Two pointers
function trap2(height: number[]): number {
  if (height.length === 0) return 0;

  let left = 0;
  let right = height.length - 1;
  let maxLeft = height[left];
  let maxRight = height[right];
  let water = 0;

  while (left < right) {
    if (maxLeft < maxRight) {
      left++;
      const amount = maxLeft - height[left];
      if (amount > 0) {
        water += amount;
      }
      maxLeft = Math.max(maxLeft, height[left]);
    } else {
      right--;
      const amount = maxRight - height[right];
      if (amount > 0) {
        water += amount;
      }
      maxRight = Math.max(maxRight, height[right]);
    }
  }

  return water;
}
