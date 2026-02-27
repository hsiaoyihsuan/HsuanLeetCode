// 48. Rotate Image
// Rotate the n x n matrix 90 degrees clockwise in-place.
//
// Idea:
// We rotate the matrix layer by layer (like an onion).
// For each layer, we rotate 4 corresponding cells at a time.
//
// Time: O(n^2)
// Space: O(1)
function rotate(matrix: number[][]): void {
  const n = matrix.length;
  const mid = Math.max((n - 1) / 2);

  for (let i = 0; i <= mid; i++) {
    for (let j = i; j <= n - 2 - i; j++) {
      const tmp = matrix[i][j];

      matrix[i][j] = matrix[n - 1 - j][i];
      matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
      matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
      matrix[j][n - 1 - i] = tmp;

      // (i, j) ex: (0, 1)
      // (j, n - 1 - i) ex: (1, 3)
      // (n - 1 - i, n - 1 - j) ex: (3, 2)
      // (n - 1 - j, i) ex: (2, 0)
    }
  }
}

// m = (0 + n - 1) / 2

// layer 0
// (0, 0) ~ (0, n - 2)
// layer 1
// (1, 1) ~ (1, n - 3)
// ...
// last layer m
// (m, m) ~ (m, n - 2 - m)
