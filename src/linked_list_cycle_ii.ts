class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 142. Linked List Cycle II
// Time: O(n), Space: O(1)
function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;

  while (slow && fast?.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      let slow2 = head;
      while (slow2 !== slow) {
        slow = slow!.next;
        slow2 = slow2!.next;
      }
      return slow2;
    }
  }

  return null;
}
