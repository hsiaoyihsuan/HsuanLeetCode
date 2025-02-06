// 347. Top K Frequent Elements
// 1st attempt: Use Map and normal sort
// Time: O(n log n), Space: O(n)
function topKFrequent(nums: number[], k: number): number[] {
  const map = new Map<number, number>();
  nums.forEach((num) => map.set(num, (map.get(num) ?? 0) + 1));

  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}

// 2nd attempt: Use frequency map and bucket sort
// Time: O(n), Space: O(n)
function topKFrequent(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) ?? 0) + 1);
  }

  //   Create buckets where the index represents the frequency
  const buckets = Array(nums.length + 1)
    .fill(null)
    .map(() => []);

  // Populate the buckets using the frequency map
  for (const [num, freq] of freqMap.entries()) {
    buckets[freq].push(num);
  }

  //   Traverse the buckets in reverse order (highest frequency first)
  const result: number[] = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result;
}
// buckets = [
//   [], // 0 (no elements with 0 frequency)
//   [3], // 1 (3 appears once)
//   [2], // 2 (2 appears twice)
//   [1], // 3 (1 appears three times)
//   [], // 4
//   [], // 5
//   [],
// ];
