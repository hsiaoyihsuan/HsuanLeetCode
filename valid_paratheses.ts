// 20. Valid Parentheses
// Version 1
function isValidV1(s: string): boolean {
  const bracketPairs = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  const stack: string[] = [];
  for (const char of [...s]) {
    if (char in bracketPairs) {
      stack.push(char);
    } else {
      const lastBracket = stack.pop();
      if (bracketPairs[lastBracket] !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
