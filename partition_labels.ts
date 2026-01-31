// 763. Partition Labels
// Greedy
//
// Idea:
// - Record last occurrence index of each character
// - Expand current partition's end while scanning
// - Cut partition when current index reaches end
//
// Time: O(n)
// Space: O(1) (26 letters)
function partitionLabels(s: string): number[] {
  const end = new Map<string, number>();
  for (let i = 0; i < s.length; i++) {
    end.set(s[i], i);
  }

  const result: number[] = [];

  let left = 0;
  let right = 0;

  for (let i = 0; i < s.length; i++) {
    right = Math.max(right, end.get(s[i])!);

    if (i === right) {
      result.push(right - left + 1);
      left = i + 1;
      right = i + 1;
    }
  }

  return result;
}
