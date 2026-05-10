// 543. Diameter of Binary Tree
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func diameterOfBinaryTree(root *TreeNode) int {
	result := 0

	var height func(node *TreeNode) int
	height = func(node *TreeNode) int {
		if node == nil {
			return 0
		}

		leftHeight := height(node.Left)
		rightHeight := height(node.Right)
		result = max(result, leftHeight+rightHeight)

		return max(leftHeight, rightHeight) + 1
	}

	height(root)

	return result
}
