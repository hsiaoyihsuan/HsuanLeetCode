// 17. Letter Combinations of a Phone Number
// Method: Recursion
//
// Idea:
// - Split the problem into the first digit and all combinations for the suffix
// - Insert each possible first-digit letter in front of each suffix combination
// - The empty suffix returns one empty string so the previous level can append
//
// Time: O(n x 4^n)
// - There are at most 4^n combinations
// - Building each string costs up to O(n)
//
// Space: O(n x 4^n)
// - output stores at most 4^n strings of length n
// - recursion stack costs O(n)
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

// Method: DFS Backtracking
//
// Idea:
// - Build one combination from left to right
// - At each digit, try every mapped character
// - When the path length reaches digits.length, save the completed combination
//
// Time: O(n x 4^n)
// - There are at most 4^n combinations
// - Copying/building each completed string costs up to O(n)
//
// Space: O(n x 4^n)
// - output stores at most 4^n strings of length n
// - recursion stack costs O(n)
function letterCombination2(digits: string): string[] {
  const digitMap: Record<string, string[]> = {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
  };

  const result: string[] = [];

  function dfs(i: number, str: string) {
    if (i >= digits.length) {
      result.push(str);
      return;
    }

    for (const char of digitMap[digits[i]]) {
      dfs(i + 1, str + char);
    }
  }

  dfs(0, "");

  return result;
}
