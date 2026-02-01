// 138. Copy List with Random Pointer

class _Node {
  val: number;
  next: _Node | null;
  random: _Node | null;

  constructor(val?: number, next?: _Node, random?: _Node) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
  }
}

// Time: O(n), Space: O(n)
// Use hash map to store nodes
function copyRandomList(head: _Node | null): _Node | null {
  if (!head) return head;

  const oldToNew = new Map<_Node | null, _Node | null>();
  oldToNew.set(null, null);

  let current = head;
  while (current) {
    const copy = new _Node(current.val);
    oldToNew.set(current, copy);
    current = current.next!;
  }

  current = head;
  while (current) {
    const copy = oldToNew.get(current)!;
    const copyNext = oldToNew.get(current.next)!;
    const copyRandom = oldToNew.get(current.random)!;

    copy.next = copyNext;
    copy.random = copyRandom;

    current = current.next!;
  }

  return oldToNew.get(head)!;
}

// Space optimized version
function copyRandomList2(head: _Node | null): _Node | null {
  // TODO:
}
