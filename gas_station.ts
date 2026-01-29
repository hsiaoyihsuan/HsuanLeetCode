// 134. Gas Station
// Greedy
// Time: O(n), Space: O(1)
function canCompleteCircuit(gas: number[], cost: number[]): number {
  const sum = gas.reduce((a, b) => a + b, 0) - cost.reduce((a, b) => a + b, 0);
  if (sum < 0) return -1;

  let result = 0;
  let total = 0;

  for (let i = 0; i < gas.length; i++) {
    total = total + gas[i] - cost[i];
    if (total < 0) {
      total = 0;
      result = i + 1;
    }
  }

  return result;
}
