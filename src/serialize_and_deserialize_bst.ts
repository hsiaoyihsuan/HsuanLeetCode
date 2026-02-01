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

/*
 * Encodes a tree to a single string.
 */
function serializeDFS(root: TreeNode | null): string {
  let result: string[] = [];

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

/*
 * Decodes your encoded data to tree.
 */
function deserializeDFS(data: string): TreeNode | null {
  const vals = data.split(",");
  let i = 0;

  function dfs(): TreeNode | null {
    const val = vals[i];

    if (val === "n") return null;

    const node = new TreeNode(Number(val));
    i++;
    node.left = dfs();
    i++;
    node.right = dfs();
    return node;
  }

  const result = dfs();
  return result;
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// TODO: BFS
