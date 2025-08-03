// 74. Search a 2D Matrix
// Binary search
// Time: O(log m + log n), Space(1)
function searchMatrix1(matrix: number[][], target: number): boolean {
  function isTargetInRow(row: number[], target: number): boolean {
    let left = 0;
    let right = row.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (row[mid] < target) {
        left = mid + 1;
      } else if (row[mid] > target) {
        right = mid - 1;
      } else {
        return true;
      }
    }
    return false;
  }

  let m = matrix.length;
  let n = matrix[0].length;

  let left = 0;
  let right = m - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (matrix[mid][0] > target) {
      right = mid - 1;
    } else if (matrix[mid][n - 1] < target) {
      left = mid + 1;
    } else {
      return isTargetInRow(matrix[mid], target);
    }
  }
  return false;
}

// Binary search
// Time: O(log (m x n)), Space(1)
function searchMatrix2(matrix: number[][], target: number): boolean {
  let m = matrix.length;
  let n = matrix[0].length;

  let left = 0;
  let right = m * n - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    if (matrix[row][col] < target) {
      left = mid + 1;
    } else if (matrix[row][col] > target) {
      right = mid - 1;
    } else {
      return true;
    }
  }
  return false;
}
