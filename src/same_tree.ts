// 100. Same Tree
// Compare two binary trees for structural and value equality.

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// Recursive DFS
// Time: O(n), Space: O(h) where h is tree height (call stack depth)
function isSameTreeDFS(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;
  return isSameTreeDFS(p.left, q.left) && isSameTreeDFS(p.right, q.right);
}

// Iterative DFS (stack-based)
// Time: O(n), Space: O(h)
function isSameTreeDFSIterative(
  p: TreeNode | null,
  q: TreeNode | null
): boolean {
  const stack1: (TreeNode | null)[] = [p];
  const stack2: (TreeNode | null)[] = [q];

  while (stack1.length && stack2.length) {
    const node1 = stack1.pop();
    const node2 = stack2.pop();

    if (!node1 && !node2) continue;
    if (!node1 || !node2) return false;
    if (node1.val !== node2.val) return false;

    // push right before left to mimic recursive preorder order
    stack1.push(node1.right);
    stack1.push(node1.left);
    stack2.push(node2.right);
    stack2.push(node2.left);
  }
  return true;
}

// BFS (queue-based)
// Time: O(n), Space: O(w) where w is max tree width (worst O(n))
function isSameTreeBFS(p: TreeNode | null, q: TreeNode | null): boolean {
  const queue1: (TreeNode | null)[] = [p];
  const queue2: (TreeNode | null)[] = [q];

  while (queue1.length > 0 && queue2.length > 0) {
    const node1 = queue1.shift();
    const node2 = queue2.shift();

    if (!node1 && !node2) continue;
    if (!node1 || !node2) return false;
    if (node1.val !== node2.val) return false;

    queue1.push(node1.left, node1.right);
    queue2.push(node2.left, node2.right);
  }
  return true;
}
