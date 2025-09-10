// 1448. Count Good Nodes in Binary Tree
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

function goodNodes(root: TreeNode | null): number {
  function dfs(root: TreeNode | null, max: number): number {
    if (!root) return 0;

    let count = 0;
    if (root.val >= max) count++;
    count += dfs(root.left, Math.max(max, root.val));
    count += dfs(root.right, Math.max(max, root.val));
    return count;
  }

  return dfs(root, -Infinity);
}
