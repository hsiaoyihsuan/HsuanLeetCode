// 141. Linked List Cycle
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

// Hash Set Version. Time: O(n), Space: O(n)
function hasCycleV1(head: ListNode | null): boolean {
  const set = new Set();
  let current = head;
  while (current) {
    if (set.has(current)) return true;

    set.add(current);
    current = current.next;
  }
  return false;
}

// Floyd’s Tortoise and Hare Algorithm. Time: O(n), Spcae: O(1)
function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true;
  }
  return false;
}
