// 853. Car Fleet
// Time: O(n log n), Space: O(n)
// Strategy: Sort + Stack
// 1. Pair each car with its time to reach the target.
// 2. Sort cars by position in descending order (farthest from target first).
// 3. Use a stack to track fleets:
//    - A car forms a new fleet only if it cannot catch up to the one ahead.
function carFleet(target: number, position: number[], speed: number[]): number {
  const cars: {pos: number; time: number}[] = position
    .map((pos, i) => ({pos, time: (target - pos) / speed[i]}))
    .sort((a, b) => b.pos - a.pos); // Sort by position descending

  const fleets: {pos: number; time: number}[] = [];

  for (const car of cars) {
    // If this car takes longer, it can't catch up → new fleet
    if (fleets.length === 0 || car.time > fleets.at(-1)!.time) {
      fleets.push(car);
    }
    // Else, it merges into the fleet ahead (do nothing)
  }

  return fleets.length;
}
