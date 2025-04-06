// 449. Serialize and Deserialize BST
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

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
  let result = [];

  function dfs(node: TreeNode | null) {
    if (node === null) {
      result.push("N");
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
function deserialize(data: string): TreeNode | null {
  const vals = data.split(",");
  let i = 0;

  function dfs(): TreeNode | null {
    if (vals[i] === "N") {
      i++;
      return null;
    }

    const node = new TreeNode(Number(vals[i]));
    i++;
    node.left = dfs();
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
