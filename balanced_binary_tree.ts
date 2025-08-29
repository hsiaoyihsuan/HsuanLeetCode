// 110. Balanced Binary Tree
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

// DFS approach
// Time: O(n), each node visited once
// Space: O(h), recursion stack (h = tree height)
function isBalanced(root: TreeNode | null): boolean {
  // Returns both height and balanced status of the subtree
  function dfs(node: TreeNode | null): {height: number; balanced: boolean} {
    if (!node) return {height: 0, balanced: true};

    const left = dfs(node.left);
    const right = dfs(node.right);

    // Current node is balanced if:
    // 1. Left and right subtrees are balanced
    // 2. Height difference ≤ 1
    const balanced =
      left.balanced &&
      right.balanced &&
      Math.abs(left.height - right.height) <= 1;

    // Return height only if subtree is balanced, otherwise height can be arbitrary
    return {
      height: balanced ? 1 + Math.max(left.height, right.height) : 0,
      balanced,
    };
  }

  return dfs(root).balanced;
}

// TODO: DFS Iterative
