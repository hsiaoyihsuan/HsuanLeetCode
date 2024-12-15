// 19. Remove Nth Node From End of List
// Time: o(n). Space: O(1)
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeNthFromEndV1(head: ListNode | null, n: number): ListNode | null {
  let count = 0;
  let current: ListNode | null = head;
  // First pass: Count the total number of nodes in the list
  while (current) {
    count++;
    current = current.next;
  }

  // If the head node needs to be removed
  if (count === n) {
    return head.next;
  }

  // Second pass: Find the node just before the one to remove
  current = head;
  let stepsToTarget = count - n - 1;
  while(stepsToTarget > 0){
      current = current.next;
      stepsToTarget--;


  // Remove the target node by skipping it
  current.next = current.next.next;

  return head;
}

// Use two pointers to find the node to remove.
// The `left` pointer is positioned just before the target node.
function removeNthFromEndV2(head: ListNode | null, n: number): ListNode | null {
    // Create a dummy node to simplify edge cases (e.g., removing the head node)
    const dummy = new ListNode(0, head);
    let left: ListNode = dummy;
    let right: ListNode | null = head;

    // Move the `right` pointer `n` steps ahead
    while (n > 0 && right) {
        right = right.next;
        n--;
    }

    // Move both pointers until `right` reaches the end of the list
    while (right) {
        left = left.next!;
        right = right.next;
    }

    // Remove the target node by skipping it
    left.next = left.next!.next;

    // Return the updated list, starting at the real head
    return dummy.next;
}
