// 190. Reverse Bits
// Time: O(1)
// - Always processes exactly 32 bits
//
// Space: O(1)
// - Uses constant extra space
function reverseBits(n: number): number {
  let result = 0;

  for (let i = 0; i < 32; i++) {
    result <<= 1;

    result |= n & 1;

    n >>>= 1;
  }

  return result >>> 0; // force unsigned
}
