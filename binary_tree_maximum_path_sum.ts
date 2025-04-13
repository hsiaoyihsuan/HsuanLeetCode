// 124. Binary Tree Maximum Path Sum
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

// Time & Space: O(n)
// Use DFS to calculate the left and right subtree's max value
// We can decide if with split at the current not or not
// The subtree should only return the max value without split
function maxPathSum(root: TreeNode | null): number {
  let result = -Infinity;

  function dfs(node: TreeNode | null) {
    if (node === null) return 0;

    // Get max path sum from left and right children (ignore negatives)
    const leftMax = Math.max(0, dfs(node.left));
    const rightMax = Math.max(0, dfs(node.right));

    // Update the max if split at this node
    const splitValue = node.val + leftMax + rightMax;
    result = Math.max(result, splitValue);

    // Return max if not split from current node
    return node.val + Math.max(leftMax, rightMax);
  }

  dfs(root);

  return result;
}
