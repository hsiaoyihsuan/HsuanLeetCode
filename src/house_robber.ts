// 198. House Robber
// Exceed Time Limit
export function rob(nums: number[]): number {
  const map = new Map<number, number>();

  function findMax(i: number): number {
    if (map.has(i)) return map.get(i)!;

    if (i === nums.length - 1) {
      map.set(i, nums[i]);
      return nums[i];
    }

    if (i === nums.length - 2) {
      map.set(i, Math.max(nums[i], nums[i + 1]));
      return map.get(i)!;
    }

    const firstMax = nums[i] + findMax(i + 2);
    const notFirstMax = findMax(i + 1);
    return Math.max(firstMax, notFirstMax);
  }

  return findMax(0);
}

// Time: O(N), Space: O(N)
function rob2(nums: number[]): number {
  if (nums.length <= 2) return Math.max(...nums);

  const map = new Map<number, number>();
  map.set(nums.length - 1, nums.at(-1)!);
  map.set(nums.length - 2, Math.max(nums.at(-2)!, nums.at(-1)!));

  for (let i = nums.length - 3; i >= 0; i--) {
    map.set(i, Math.max(nums[i] + map.get(i + 2)!, map.get(i + 1)!));
  }

  return map.get(0)!;
}

// Time: O(N), Space: O(1)
function rob3(nums: number[]): number {
  let rob1 = 0;
  let rob2 = 0;

  for (const num of nums) {
    const current = Math.max(rob1 + num, rob2);
    rob1 = rob2;
    rob2 = current;
  }
  return rob2;
}
