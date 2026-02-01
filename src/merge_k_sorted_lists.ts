// 23. Merge k Sorted Lists
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/**
 * Helper: merge two sorted linked lists
 */
function merge(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode();
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }
  curr.next = l1 ?? l2;
  return dummy.next;
}

/**
 * Approach 1: Sequential Merge
 * - Merge each list into the result one by one.
 * - This is essentially: (((list1 + list2) + list3) + list4) ...
 *
 * Time Complexity: O(n * k)
 *   - n = total number of nodes across all lists
 *   - k = number of lists
 *   - Each merge may take O(n), repeated k times.
 * Space Complexity: O(1) (only pointers, no extra data structures)
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  let result: ListNode | null = null;
  for (const list of lists) {
    result = merge(result, list);
  }
  return result;
}

/**
 * Approach 2: Recursive Divide & Conquer
 * - Use recursion like merge sort: split into halves and merge back.
 *
 * Time: O(n log k), Space: O(log k) recursion depth
 */
function mergeKLists2(lists: Array<ListNode | null>): ListNode | null {
  if (!lists || lists.length === 0) return null;

  function divideAndMerge(left: number, right: number): ListNode | null {
    if (left > right) return null;
    if (left === right) return lists[left];

    const mid = Math.floor((left + right) / 2);
    const l1 = divideAndMerge(left, mid);
    const l2 = divideAndMerge(mid + 1, right);
    return merge(l1, l2);
  }

  return divideAndMerge(0, lists.length - 1);
}

/**
 * Approach 3: Iterative Divide & Conquer
 * - Merge lists in pairs iteratively until one remains.
 *
 * Time: O(n log k), Space: O(1)
 */
function mergeKLists3(lists: Array<ListNode | null>): ListNode | null {
  if (!lists || lists.length === 0) return null;

  while (lists.length > 1) {
    const merged: Array<ListNode | null> = [];
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      merged.push(merge(l1, l2));
    }
    lists = merged;
  }

  return lists[0];
}
