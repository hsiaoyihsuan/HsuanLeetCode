// 73. Set Matrix Zeroes
// ----------------------
// Problem:
// If an element is 0, set its entire row and column to 0.
//
// Approach 1: Use extra Sets to record which rows and columns must be zeroed.
// Time: O(m * n)
// Space: O(m + n)

function setZeroes(matrix: number[][]): void {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Store row indices that must be zeroed
  const rowsSet = new Set<number>();

  // Store column indices that must be zeroed
  const colsSet = new Set<number>();

  // First pass:
  // Record which rows and columns contain at least one zero
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === 0) {
        rowsSet.add(i);
        colsSet.add(j);
      }
    }
  }

  // Second pass:
  // If current cell belongs to a marked row or column,
  // set it to zero.
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (rowsSet.has(i) || colsSet.has(j)) {
        matrix[i][j] = 0;
      }
    }
  }
}

// Approach 2: Use first row and first column as markers.
// Instead of extra space, reuse the matrix itself.
//
// Time: O(m * n)
// Space: O(1)

function setZeroes2(matrix: number[][]): void {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // These flags are needed because we will overwrite
  // first row and first column as markers.
  let firstRowZero = false;
  let firstColZero = false;

  // Check if first column originally contains zero
  for (let r = 0; r < rows; r++) {
    if (matrix[r][0] === 0) {
      firstColZero = true;
      break;
    }
  }

  // Check if first row originally contains zero
  for (let c = 0; c < cols; c++) {
    if (matrix[0][c] === 0) {
      firstRowZero = true;
      break;
    }
  }

  // Use first row and first column as markers.
  // If matrix[r][c] == 0, mark its row and column.
  for (let r = 1; r < rows; r++) {
    for (let c = 1; c < cols; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0; // mark this row
        matrix[0][c] = 0; // mark this column
      }
    }
  }

  // Zero rows based on markers in first column
  for (let r = 1; r < rows; r++) {
    if (matrix[r][0] === 0) {
      for (let c = 1; c < cols; c++) {
        matrix[r][c] = 0;
      }
    }
  }

  // Zero columns based on markers in first row
  for (let c = 1; c < cols; c++) {
    if (matrix[0][c] === 0) {
      for (let r = 1; r < rows; r++) {
        matrix[r][c] = 0;
      }
    }
  }

  // Finally handle the first row separately
  // because it was used as a marker.
  if (firstRowZero) {
    for (let c = 0; c < cols; c++) {
      matrix[0][c] = 0;
    }
  }

  // Finally handle the first column separately
  if (firstColZero) {
    for (let r = 0; r < rows; r++) {
      matrix[r][0] = 0;
    }
  }
}
