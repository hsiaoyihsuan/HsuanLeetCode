// 253. Meeting Rooms II
function minMeetingRooms(intervals: number[][]): number {
  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);

  let result = 0;
  let count = 0;
  let startIndex = 0;
  let endIndex = 0;
  while (startIndex < starts.length) {
    if (starts[startIndex] < ends[endIndex]) {
      startIndex++;
      count++;
    } else {
      endIndex++;
      count--;
    }
    result = Math.max(result, count);
  }

  return result;
}
