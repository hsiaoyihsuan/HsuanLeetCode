// 128. Longest Consecutive Sequence
// My first try. Time Limit Exceeded!!
function longestConsecutive(nums: number[]): number {
  const set = new Set<number>(nums);
  let minNum = Infinity;
  let maxNum = -Infinity;
  for (const num of nums) {
    minNum = Math.min(minNum, num);
    maxNum = Math.max(maxNum, num);
  }

  let maxLength = 0;
  let currentLength = 0;
  for (let num = minNum; num <= maxNum; num++) {
    if (set.has(num)) {
      currentLength++;
      maxLength = Math.max(maxLength, currentLength);
    } else {
      currentLength = 0;
    }
  }

  return maxLength;
}

function longestConsecutive2(nums: number[]): number {
  const set = new Set<number>(nums);

  let maxLength = 0;
  for (let num of set) {
    // If it is the start of a sequence
    if (set.has(num - 1)) continue;

    let currentNum = num;
    while (set.has(currentNum)) {
      currentNum++;
    }
    maxLength = Math.max(maxLength, currentNum - num);
  }

  return maxLength;
}
