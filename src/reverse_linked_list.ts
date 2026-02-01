// 206. Reverse Linked List
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// Interative in place. Time: O(n) Space: O(1)
function reverseList(head: ListNode | null): ListNode | null {
  let newList: ListNode | null = null;
  let current: ListNode | null = head;
  while (current) {
    const next = current.next;
    current.next = newList;
    newList = current;
    current = next;
  }
  return newList;
}

// Recursive in place. Time: O(n) Space: O(n)
function reverseListV2(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;

  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
}
