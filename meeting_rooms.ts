// 252. Meeting Rooms
// You are given an array of meeting time intervals intervals where intervals[i] = [start, end].
// Determine if a person could attend all meetings.

// Time: O(n log n)
function canAttendMeetings(intervals: number[][]): boolean {
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i - 1][1] > intervals[i][0]) return false;
  }
  return true;
}
