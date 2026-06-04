// 238. Product of Array Except Self
//
// Method 1: Prefix + Suffix Arrays
// Idea:
// - prefix[i] stores the product before index i
// - suffix[i] stores the product after index i
// - answer[i] is prefix[i] * suffix[i]
// Time: O(n)
// Space: O(n)
function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const prefix = new Array(n).fill(1);
  const suffix = new Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    prefix[i] = prefix[i - 1] * nums[i - 1];
  }

  for (let i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i + 1];
  }

  const result: number[] = [];

  for (let i = 0; i < n; i++) {
    result.push(prefix[i] * suffix[i]);
  }

  return result;
}

// Method 2: Prefix + Suffix Products
// Idea:
// - First pass stores prefix products in result
// - Second pass multiplies each value by the suffix product
// - This avoids extra prefix and suffix arrays
// Time: O(n)
// Space: O(1)
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
