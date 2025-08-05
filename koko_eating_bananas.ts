// 875. Koko Eating Bananas
// Time: O(n log m), Space: O(1)
function minEatingSpeed(piles: number[], h: number): number {
  let left = 1;
  let right = Math.max(...piles);
  let result = right;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const hours = piles.reduce((sum, pile) => sum + Math.ceil(pile / mid), 0);

    if (hours <= h) {
      right = mid - 1;
      result = mid;
    } else {
      left = mid + 1;
    }
  }
  return result;
}

// k -> 11, h -> 4
// k -> 10, h -> 5
// ...
// k -> 5, h -> 10
// k -> ?, h -> 8
// k -> 3, h -> 6
// ...
// k -> 1, h -> 27
