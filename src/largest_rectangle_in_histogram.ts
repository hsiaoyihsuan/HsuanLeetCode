// 84. Largest Rectangle in Histogram
// Time: O(n), Space: O(n)
function largestRectangleArea(heights: number[]): number {
  const stack: {height: number; index: number}[] = [];

  heights.push(0);
  let maxArea = 0;
  for (let i = 0; i < heights.length; i++) {
    let lastIndex = i;
    while (stack.length > 0 && stack.at(-1)!.height >= heights[i]) {
      const last = stack.pop()!;
      const area = last.height * (i - last.index);
      maxArea = Math.max(maxArea, area);
      lastIndex = last.index;
    }

    stack.push({
      height: heights[i],
      index: lastIndex,
    });
  }

  return maxArea;
}

// increasing
// [2, 3, 4, 5]
//           ^

// decreasing
// [5, 4, 3, 2]
// [2]
//           ^
// 3 x 3 = 9

// mix
// [2, 3, 9, 3, 8]
//  ^        ^  ^
//  9 x 1 = 9
//  1 * 5 = 5
