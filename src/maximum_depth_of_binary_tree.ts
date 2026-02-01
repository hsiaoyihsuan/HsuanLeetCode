// 104. Maximum Depth of Binary Tree
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

// Version 1. DFS Recursion
function maxDepthDFS(root: TreeNode | null): number {
  if (root === null) return 0;

  return 1 + Math.max(maxDepthDFS(root.left), maxDepthDFS(root.right));
}

// Version 2. BFS
function maxDepthBFS(root: TreeNode | null): number {
  if (root === null) return 0;

  const queue = [root];
  let result = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result++;
  }

  return result;
}

// Version 3. DFS Iterative
function maxDepthDFSIterative(root: TreeNode | null): number {
  if (root === null) return 0;

  const stack: {node: TreeNode; level: number}[] = [{node: root, level: 1}];
  let result = 0;

  while (stack.length > 0) {
    const {node, level} = stack.pop()!;
    result = Math.max(result, level);

    if (node.right) stack.push({node: node.right, level: level + 1});
    if (node.left) stack.push({node: node.left, level: level + 1});
  }
  return result;
}
