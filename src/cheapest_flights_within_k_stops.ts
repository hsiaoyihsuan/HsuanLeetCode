// 787. Cheapest Flights Within K Stops

// Method: Bellman-Ford (K + 1 Edge Relaxations)
//
// Idea:
// 1. prices[v] = minimum cost to reach city v
// 2. A path with K stops uses at most K + 1 flights (edges)
// 3. Run relaxation for K + 1 rounds
// 4. Use a temp array each round to prevent using updated values
//    in the same iteration (which would allow more than K stops)
//
// Time: O((K + 1) * E)
// Space: O(N)
function findCheapestPrice(
  n: number,
  flights: number[][],
  src: number,
  dst: number,
  k: number,
): number {
  let prices = new Array(n).fill(Infinity);

  prices[src] = 0;

  // We can take at most K stops = K + 1 flights
  // So we relax edges K + 1 times
  for (let i = 0; i < k + 1; i++) {
    // Copy previous round distances
    // This ensures current round only uses results from previous round
    // (critical to enforce stop constraint)
    const tmp = [...prices];

    for (const [from, to, price] of flights) {
      // BUG FIX:
      // Should check whether 'from' city is reachable,
      // not whether 'from' equals Infinity (which is impossible)
      if (prices[from] === Infinity) continue;

      if (prices[from] + price < tmp[to]) {
        tmp[to] = prices[from] + price;
      }
    }

    prices = tmp;
  }

  return prices[dst] === Infinity ? -1 : prices[dst];
}
