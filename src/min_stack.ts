// 155. Min Stack
class MinStack {
  private stack: number[];
  private minIndex: number = -1;

  constructor() {
    this.stack = [];
  }

  push(val: number): void {
    this.stack.push(val);

    if (this.minIndex === -1 || val < this.stack[this.minIndex]) {
      this.minIndex = this.stack.length - 1;
    }
  }

  pop(): void {
    this.stack.pop();

    if (this.stack.length === 0) {
      this.minIndex = -1;
      return;
    }

    if (this.minIndex === this.stack.length) {
      this.minIndex = 0;
      for (let i = 1; i < this.stack.length; i++) {
        if (this.stack[i] < this.stack[this.minIndex]) {
          this.minIndex = i;
        }
      }
    }
  }

  top(): number {
    return this.stack.at(-1)!;
  }

  getMin(): number {
    return this.stack[this.minIndex];
  }
}

// Alternative implementation using a secondary stack to track minimum values
class MinStack2 {
  private stack: number[];
  private minStack: number[];

  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val: number): void {
    this.stack.push(val);
    const min =
      this.minStack.length === 0 ? val : Math.min(this.minStack.at(-1)!, val);
    this.minStack.push(min);
  }

  pop(): void {
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack.at(-1)!;
  }

  getMin(): number {
    return this.minStack.at(-1)!;
  }
}

// Another alternative implementation using a single stack with a trick to store the minimum
class MinStack3 {
  private stack: number[];
  private min = Infinity;

  constructor() {
    this.stack = [];
  }

  push(val: number): void {
    if (this.stack.length === 0) {
      this.stack.push(0);
      this.min = val;
    } else {
      this.stack.push(val - this.min);
      this.min = Math.min(this.min, val);
    }
  }

  pop(): void {
    const pop = this.stack.pop()!;
    if (pop < 0) this.min -= pop;
  }

  top(): number {
    const top = this.stack.at(-1)!;
    return top < 0 ? this.min : this.min + top;
  }

  getMin(): number {
    return this.min;
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
