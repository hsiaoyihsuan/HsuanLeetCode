// 543. Diameter of Binary Tree
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

// DFS.
// Time: O(n), Space: O(h)
function diameterOfBinaryTree(root: TreeNode | null): number {
  let result = 0;

  function height(root: TreeNode | null): number {
    if (!root) return 0;

    const left = height(root.left);
    const right = height(root.right);
    result = Math.max(result, left + right);

    return Math.max(left, right) + 1;
  }

  height(root);

  return result;
}

// TODO: Iterative DFS
