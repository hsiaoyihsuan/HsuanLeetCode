// 23. Merge k Sorted Lists
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// The first try list merge sort
// Time: n * k
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  function merge(
    list1: ListNode | null,
    list2: ListNode | null
  ): ListNode | null {
    let left = list1;
    let right = list2;
    let result = new ListNode();
    let current = result;
    while (left && right) {
      if (left.val < right.val) {
        current.next = left;
        left = left.next;
      } else {
        current.next = right;
        right = right.next;
      }
      current = current.next;
    }
    if (left) current.next = left;
    if (right) current.next = right;
    return result.next;
  }

  let result: ListNode | null = null;
  for (let i = 0; i < lists.length; i++) {
    result = merge(result, lists[i]);
  }
  return result;
}

// Time: n * log(k)
function mergeKLists2(lists: Array<ListNode | null>): ListNode | null {
  function merge(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let result = new ListNode();
    let current = result;

    while (l1 && l2) {
      if (l1.val < l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }
      current = current.next;
    }

    current.next = l1 ?? l2;
    return result.next;
  }

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
