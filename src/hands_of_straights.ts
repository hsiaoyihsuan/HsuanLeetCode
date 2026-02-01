// 846. Hand of Straights

// Method 1: Greedy + Counting (Sort keys)
//
// Idea:
// - Count frequency of each card
// - Always try to build sequences starting from the smallest available card
// - If the smallest card cannot form a consecutive group, no solution exists
//
// Time: O(n log n)
// - Sorting unique card values
//
// Space: O(n)
// - Frequency map
function isNStraightHand(hand: number[], groupSize: number): boolean {
  if (hand.length % groupSize !== 0) return false;

  const count = new Map<number, number>();
  hand.forEach((card) => count.set(card, (count.get(card) ?? 0) + 1));

  const cards = Array.from(count.keys()).sort((a, b) => a - b);

  for (const card of cards) {
    const freq = count.get(card)!;
    if (freq === 0) continue;

    // Try to build freq sequences starting from card
    for (let i = 0; i < groupSize; i++) {
      const nextCard = card + i;
      const nextFreq = count.get(nextCard)!;

      if (!nextFreq || nextFreq < freq) return false;

      count.set(nextCard, nextFreq - freq);
    }
  }

  return true;
}

import {MinPriorityQueue} from "@datastructures-js/priority-queue";

// Method 2: Greedy + Counting (Min Heap)
//
// Idea:
// - Use a min heap to always extract the smallest available card
// - For each smallest card, try to form a consecutive group
// - If a card runs out, it must be removed from the heap in correct order
//
// Time: O(n log n)
// - Heap push / pop operations
//
// Space: O(n)
// - Frequency map + heap
function isNStraightHand2(hand: number[], groupSize: number): boolean {
  if (hand.length % groupSize !== 0) return false;

  const count = new Map<number, number>();
  hand.forEach((card) => count.set(card, (count.get(card) ?? 0) + 1));

  const heap = new MinPriorityQueue<number>();
  [...count.keys()].forEach((key) => heap.push(key));

  while (!heap.isEmpty()) {
    const start = heap.front()!;

    // Build one group starting from the smallest card
    for (let i = 0; i < groupSize; i++) {
      const cur = start + i;
      if (!count.has(cur)) return false;

      count.set(cur, count.get(cur)! - 1);

      // If a card is exhausted, it must be removed from the heap
      if (count.get(cur) === 0) {
        if (cur === heap.front()) {
          heap.pop();
        } else {
          return false;
        }
      }
    }
  }

  return true;
}
