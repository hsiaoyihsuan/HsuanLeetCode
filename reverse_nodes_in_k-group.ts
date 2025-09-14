// 25. Reverse Nodes in k-Group
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/*
Approach:
- Use a dummy node to simplify edge cases.
- Traverse the list while counting nodes.
- Every time we reach k nodes:
  - Reverse the k nodes starting from prev.next.
  - Connect the reversed group back to the main list.
  - Move prev to the end of the reversed group.
- If the remaining nodes are fewer than k, leave them as is.

Helper:
- reverse(head, k): reverses k nodes starting at head and returns the new head.

Complexity:
- Time: O(n), each node is visited and reversed exactly once.
- Space: O(1), in-place reversal without extra data structures.
*/
function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  function reverse(head: ListNode | null, k: number): ListNode | null {
    let newHead: ListNode | null = null;
    let curr = head;
    let count = 0;

    while (curr && count < k) {
      const next = curr.next;
      curr.next = newHead;
      newHead = curr;
      curr = next;
      count++;
    }

    return newHead;
  }

  const dummy = new ListNode(0, head);
  let prev = dummy;
  let curr = head;
  let count = 0;

  while (curr) {
    count++;
    const next = curr.next;

    if (count === k) {
      const newHead = reverse(prev.next, k); // new head of reversed group
      const newTail = prev.next!; // old head becomes tail
      newTail.next = next; // connect tail to next group
      prev.next = newHead; // connect prev to new head
      prev = newTail; // move prev forward
      count = 0;
    }

    curr = next;
  }

  return dummy.next;
}
