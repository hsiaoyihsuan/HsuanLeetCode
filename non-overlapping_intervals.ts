// 435. Non-overlapping Intervals
// Time: O(n log n). Space: O(1)
// Sort the intervals by their start time
// Loop the intervals and check if the current interval overlaps with the previous one
// If it does, we need to erase one of them
// We can erase the one with the larger end time
function eraseOverlapIntervals(intervals: number[][]): number {
  intervals.sort((a, b) => a[0] - b[0]);
  let count = 0;
  let prevEnd = intervals[0][1];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= prevEnd) {
      prevEnd = intervals[i][1];
    } else {
      prevEnd = Math.min(prevEnd, intervals[i][1]);
      count++;
    }
  }
  return count;
}
