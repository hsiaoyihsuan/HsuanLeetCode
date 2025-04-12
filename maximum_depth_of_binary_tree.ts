// 104. Maximum Depth of Binary Tree
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
// My own first try with DFS recursion
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;

  let maxLevel = 0;

  function dfs(node: TreeNode | null, level: number) {
    if (node === null) return;

    maxLevel = Math.max(maxLevel, level);
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }

  dfs(root, 1);

  return maxLevel;
}

// Version 1. DFS Recursion
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;

  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// Version 2. BFS
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;

  const queue = [root];
  let result = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result++;
  }

  return result;
}

// Version 3. DFS Iterative
function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;

  const stack: {node: TreeNode; level: number}[] = [{node: root, level: 1}];
  let result = 0;

  while (stack.length > 0) {
    const {node, level} = stack.pop();
    result = Math.max(result, level);

    if (node.right) stack.push({node: node.right, level: level + 1});
    if (node.left) stack.push({node: node.left, level: level + 1});
  }
  return result;
}
