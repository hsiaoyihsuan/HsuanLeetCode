// 621. Task Scheduler
// Max heap
// Time: O(n x log 26), Space: O(26)
import {MinPriorityQueue} from "@datastructures-js/priority-queue";
function leastInterval(tasks: string[], n: number): number {
  const taskMap = new Map<string, number>();
  tasks.forEach((task) => taskMap.set(task, (taskMap.get(task) ?? 0) + 1));
  const taskCounts = Array.from(taskMap).sort((a, b) => b[1] - a[1]);
  let result = 0;

  while (taskCounts[0][1] > 0) {
    let count = 0;
    for (let i = 0; i < taskCounts.length; i++) {
      if (taskCounts[i][1] === 0) continue;

      taskCounts[i][1] = taskCounts[i][1] - 1;
      count++;
      result++;
    }

    if (taskCounts[0][1] === 0) break;

    if (count < n + 1) {
      result += n + 1 - count;
    }
    count = 0;
  }

  return result;
}
