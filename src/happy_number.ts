// 202. Happy Number
// Method: Hash Set to detect cycles
//
// Idea:
// 1. Keep a set of numbers we've already seen.
// 2. Repeatedly replace the number by the sum of squares of its digits.
// 3. If we reach 1 → happy number → return true.
// 4. If a number repeats → cycle detected → not happy → return false.
// Time: O(log n) per iteration, depends on the number of unique numbers in the sequence
// Space: O(log n) for the set

function isHappy(n: number): boolean {
  const seen = new Set<number>();

  // Loop until we either reach 1 or detect a cycle
  while (!seen.has(n)) {
    if (n === 1) return true; // Reached 1, happy number

    seen.add(n); // Mark current number as seen

    let tmp = n;
    let sum = 0;

    // Compute sum of squares of digits
    while (tmp !== 0) {
      const digit = tmp % 10;
      sum += digit ** 2;
      tmp = Math.floor(tmp / 10);
    }

    n = sum; // Replace n with sum of squares
  }

  // Number repeated → cycle detected → not happy
  return false;
}
