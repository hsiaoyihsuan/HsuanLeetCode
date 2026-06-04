// 253. Meeting Rooms II
//
// Method: Sort start/end times separately
//
// Idea:
// - Sort all start times and end times separately
// - If the next meeting starts before the earliest meeting ends, need one more room
// - Otherwise, one meeting has ended and its room can be reused
// - The max active meeting count is the minimum number of rooms needed
//
// Time: O(n log n)
// - sorting dominates the runtime
//
// Space: O(n)
// - store start times and end times separately
function minMeetingRooms(intervals: number[][]): number {
  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);

  let result = 0;
  let count = 0;
  let startIndex = 0;
  let endIndex = 0;
  while (startIndex < starts.length) {
    // Need a new room if the next meeting starts before the earliest end time
    if (starts[startIndex] < ends[endIndex]) {
      startIndex++;
      count++;
    } else {
      // Reuse a room from the meeting that has already ended
      endIndex++;
      count--;
    }
    result = Math.max(result, count);
  }

  return result;
}
