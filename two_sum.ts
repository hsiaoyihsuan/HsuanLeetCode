// 1. Two Sum
// Version 1
function twoSumV1(nums: number[], target: number): number[] {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

// Version2
function twoSumV2(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [i, map.get(complement)];
    }
    map.set(nums[i], i);
  }
}
