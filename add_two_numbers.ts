// 2. Add Two Numbers
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  let curr1 = l1;
  let curr2 = l2;
  const dummy = new ListNode(0);
  let prev = dummy;
  let carry = 0;

  while (curr1 || curr2 || carry !== 0) {
    const val1 = curr1 ? curr1.val : 0;
    const val2 = curr2 ? curr2.val : 0;
    const sum = val1 + val2 + carry;

    carry = Math.floor(sum / 10);
    const node = new ListNode(sum % 10);

    prev.next = node;
    prev = prev.next;

    if (curr1) curr1 = curr1.next;
    if (curr2) curr2 = curr2.next;
  }

  return dummy.next;
}
