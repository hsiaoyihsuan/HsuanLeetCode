// 150. Evaluate Reverse Polish Notation
// Time: O(n), Space: O(n)
// Stack
function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  const operators = new Set(["+", "-", "*", "/"]);

  for (const token of tokens) {
    if (operators.has(token)) {
      const num2 = stack.pop()!;
      const num1 = stack.pop()!;
      if (token === "+") {
        stack.push(num1 + num2);
      } else if (token === "-") {
        stack.push(num1 - num2);
      } else if (token === "*") {
        stack.push(num1 * num2);
      } else {
        stack.push(Math.trunc(num1 / num2));
      }
    } else {
      stack.push(Number(token));
    }
  }

  return stack.at(-1)!;
}
