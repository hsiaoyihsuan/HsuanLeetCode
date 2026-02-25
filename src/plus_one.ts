// 66. Plus One
// Time: O(n), Space: O(1)
function plusOne(digits: number[]): number[] {
  digits.reverse();
  let num = 1;
  let i = 0;
  while (num !== 0) {
    if (i >= digits.length) {
      digits.push(num);
      num = 0;
    } else {
      num += digits[i];
      digits[i] = num % 10;
      num = Math.floor(num / 10);
    }
    i++;
  }
  return digits.reverse();
}

// Time: O(n), Space: O(1)
function plusOne2(digits: number[]): number[] {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i] += 1;
      return digits;
    }

    digits[i] = 0;
  }
  return [1, ...digits];
}
