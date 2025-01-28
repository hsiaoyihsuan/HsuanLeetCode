// 226. Invert Binary Tree
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

// Time: O(n), Space: O(h), skewed tree: h = n, balanced-tree: h = log(n)
function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;

  // Swap the left and right
  const tmp = root.left;
  root.left = root.right;
  root.right = tmp;

  // Invert the left and right subtree
  invertTree(root.left);
  invertTree(root.right);

  return root;
}
