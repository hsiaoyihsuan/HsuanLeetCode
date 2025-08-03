// 150. Evaluate Reverse Polish Notation
// Time: O(n), Space: O(n)
// Stack
function evalRPN(tokens: string[]): number {
  const stack: number[] = [];

  for (const token of tokens) {
    if (["+", "-", "*", "/"].includes(token)) {
      stack.push(Number(token));
      continue;
    }

    const num1 = stack.pop()!;
    const num2 = stack.pop()!;

    if (token === "+") {
      stack.push(num1 + num2);
    } else if (token === "-") {
      stack.push(num2 - num1);
    } else if (token === "*") {
      stack.push(num1 * num2);
    } else {
      stack.push(Math.trunc(num2 / num1));
    }
  }
  return stack[0];
}
