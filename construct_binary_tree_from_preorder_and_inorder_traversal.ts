// 105. Construct Binary Tree from Preorder and Inorder Traversal
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

// DFS
// TIme: O(n^2), Space: O(n)
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (!preorder.length || !inorder.length) return null;

  const rootVal = preorder[0];
  const rootIndex = inorder.indexOf(rootVal);
  const leftTree = buildTree(
    preorder.slice(1, rootIndex + 1),
    inorder.slice(0, rootIndex)
  );
  const rightTree = buildTree(
    preorder.slice(rootIndex + 1),
    inorder.slice(rootIndex + 1)
  );

  return new TreeNode(rootVal, leftTree, rightTree);
}

// DFS + Hash Map
// Time: O(n), Space: O(n)
function buildTree2(preorder: number[], inorder: number[]) {
  const map = new Map();
  inorder.forEach((val, i) => map.set(val, i));

  let preIndex = 0;

  function dfs(left: number, right: number): TreeNode | null {
    if (left > right) return null;

    const rootVal = preorder[preIndex++];
    const root = new TreeNode(rootVal);

    const mid = map.get(rootVal);
    root.left = dfs(left, mid - 1);
    root.right = dfs(mid + 1, right);

    return root;
  }

  return dfs(0, preorder.length - 1);
}
