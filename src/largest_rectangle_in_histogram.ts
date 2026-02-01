// 84. Largest Rectangle in Histogram
// Time: O(n), Space: O(n)
// Use a stack to keep track of increasing bar indices
function largestRectangleArea(heights: number[]): number {
  let maxArea = 0;
  const stack: {index: number; height: number}[] = [];

  for (let i = 0; i < heights.length; i++) {
    let start = i;
    while (stack.length > 0 && stack.at(-1)!.height > heights[i]) {
      const {index, height} = stack.pop()!;
      maxArea = Math.max(maxArea, (i - index) * height);
      start = index;
    }

    stack.push({index: start, height: heights[i]});
  }

  for (const {index, height} of stack) {
    maxArea = Math.max(maxArea, (heights.length - index) * height);
  }

  return maxArea;
}
