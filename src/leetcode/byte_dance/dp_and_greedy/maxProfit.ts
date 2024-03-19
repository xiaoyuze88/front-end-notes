// 买卖股票的最佳时机
// https://leetcode.cn/explore/interview/card/bytedance/246/dynamic-programming-or-greedy/1042/
// 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

// 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

// 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

// 示例 1：

// 输入：[7,1,5,3,6,4]
// 输出：5
// 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
//      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
// 示例 2：

// 输入：prices = [7,6,4,3,1]
// 输出：0
// 解释：在这种情况下, 没有交易完成, 所以最大利润为 0。

// 提示：

// 1 <= prices.length <= 105
// 0 <= prices[i] <= 104

/**
 * 无非就是成本最低的情况下，利润最大
 * 遍历数组，找到成本最低的一天，同时利润最大的一天
 *
 * let minCost = Number.MAX_SAFE_INTEGER;
 * let maxProfit = 0;
 *
 * for (let i = 0, l = prices.length; i < l; i++) {
 *    minCost = min(minCost, prices[i]);
 *    maxProfit = max(maxProfit, prices[i] - minCost)
 * }
 *
 */

function maxProfit(prices: number[]): number {
  let cost = Number.MAX_SAFE_INTEGER;
  let profit = 0;

  for (let i = 0, l = prices.length; i < l; i++) {
    cost = Math.min(cost, prices[i]);
    profit = Math.max(profit, prices[i] - cost);
  }

  return profit;
}
