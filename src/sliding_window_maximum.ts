// 239. Sliding Window Maximum
//
// Method: Monotonic Decreasing Queue
//
// Idea:
// Use a deque of indices whose values are in decreasing order.
// - Front = maximum of current window
// - Remove out-of-window indices from front
// - Remove smaller values from back
//
// Time: O(n)
// Each index enters and leaves deque at most once
//
// Space: O(k)
function maxSlidingWindow(nums: number[], k: number): number[] {
  const result: number[] = [];
  const deque: number[] = []; // store indices

  for (let i = 0; i < nums.length; i++) {
    // Remove index that is out of the window [i-k+1 ... i]
    if (deque.length > 0 && deque[0] === i - k) {
      deque.shift();
    }

    // Maintain decreasing order:
    // remove smaller values from the back
    while (deque.length > 0 && nums[deque.at(-1)!] < nums[i]) {
      deque.pop();
    }

    // Add current index
    deque.push(i);

    // Window is ready
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}
