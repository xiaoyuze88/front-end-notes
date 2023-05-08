// 给定一个整数数组 prices，其中 prices[i]表示第 i 天的股票价格 ；整数 fee 代表了交易股票的手续费用。

import { printResult } from "../utils";

// 你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。

// 返回获得利润的最大值。

// 注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。

//

// 示例 1：

// 输入：prices = [1, 3, 2, 8, 4, 9], fee = 2
// 输出：8
// 解释：能够达到的最大利润:
// 在此处买入 prices[0] = 1
// 在此处卖出 prices[3] = 8
// 在此处买入 prices[4] = 4
// 在此处卖出 prices[5] = 9
// 总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8
// 示例 2：

// 输入：prices = [1,3,7,5,10,3], fee = 3
// 输出：6
//

// 提示：

// 1 <= prices.length <= 5 * 104
// 1 <= prices[i] < 5 * 104
// 0 <= fee < 5 * 104

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function maxProfit(prices: number[], fee: number): number {
  /**
   * dp[i][j] 代表第i天(下标从0开始)，手上持有j只股票时的最大利润，j=0/1
   *
   * 考虑 dp[i][0]，有两种case：
   * 1. i-1 天已经没有股票了，即 dp[i][0] = dp[i-1][0]
   * 2. i-1 天有股票，第i天卖了，即 dp[i][0] = dp[i-1][1] + prices[i] - fee
   * 由于求的是最大利润，可以认为：dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i] - fee)
   *
   * 对于 dp[i][1]
   * 1. 第 i-1 天有股票，那么 dp[i][1] = dp[i-1][1]
   * 2. 第 i-1 天没有股票，第 i 天买入，那么 dp[i][1] = dp[i-1][0] - prices[i]
   * dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])
   *
   * 边界条件：
   * dp[0][0] = 0;
   * dp[0][1] = -price[1];
   */

  // const dp = [...Array(prices.length)].map(() => [0, 0]);

  // dp[0][0] = 0;
  // dp[0][1] = -prices[0];

  // for (let i = 1; i < prices.length; i++) {
  //   for (let j = 0; j <= 1; j++) {
  //     if (j === 0) {
  //       dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee);
  //     } else {
  //       dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  //     }
  //   }
  // }

  // return dp[prices.length - 1][0];

  // 仅需要保留上一天的数据即可（i-1天）
  const dp = [...Array(2)].map(() => [0, 0]);

  dp[0][0] = 0;
  dp[0][1] = -prices[0];

  for (let i = 1; i < prices.length; i++) {
    for (let j = 0; j <= 1; j++) {
      if (j === 0) {
        dp[1][0] = Math.max(dp[0][0], dp[0][1] + prices[i] - fee);
      } else {
        dp[1][1] = Math.max(dp[0][1], dp[0][0] - prices[i]);
      }
    }

    dp[0][0] = dp[1][0];
    dp[0][1] = dp[1][1];
  }

  return dp[1][0];
}

printResult(maxProfit, [[1, 3, 2, 8, 4, 9], 2], 8);
printResult(maxProfit, [[1, 3, 7, 5, 10, 3], 3], 6);
