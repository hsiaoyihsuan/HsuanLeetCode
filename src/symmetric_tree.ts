// 101. Symmetric Tree
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// BFS, Iterative Solution. Time and Space: O(n)
// This approach is more robust for deep or unbalanced trees, providing stability by avoiding potential stack overflow issues common in deep recursion.
function isSymmetricV1(root: TreeNode | null): boolean {
  if (root === null) return true;

  const queue: (TreeNode | null)[] = [root.left, root.right];

  while (queue.length > 0) {
    const left = queue.shift();
    const right = queue.shift();

    if (left === null && right === null) continue;
    if (left === null || right === null || left.val !== right.val) return false;

    queue.push(left.left, right.right);
    queue.push(left.right, right.left);
  }
  return true;
}

// BFS, Recursive Solution. Time: O(n), Space: O(h)
// This solution is suitable for balanced tree, and it's more readable
function isSymmetricV2(root: TreeNode | null): boolean {
  if (root === null) return true;

  function isMirror(left: TreeNode | null, right: TreeNode | null): boolean {
    if (left === null && right === null) return true;
    if (left === null || right === null || left.val !== right.val) return false;
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  }

  return isMirror(root.left, root.right);
}
