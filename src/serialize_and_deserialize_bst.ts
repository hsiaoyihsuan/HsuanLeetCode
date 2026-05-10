// 449. Serialize and Deserialize BST
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

// Version 1. Preorder DFS
//
// Idea:
// - Serialize with preorder traversal: root -> left -> right
// - Use "n" as a null marker so deserialize can rebuild the exact shape
//
// Time: O(n)
// Space: O(n)
function serializePreorderDFS(root: TreeNode | null): string {
  const result: string[] = [];

  function dfs(node: TreeNode | null) {
    if (!node) {
      result.push("n");
      return;
    }

    result.push(node.val.toString());
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);

  return result.join(",");
}

function deserializePreorderDFS(data: string): TreeNode | null {
  const preorder: string[] = data.split(",");
  let i = 0;

  function dfs(): TreeNode | null {
    const val = preorder[i];
    i++;
    if (val === "n") return null;

    const root = new TreeNode(Number(val));
    root.left = dfs();
    root.right = dfs();

    return root;
  }

  return dfs();
}

// Version 2. Level-order BFS
//
// Idea:
// - Serialize level by level with a queue
// - Keep "n" null markers for missing children
// - During deserialize, consume values two at a time as left/right children
//
// Time: O(n)
// Space: O(n)
function serializeLevelOrderBFS(root: TreeNode | null): string {
  const result: string[] = [];
  const queue: (TreeNode | null)[] = [root];

  while (queue.length > 0) {
    const node = queue.shift()!;

    if (!node) {
      result.push("n");
      continue;
    }

    result.push(node.val.toString());
    queue.push(node.left);
    queue.push(node.right);
  }

  return result.join(",");
}

function deserializeLevelOrderBFS(data: string): TreeNode | null {
  const values = data.split(",");
  if (values[0] === "n") return null;

  const root = new TreeNode(Number(values[0]));
  const queue: TreeNode[] = [root];
  let i = 1;

  while (queue.length > 0 && i < values.length) {
    const node = queue.shift()!;
    const leftVal = values[i++];
    const rightVal = values[i++];

    if (leftVal !== "n") {
      node.left = new TreeNode(Number(leftVal));
      queue.push(node.left);
    }

    if (rightVal !== "n") {
      node.right = new TreeNode(Number(rightVal));
      queue.push(node.right);
    }
  }

  return root;
}

// LeetCode calls the chosen pair as:
// deserialize(serialize(root));
