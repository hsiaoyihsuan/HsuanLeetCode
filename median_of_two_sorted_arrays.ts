// 4. Median of Two Sorted Arrays
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let A = nums1;
  let B = nums2;

  if (A.length > B.length) [A, B] = [B, A];

  const total = A.length + B.length;
  const half = Math.floor(total / 2);

  let left = 0;
  let right = A.length;

  while (left <= right) {
    const i = Math.floor((left + right) / 2);
    const j = half - i;

    const Aleft = i > 0 ? A[i - 1] : -Infinity;
    const Aright = i < A.length ? A[i] : Infinity;
    const Bleft = j > 0 ? B[j - 1] : -Infinity;
    const Bright = j < B.length ? B[j] : Infinity;

    if (Aleft <= Bright && Bleft <= Aright) {
      if (total % 2 === 1) {
        return Math.min(Aright, Bright);
      } else {
        return (Math.max(Aleft, Bleft) + Math.min(Aright, Bright)) / 2;
      }
    } else if (Aleft > Bright) {
      right = i - 1;
    } else {
      left = i + 1;
    }
  }

  throw new Error("Input arrays are not sorted");
}

function findMedianSortedArrays2(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1); // always binary search on the smaller array
  }

  const m = nums1.length;
  const n = nums2.length;
  let left = 0;
  let right = m;

  while (left <= right) {
    const partition1 = Math.floor((left + right) / 2);
    const partition2 = Math.floor((m + n + 1) / 2) - partition1;

    const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
    const minRight1 = partition1 === m ? Infinity : nums1[partition1];

    const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];
    const minRight2 = partition2 === n ? Infinity : nums2[partition2];

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      if ((m + n) % 2 === 0) {
        return (
          (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2
        );
      } else {
        return Math.max(maxLeft1, maxLeft2);
      }
    } else if (maxLeft1 > minRight2) {
      right = partition1 - 1;
    } else {
      left = partition1 + 1;
    }
  }

  throw new Error("Input arrays are not sorted");
}

// Example usage:
console.log(findMedianSortedArrays([1, 3], [2])); // 2.0
console.log(findMedianSortedArrays([1, 2], [3, 4])); // 2.5
