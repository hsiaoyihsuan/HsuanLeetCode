// 50. Pow(x, n)

/**
 * Method 1: Brute Force Multiplication
 *
 * Idea:
 * - Multiply x repeatedly |n| times
 * - If n is negative, return reciprocal
 *
 * Drawback:
 * - Too slow when |n| is large
 *
 * Time: O(|n|)
 * Space: O(1)
 */
function myPow(x: number, n: number): number {
  let result = 1;

  // Multiply x |n| times
  for (let i = 0; i < Math.abs(n); i++) {
    result *= x;
  }

  // Handle negative exponent
  return n > 0 ? result : 1 / result;
}

/**
 * Method 2: Recursive Binary Exponentiation (Divide & Conquer)
 *
 * Idea:
 * - Use math property:
 *      x^n = (x^2)^(n/2)          if n is even
 *      x^n = x * (x^2)^(n/2)      if n is odd
 *
 * - Each recursion halves the exponent
 * - Much faster than multiplying one by one
 *
 * Key Insight:
 * - Exponent shrinks exponentially → log complexity
 *
 * Time: O(log |n|)
 * Space: O(log |n|)  // recursion stack
 */
function myPow2(x: number, n: number): number {
  if (n === 0) return 1;

  // Convert negative exponent
  if (n < 0) return 1 / myPow2(x, -n);

  if (n === 1) return x;

  // Compute power using squared base
  const half = myPow2(x * x, Math.floor(n / 2));

  // If n is odd, multiply one extra x
  return n % 2 === 0 ? half : x * half;
}

/**
 * Method 3: Iterative Binary Exponentiation (Optimal)
 *
 * Idea:
 * - Same math idea as Method 2 but iterative
 * - Interpret exponent in binary form
 *
 * Example:
 *      n = 13 (1101₂)
 *      x^13 = x^8 * x^4 * x^1
 *
 * Algorithm:
 * - If current bit is 1 → multiply result
 * - Square base every step
 * - Divide exponent by 2 each iteration
 *
 * Advantages:
 * - No recursion stack
 * - Interview-preferred solution
 *
 * Time: O(log |n|)
 * Space: O(1)
 */
function myPow3(x: number, n: number): number {
  let base = x;
  let exp = n;
  let result = 1;

  // Convert negative exponent
  if (exp < 0) {
    base = 1 / base;
    exp = -exp;
  }

  while (exp > 0) {
    // If current binary bit is 1
    if (exp % 2 === 1) {
      result *= base;
    }

    // Move to next bit
    base *= base;
    exp = Math.floor(exp / 2);
  }

  return result;
}
