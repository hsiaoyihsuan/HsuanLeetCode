// 1899. Merge Triplets to Form Target Triplet
// Greedy
// Time: O(n), Space(1)
function mergeTriplets(tripletes: number[][], target: number[]): boolean {
  let a = false;
  let b = false;
  let c = false;

  for (const [x, y, z] of tripletes) {
    if (x > target[0] || y > target[1] || z > target[2]) continue;

    if (x === target[0]) a = true;
    if (y === target[1]) b = true;
    if (z === target[2]) c = true;
  }

  return a && b && c;
}
