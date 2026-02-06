// 371. Sum of Two Integers
// Bit manipulation
// Time: O(1) (at most 32 iterations)
// Space: O(1)
function getSum(a: number, b: number): number {
  while (b !== 0) {
    const carry = (a & b) << 1; // carry
    a = a ^ b; // sum without carry
    b = carry; // add carry next round
  }

  return a;
}
