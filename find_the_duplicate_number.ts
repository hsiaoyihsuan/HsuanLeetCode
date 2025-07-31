// 287. Find the Duplicate Number
// Time: O(n), Space: O(1)
// Floyd’s Tortoise and Hare Algorithm
function findDuplicate(nums: number[]): number {
  let slow = 0;
  let fast = 0;
  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];

    if (slow === fast) {
      let slow2 = 0;
      while (slow !== slow2) {
        slow = nums[slow];
        slow2 = nums[slow2];
      }
      return slow2;
    }
  }
}

function findDuplicate2(nums: number[]): number {
  let slow = 0;
  let fast = 0;

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  let slow2 = 0;
  while (slow !== slow2) {
    slow = nums[slow];
    slow2 = nums[slow2];
  }

  return slow2;
}
