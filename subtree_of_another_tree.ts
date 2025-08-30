// 572. Subtree of Another Tree

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

/**
 * DFS Approach
 * - Traverse each node in root.
 * - At each node, check if the subtree rooted here is identical to subRoot.
 *
 * Time: O(m * n) in the worst case (m = nodes in root, n = nodes in subRoot).
 * Space: O(h) for recursion stack (h = height of tree).
 */
function isSubtreeDFS(
  root: TreeNode | null,
  subRoot: TreeNode | null
): boolean {
  function isSameTree(a: TreeNode | null, b: TreeNode | null): boolean {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.val !== b.val) return false;
    return isSameTree(a.left, b.left) && isSameTree(a.right, b.right);
  }

  if (!subRoot) return true; // empty subRoot is always a subtree
  if (!root) return false;

  if (root.val === subRoot.val && isSameTree(root, subRoot)) return true;
  return isSubtreeDFS(root.left, subRoot) || isSubtreeDFS(root.right, subRoot);
}

/**
 * BFS Approach
 * - Level-order traverse root.
 * - At each node, check if subtree matches subRoot.
 *
 * Time: O(m * n) in the worst case (similar to DFS).
 * Space: O(w) where w = max width of the tree (queue size).
 */
function isSubtreeBFS(
  root: TreeNode | null,
  subRoot: TreeNode | null
): boolean {
  function isSame(a: TreeNode | null, b: TreeNode | null): boolean {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.val !== b.val) return false;
    return isSame(a.left, b.left) && isSame(a.right, b.right);
  }

  if (!subRoot) return true;
  if (!root) return false;

  const queue: TreeNode[] = [root];
  while (queue.length > 0) {
    const node = queue.shift()!;
    if (node.val === subRoot.val && isSame(node, subRoot)) return true;
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return false;
}
