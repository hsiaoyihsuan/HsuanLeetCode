// 42. Trapping Rain Water
// --------------------------------------------------
// Key idea:
// Water trapped at position i =
// min(max height on left, max height on right) - height[i]
//
// Only positive values contribute to total water.

// --------------------------------------------------
// Approach 1: Prefix & Suffix Arrays
// Time: O(n)
// Space: O(n)
//
// Use two arrays:
// leftMax[i]  = maximum height to the left of i
// rightMax[i] = maximum height to the right of i
//
// Then compute water for each position.

function trap(height: number[]): number {
  const n = height.length;
  if (n === 0) return 0;

  const leftMax = new Array(n).fill(0);
  const rightMax = new Array(n).fill(0);

  // Build leftMax array
  // leftMax[i] stores the maximum height from 0 → i-1
  for (let i = 1; i < n - 1; i++) {
    leftMax[i] = Math.max(height[i - 1], leftMax[i - 1]);
  }

  // Build rightMax array
  // rightMax[i] stores the maximum height from i+1 → n-1
  for (let i = n - 2; i >= 1; i--) {
    rightMax[i] = Math.max(height[i + 1], rightMax[i + 1]);
  }

  // Calculate trapped water
  let water = 0;
  for (let i = 1; i < n - 1; i++) {
    const minHeight = Math.min(leftMax[i], rightMax[i]);

    // Water only exists if boundary is taller
    if (minHeight > height[i]) {
      water += minHeight - height[i];
    }
  }

  return water;
}

// --------------------------------------------------
// Approach 2: Two Pointers (Optimal)
// Time: O(n)
// Space: O(1)
//
// Instead of storing arrays, use two pointers.
// The key insight:
//
// If maxLeft < maxRight,
// then water at left depends only on maxLeft.
// Because the right boundary is guaranteed taller.
//
// Symmetrically for the right side.

function trap2(height: number[]): number {
  if (height.length === 0) return 0;

  let left = 0;
  let right = height.length - 1;

  let maxLeft = height[left];
  let maxRight = height[right];

  let water = 0;

  while (left < right) {
    if (maxLeft < maxRight) {
      // Move left pointer
      left++;

      // Water depends on maxLeft
      const amount = maxLeft - height[left];
      if (amount > 0) {
        water += amount;
      }

      // Update maxLeft
      maxLeft = Math.max(maxLeft, height[left]);
    } else {
      // Move right pointer
      right--;

      // Water depends on maxRight
      const amount = maxRight - height[right];
      if (amount > 0) {
        water += amount;
      }

      // Update maxRight
      maxRight = Math.max(maxRight, height[right]);
    }
  }

  return water;
}
