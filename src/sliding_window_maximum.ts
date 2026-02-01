// 239. Sliding Window Maximum
// Time: O(n), Space: O(n)
function maxSlidingWindow(nums: number[], k: number): number[] {
  const result: number[] = [];
  const deque: number[] = []; // store indices

  for (let i = 0; i < nums.length; i++) {
    if (deque.length > 0 && deque[0] === i - k) {
      deque.shift();
    }

    while (deque.length > 0 && nums[deque.at(-1)!] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  return result;
}
