// 7. Reverse Integer
//
// Idea:
// - Extract digits one by one using % 10
// - Build the reversed number incrementally
// - Before multiplying result by 10, check whether it will overflow 32-bit range
//
// Time: O(log10(n))  ≈ O(digits)
// Space: O(1)
function reverse(x: number): number {
  const MAX_INT = 2147483647; //  2^31 - 1
  const MIN_INT = -2147483648; // -2^31

  let result = 0;

  while (x !== 0) {
    const digit = x % 10;
    x = Math.trunc(x / 10);

    // Check positive overflow
    if (
      result > MAX_INT / 10 ||
      (result === Math.trunc(MAX_INT / 10) && digit > 7)
    ) {
      return 0;
    }

    // Check negative overflow
    if (
      result < MIN_INT / 10 ||
      (result === Math.trunc(MIN_INT / 10) && digit < -8)
    ) {
      return 0;
    }

    result = result * 10 + digit;
  }

  return result;
}
