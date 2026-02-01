// 57. Insert Interval
// Linear search. Time: O(n), Space: O(1)
function insert(intervals: number[][], newInterval: number[]): number[][] {
  const result: number[][] = [];

  let inserted = false;
  for (const [start, end] of intervals) {
    if (end < newInterval[0]) {
      result.push([start, end]);
    } else if (start > newInterval[1]) {
      if (!inserted) {
        result.push(newInterval);
        inserted = true;
      }
      result.push([start, end]);
    } else {
      newInterval[0] = Math.min(start, newInterval[0]);
      newInterval[1] = Math.max(end, newInterval[1]);
    }
  }

  if (!inserted) result.push(newInterval);

  return result;
}
