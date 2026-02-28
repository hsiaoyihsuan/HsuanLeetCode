// 54. Spiral Matrix
// Time: O(m x n), Space: O(1)
function spiralOrder(matrix: number[][]): number[] {
  const m = matrix.length;
  const n = matrix[0].length;

  const result: number[] = [];

  let l = 0;
  let r = n - 1;
  let t = 0;
  let b = m - 1;
  while (l <= r && t <= b) {
    for (let i = l; i <= r; i++) {
      result.push(matrix[t][i]);
    }
    for (let i = t + 1; i < b; i++) {
      result.push(matrix[i][r]);
    }
    if (t !== b) {
      for (let i = r; i >= l; i--) {
        result.push(matrix[b][i]);
      }
    }
    if (l !== r) {
      for (let i = b - 1; i > t; i--) {
        result.push(matrix[i][l]);
      }
    }
    l++;
    r--;
    t++;
    b--;
  }

  return result;
}
