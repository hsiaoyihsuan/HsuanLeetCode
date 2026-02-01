// 217. Contains Duplicate
// Version 1
// This is less efficient with large size of array
function containsDuplicateV1(nums: number[]): boolean {
  return new Set(nums).size !== nums.length;
}

// Version 2
function containsDuplicate(nums: number[]): boolean {
  const set = new Set<number>();
  for (const num of nums) {
    if (set.has(num)) {
      return true;
    }

    set.add(num);
  }
  return false;
}
