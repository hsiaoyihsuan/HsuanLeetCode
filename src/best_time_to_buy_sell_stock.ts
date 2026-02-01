// 121. Best Time to Buy and Sell Stock
// Brute Force
// Time: O(n ^ 2), Space: O(1)
function maxProfit1(prices: number[]): number {
  let result = 0;
  for (let i = 0; i < prices.length; i++) {
    let buy = prices[i];
    for (let j = i + 1; j < prices.length; j++) {
      let sell = prices[j];
      result = Math.max(result, sell - buy);
    }
  }
  return result;
}

// Two pointers
// Time: O(n), Space: O(1)
function maxProfit2(prices: number[]): number {
  let left = 0;
  let right = 1;
  let maxProfit = 0;
  while (left < prices.length && right < prices.length) {
    if (prices[right] > prices[left]) {
      maxProfit = Math.max(maxProfit, prices[right] - prices[left]);
    } else if (prices[right] < prices[left]) {
      left = right;
    }
    right++;
  }
  return maxProfit;
}
