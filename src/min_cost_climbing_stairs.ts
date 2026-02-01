// 746. Min Cost Climbing Stairs
function minCostClimbingStairs(cost: number[]): number {
  let s1 = cost.at(-2)!;
  let s2 = cost.at(-1)!;
  for (let i = cost.length - 3; i >= 0; i--) {
    const tmp = s1;
    s1 = cost[i] + Math.min(s1, s2);
    s2 = tmp;
  }
  return Math.min(s1, s2);
}
