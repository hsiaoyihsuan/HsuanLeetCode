// 621. Task Scheduler
// Max heap
// Time: O(n x log 26), Space: O(26)
import {MaxPriorityQueue} from "@datastructures-js/priority-queue";
function leastInterval(tasks: string[], n: number): number {
  const freq: Record<string, number> = {};
  for (const task of tasks) {
    freq[task] = (freq[task] ?? 0) + 1;
  }

  const heap = MaxPriorityQueue.fromArray(Object.values(freq));
  const queue: number[][] = [];

  let time = 0;
  while (heap.size() > 0 || queue.length > 0) {
    time++;

    if (heap.size() > 0) {
      let task = heap.dequeue()!;
      task--;

      if (task > 0) {
        queue.push([task, time + n]);
      }
    }

    if (queue.length > 0 && queue[0][1] === time) {
      const [task, _] = queue.shift()!;
      heap.enqueue(task);
    }
  }

  return time;
}
