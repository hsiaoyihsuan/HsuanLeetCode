// 124. Binary Tree Maximum Path Sum
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// Method: DFS
//
// Idea:
// - Use DFS to calculate the max path sum each subtree can extend upward
// - At each node, decide whether the best overall path splits through this node
// - The value returned to the parent cannot split; it can only choose one side
// - Ignore negative child sums because they would make the path smaller
//
// Time: O(n)
// - Each node is visited once
//
// Space: O(h)
// - recursion stack depends on tree height
// - skewed tree: O(n)
// - balanced tree: O(log n)
function maxPathSum(root: TreeNode | null): number {
  let result = -Infinity;

  function dfs(node: TreeNode | null): number {
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
