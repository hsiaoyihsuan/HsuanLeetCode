// 230. Kth Smallest Element in a BST
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

// First try. Loop the whole BST with Time: O(N)
function kthSmallest(root: TreeNode | null, k: number): number {
  const vals: number[] = [];

  function dfs(node: TreeNode | null) {
    if (!node) return;

    dfs(node.left);
    vals.push(node.val);
    dfs(node.right);
  }

  dfs(root);

  return vals[k - 1];
}

// Follow up:
// If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?

// Recursive in-order DFS traverses the entire tree and collects all values before returning the result.
// In contrast, iterative in-order DFS allows you to return immediately once the kth smallest element is found, making it more efficient for this use case.
function kthSmallestIterative(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let current: TreeNode | null = root;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop()!;
    k--;
    if (k === 0) return current.val;

    current = current.right;
  }
  return -1;
}
