// 155. Min Stack
//
// Idea:
// Maintain a normal stack, but each element stores two values:
// [value, minSoFar]
//
// minSoFar records the minimum value of the stack
// at the moment this element was pushed.
//
// Example:
// push(5) → [5,5]
// push(3) → [3,3]
// push(7) → [7,3]
// push(2) → [2,2]
//
// Stack state:
// [
//   [5,5],
//   [3,3],
//   [7,3],
//   [2,2]
// ]
//
// getMin() is always the second value of the top element.
//
// Time: O(1) for push, pop, top, getMin
// Space: O(n)

class MinStack {
  // Each entry: [value, minSoFar]
  private stack: [number, number][] = [];

  push(val: number): void {
    // If stack is empty, the minimum is the value itself
    if (this.stack.length === 0) {
      this.stack.push([val, val]);
      return;
    }

    // Compare the new value with the previous minimum
    const prevMin = this.stack.at(-1)![1];

    // Store the new minimum together with the value
    this.stack.push([val, Math.min(prevMin, val)]);
  }

  pop(): void {
    // Remove the top element
    this.stack.pop();
  }

  top(): number {
    // Return the value of the top element
    return this.stack.at(-1)![0];
  }

  getMin(): number {
    // Return the minimum stored with the top element
    return this.stack.at(-1)![1];
  }
}
