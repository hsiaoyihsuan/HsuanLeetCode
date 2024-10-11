// 238. Product of Array Except Self
// Version 1, Time: O(n), Space: O(n)
function productExceptSelfV1(nums: number[]): number[] {
  const prefix: number[] = [];
  let prefixProduct = 1;
  for (let i = 0; i < nums.length; i++) {
    prefix.push(prefixProduct);
    prefixProduct *= nums[i];
  }

  const suffix: number[] = [];
  let suffixProduct = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    suffix.unshift(suffixProduct);
    suffixProduct *= nums[i];
  }

  const result: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    result.push(prefix[i] * suffix[i]);
  }
  return result;
}

// Version 2, Time: O(n), Space: O(1)
function productExceptSelfV2(nums: number[]): number[] {
  const result: number[] = [];
  let prefixProduct = 1;
  for (let i = 0; i < nums.length; i++) {
    result.push(prefixProduct);
    prefixProduct *= nums[i];
  }

  let suffixProduct = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] = result[i] * suffixProduct;
    suffixProduct *= nums[i];
  }

  return result;
}
