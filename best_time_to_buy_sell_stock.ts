// 121. Best Time to Buy and Sell Stock
// Version 1
function maxProfitV1(prices: number[]): number {
  const profits: number[] = [];
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[j] - prices[i] > 0) {
        profits.push(prices[j] - prices[i]);
      }
    }
  }
  if (profits.length === 0) return 0;

  return Math.max(...profits);
}

// Version 2
function maxProfitV2(prices: number[]): number {
  let maxProfit = 0;
  let minPrice = prices[0];
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    }

    if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }
  return maxProfit;
}
