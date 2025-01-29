// 98. Validate Binary Search Tree
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

// Time: O(n). Space: O(h). Preorder Traversal.
function isValidBST(root: TreeNode | null): boolean {
  function isValid(node: TreeNode | null, left: number, right: number) {
    if (!node) return true;

    if (node.val <= left || node.val >= right) return false;

    return (
      isValid(node.left, left, node.val) && isValid(node.right, node.val, right)
    );
  }

  return isValid(root, -Infinity, Infinity);
}
