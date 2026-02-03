// 191. Number of 1 Bits

// Method 1: Convert to Binary String
//
// Time: O(k)
// - k = number of bits (up to 32)
//
// Space: O(k)
// - Binary string
function hammingWeight(n: number): number {
  return n
    .toString(2)
    .split("")
    .filter((b) => b === "1").length;
}

// Method 2: Bit-by-Bit Check
//
// Time: O(k)
// - One loop per bit
//
// Space: O(1)
function hammingWeight2(n: number): number {
  let count = 0;
  while (n !== 0) {
    count += n & 1;
    n >>>= 1; // unsigned right shift
  }
  return count;
}
