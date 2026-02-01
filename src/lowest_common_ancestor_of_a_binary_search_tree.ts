// 235. Lowest Common Ancestor of a Binary Search Tree
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

// Recursive
// Time: O(h), Space: O(h)
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  if (p!.val < root!.val && q!.val < root!.val) {
    return lowestCommonAncestor(root!.left, p, q);
  } else if (p!.val > root!.val && q!.val > root!.val) {
    return lowestCommonAncestor(root!.right, p, q);
  } else {
    return root;
  }
}

// Iteragive
// Time: O(h), Space: O(1)
function lowestCommonAncestor2(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  let current = root;

  while (current) {
    if (p!.val < current.val && q!.val < current.val) {
      current = current.left;
    } else if (p!.val > current.val && q!.val > current.val) {
      current = current.right;
    } else {
      return current;
    }
  }

  return null;
}
