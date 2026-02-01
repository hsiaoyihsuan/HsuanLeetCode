// 295. Find Median from Data Stream
/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

// Heap. Time: O(n), Space: O(n)
import {
  MaxPriorityQueue,
  MinPriorityQueue,
} from "@datastructures-js/priority-queue";
class MedianFinder {
  private left: MaxPriorityQueue<number>; // smaller half
  private right: MinPriorityQueue<number>; // larger half

  constructor() {
    this.left = new MaxPriorityQueue();
    this.right = new MinPriorityQueue();
  }

  addNum(num: number): void {
    this.left.enqueue(num);

    if (
      !this.left.isEmpty() &&
      !this.right.isEmpty() &&
      this.left.front()! > this.right.front()!
    ) {
      const num = this.left.dequeue()!;
      this.right.enqueue(num);
    }

    if (this.left.size() > this.right.size() + 1) {
      const num = this.left.dequeue()!;
      this.right.enqueue(num);
    }

    if (this.right.size() > this.left.size() + 1) {
      const num = this.right.dequeue()!;
      this.left.enqueue(num);
    }
  }

  findMedian(): number {
    if (this.left.size() === this.right.size()) {
      return (this.left.front()! + this.right.front()!) / 2;
    } else {
      return this.left.size() > this.right.size()
        ? this.left.front()!
        : this.right.front()!;
    }
  }
}
