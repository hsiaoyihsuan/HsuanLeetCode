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

// Method: DFS
//
// Idea:
// - preorder: root -> left -> right
// - inorder:  left -> root -> right
// - First value in preorder is always the root
// - Find root position in inorder to split left/right subtree
//
// Time: O(n²)
// - Each recursive call searches inorder linearly
//
// Space: O(h)
// - recursion stack
// - skewed tree: O(n)
// - balanced tree: O(log n)
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  if (preorder.length === 0 || inorder.length === 0) return null;

  const root = new TreeNode(preorder[0]);
  const mid = inorder.indexOf(root.val);
  root.left = buildTree(preorder.slice(1, 1 + mid), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(1 + mid), inorder.slice(1 + mid));
  return root;
}

// Method: DFS + Hash Map
//
// Idea:
// - Values are unique, so map each inorder value to its index
// - Keep a preorder index to visit roots in preorder order
// - Use left/right boundaries in inorder to describe the current subtree
// - For each root, split inorder into left and right subtree ranges
//
// Time: O(n)
// - Build the map once
// - Each node is visited once
//
// Space: O(n)
// - Hash map stores every inorder value
// - recursion stack
// - skewed tree: O(n)
// - balanced tree: O(log n)
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
