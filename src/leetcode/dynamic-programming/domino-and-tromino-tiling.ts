// 有两种形状的瓷砖：一种是 2 x 1 的多米诺形，另一种是形如 "L" 的托米诺形。两种形状都可以旋转。

import { printResult } from "../utils";

// 给定整数 n ，返回可以平铺 2 x n 的面板的方法的数量。返回对 109 + 7 取模 的值。

// 平铺指的是每个正方形都必须有瓷砖覆盖。两个平铺不同，当且仅当面板上有四个方向上的相邻单元中的两个，使得恰好有一个平铺有一个瓷砖占据两个正方形。

//

// 示例 1:

// 输入: n = 3
// 输出: 5
// 解释: 五种不同的方法如上所示。
// 示例 2:

// 输入: n = 1
// 输出: 1
//

// 提示：

// 1 <= n <= 1000

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/domino-and-tromino-tiling
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
const mod = Math.pow(10, 9) + 7;

function numTilings(n: number): number {
  // dp[n] 代表列数为n时的排法，1 <= n <= 1000
  // 依图推导规律，得到状态转移方程：
  // dp[n] = 2dp[n-1] + dp[n-3], n >= 4
  // 边界条件：
  // dp[1] = 1;
  // dp[2] = 2;
  // dp[3] = 4;

  const dp = Array(n + 1).fill(0);

  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 5;

  for (let i = 4; i <= n; i++) {
    dp[i] = (2 * dp[i - 1] + dp[i - 3]) % mod;
  }

  return dp[n];
}

// printResult(numTilings, [4], 11);
// printResult(numTilings, [30], 312342182);
printResult(numTilings, [50], 451995198);
