// 17. Letter Combinations of a Phone Number
// Backtracking
// Time: O(4^n x n), Space: O(n)
function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [""];

  const map: Record<string, string[]> = {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
  };

  const chars = map[digits[0]];
  const combs = letterCombinations(digits.slice(1));

  const result: string[] = [];
  for (const char of chars) {
    for (const comb of combs) {
      result.push(char + comb);
    }
  }

  return result;
}
