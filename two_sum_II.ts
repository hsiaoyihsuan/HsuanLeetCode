// 167. Two Sum II - Input Array Is Sorted
// Version 1
function twoSumV1(numbers: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < numbers.length; i++) {
    const implement = target - numbers[i];
    if (map.has(implement)) {
      return [map.get(implement), i + 1];
    }

    map.set(numbers[i], i + 1);
  }
}

// Version 2, use two-pointer technique
function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;
  while (left <= right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}
