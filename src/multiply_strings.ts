// 43. Multiply Strings
//
// Grade-school multiplication using an array of digits.
// result has length m + n because max digits of product is m + n.
//
// Time: O(m * n) (carry loop is amortized), Space: O(m + n)
function multiply(num1: string, num2: string): string {
  if (num1 === "0" || num2 === "0") return "0";

  const m = num1.length;
  const n = num2.length;
  const res = new Array(m + n).fill(0);
  const zeroCode = "0".charCodeAt(0);

  for (let i = m - 1; i >= 0; i--) {
    const d1 = num1.charCodeAt(i) - zeroCode;

    for (let j = n - 1; j >= 0; j--) {
      const d2 = num2.charCodeAt(j) - zeroCode;

      let carry = d1 * d2;
      let pos = i + j + 1;

      // Add product into res[pos], propagate carry left if needed
      while (carry > 0 && pos >= 0) {
        carry += res[pos];
        res[pos] = carry % 10;
        carry = Math.floor(carry / 10);
        pos--;
      }
    }
  }

  // Skip leading zeros
  let start = 0;
  while (start < res.length && res[start] === 0) start++;

  return start === res.length ? "0" : res.slice(start).join("");
}
