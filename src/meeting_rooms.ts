// 252. Meeting Rooms
//
// Method: Sorting
//
// Idea:
// - Sort meetings by start time
// - After sorting, only adjacent meetings need to be checked
// - If previous end time is greater than current start time, meetings overlap
//
// Time: O(n log n)
// - sorting dominates the runtime
//
// Space: O(1) or O(n)
// - depends on the sorting implementation
function canAttendMeetings(intervals: number[][]): boolean {
  if (intervals.length <= 1) {
    return true;
  }

  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i - 1][1] > intervals[i][0]) {
      return false;
    }
  }
  return true;
}
