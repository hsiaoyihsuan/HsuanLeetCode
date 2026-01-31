// 678. Valid Parenthesis String
// Method 1: Stack
//
// Idea:
// - Use two stacks:
//   1. leftStack  → store indices of '('
//   2. starStack  → store indices of '*'
// - When encountering ')', try to match with '(' first,
//   otherwise use '*' as '('.
// - After traversal, match remaining '(' with '*' that appear AFTER them.
//
// Time: O(n)
// - Single pass + cleanup matching
//
// Space: O(n)
// - Two stacks may store all indices in worst case
function checkValidString(s: string): boolean {
  const left: number[] = [];
  const star: number[] = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "*") {
      star.push(i);
    } else if (s[i] === "(") {
      left.push(i);
    } else {
      if (left.length > 0) {
        left.pop();
      } else if (star.length > 0) {
        star.pop();
      } else {
        return false;
      }
    }
  }

  while (left.length > 0) {
    if (left[left.length - 1] < star[star.length - 1]) {
      left.pop();
      star.pop();
    } else {
      return false;
    }
  }

  return true;
}

// Method 2: Greedy (Range of Open Parentheses)
//
// Idea:
// - Track a RANGE of possible open '(' count
// - minOpen → minimum possible '('
// - maxOpen → maximum possible '('
// - '*' can be '(', ')' or empty
// - If maxOpen < 0 → too many ')' → invalid
// - Clamp minOpen to 0 because '*' can be empty
//
// Time: O(n)
// - Single pass through the string
//
// Space: O(1)
// - Only two counters
function checkValidString2(s: string): boolean {
  let leftMin = 0;
  let leftMax = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      leftMin++;
      leftMax++;
    } else if (s[i] === ")") {
      leftMin--;
      leftMax--;
    } else {
      leftMin--;
      leftMax++;
    }

    if (leftMax < 0) return false;

    if (leftMin < 0) leftMin = 0;
  }

  return leftMin === 0;
}
