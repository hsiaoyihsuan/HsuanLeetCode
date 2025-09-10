// 98. Validate Binary Search Tree
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

// DFS. Preorder Traversal
// Time: O(n), Space: O(h)
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

// BFS
// Time: O(n), Space: O(h)
function isValidBST2(root: TreeNode | null) {
  if (!root) return true;

  const queue = [{node: root, left: -Infinity, right: Infinity}];

  while (queue.length > 0) {
    const {node, left, right} = queue.shift()!;
    if (node.val <= left || node.val >= right) return false;

    if (node.left) queue.push({node: node.left, left, right: node.val});
    if (node.right) queue.push({node: node.right, left: node.val, right});
  }

  return true;
}
