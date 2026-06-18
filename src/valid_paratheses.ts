// 20. Valid Parentheses
//
// Method: Stack
// Idea:
// - Push opening brackets onto the stack
// - For each closing bracket, check if it matches the latest opening bracket
// - The string is valid only if all brackets are matched
// Time: O(n)
// Space: O(n)
function isValid(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  const set = new Set(["(", "[", "{"]);

  for (const char of s) {
    if (set.has(char)) {
      stack.push(char);
      continue;
    }

    const left = pairs[char]!;
    if (stack[stack.length - 1] !== left) {
      return false;
    }

    stack.pop()!;
  }

  return stack.length === 0;
}
