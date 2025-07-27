class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 143. Reorder List
/**
 Do not return anything, modify head in-place instead.
 */
function reorderList(head: ListNode | null): void {
  if (!head || !head.next) return;

  // Step 1: Find middle
  let slow: ListNode | null = head;
  let fast: ListNode | null = head.next;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse second half
  let prev: ListNode | null = null;
  let current: ListNode | null = slow!.next;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  slow!.next = null; // Cut off the first half

  // Step 3: Merge two halves
  let first = head;
  let second = prev;
  while (first && second) {
    const next1 = first.next;
    const next2 = second.next;

    first.next = second;
    second.next = next1;

    first = next1!;
    second = next2;
  }
}
