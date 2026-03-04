// 2013. Detect Squares
//
// Idea:
// - Store all added points and their counts (because duplicates are allowed).
// - For a query point (x1, y1), we try to form a square where
//   (x1, y1) is one corner.
// - The square must be axis-aligned.
//
// Strategy:
// - Fix the vertical edge by selecting another point (x1, y2)
//   on the same column (same x).
// - The side length of the square is d = y2 - y1.
// - The other two corners must be:
//      (x2, y1) and (x2, y2)
//   where x2 = x1 + d  or  x2 = x1 - d.
//
// - Multiply the counts of the three other corners to get
//   the number of possible squares.
//
// Time:
// - add: O(1)
// - count: O(k) where k = number of distinct y values at x1
//
// Space: O(P) where P = number of distinct points stored
class DetectSquares {
  xMap: Map<number, Set<number>> = new Map();
  pointCount: Map<string, number> = new Map();

  constructor() {}

  add(point: number[]): void {
    const [x, y] = point;
    if (!this.xMap.has(x)) {
      this.xMap.set(x, new Set<number>());
    }
    this.xMap.get(x)!.add(y);

    const key = `${x}#${y}`;
    this.pointCount.set(key, (this.pointCount.get(key) ?? 0) + 1);
  }

  count(point: number[]): number {
    const [x1, y1] = point;

    const xCol = this.xMap.get(x1);
    if (!xCol) return 0;

    let count = 0;

    for (const y2 of xCol) {
      if (y1 === y2) continue;

      const d = y2 - y1;

      let x2 = x1 + d;
      count +=
        (this.pointCount.get(`${x1}#${y2}`) ?? 0) *
        (this.pointCount.get(`${x2}#${y1}`) ?? 0) *
        (this.pointCount.get(`${x2}#${y2}`) ?? 0);

      x2 = x1 - d;
      count +=
        (this.pointCount.get(`${x1}#${y2}`) ?? 0) *
        (this.pointCount.get(`${x2}#${y1}`) ?? 0) *
        (this.pointCount.get(`${x2}#${y2}`) ?? 0);
    }

    return count;
  }
}
