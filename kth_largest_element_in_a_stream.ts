// 703. Kth Largest Element in a Stream
// Approach: Maintain a MinHeap of size `k`
// Each `add()` ensures the heap keeps only the k largest elements
// The smallest element in the heap (top) is the k-th largest overall.
//
// Time Complexity: O(m × log(k)) — m = number of add() calls
// Space Complexity: O(k)
class MyMinHeap {
  private heap: number[];
  constructor() {
    this.heap = [0];
  }

  push(num: number) {
    this.heap.push(num);
    let i = this.heap.length - 1;

    while (i > 1 && this.heap[i] < this.heap[Math.floor(i / 2)]) {
      const tmp = this.heap[i];
      this.heap[i] = this.heap[Math.floor(i / 2)];
      this.heap[Math.floor(i / 2)] = tmp;
      i = Math.floor(i / 2);
    }
  }

  pop(): number | null {
    if (this.heap.length === 1) return null;
    if (this.heap.length === 2) return this.heap.pop()!;

    const result = this.heap[1];
    this.heap[1] = this.heap.pop()!;
    let i = 1;

    while (i * 2 < this.heap.length) {
      if (
        i * 2 + 1 < this.heap.length &&
        this.heap[i * 2] > this.heap[i * 2 + 1] &&
        this.heap[i] > this.heap[i * 2 + 1]
      ) {
        const tmp = this.heap[i];
        this.heap[i] = this.heap[i * 2 + 1];
        this.heap[i * 2 + 1] = tmp;
        i = i * 2 + 1;
      } else if (this.heap[i] > this.heap[i * 2]) {
        const tmp = this.heap[i];
        this.heap[i] = this.heap[i * 2];
        this.heap[i * 2] = tmp;
        i = i * 2;
      } else {
        break;
      }
    }

    return result;
  }

  size(): number {
    return this.heap.length - 1;
  }

  peek(): number | null {
    return this.heap[1] ?? null;
  }
}

class KthLargest {
  private minHeap: MyMinHeap;
  private k: number;
  constructor(k: number, nums: number[]) {
    this.minHeap = new MyMinHeap();
    this.k = k;

    for (const num of nums) {
      this.minHeap.push(num);
    }

    while (this.minHeap.size() > k) {
      this.minHeap.pop();
    }
  }

  add(val: number): number {
    this.minHeap.push(val);

    while (this.minHeap.size() > this.k) {
      this.minHeap.pop();
    }

    // The top (smallest) element is the k-th largest
    return this.minHeap.peek()!;
  }
}
