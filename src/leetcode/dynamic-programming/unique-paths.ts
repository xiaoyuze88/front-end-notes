// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

import { printResult } from "../utils";

// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

// 问总共有多少条不同的路径？

//

// 示例 1：

// 输入：m = 3, n = 7
// 输出：28
// 示例 2：

// 输入：m = 3, n = 2
// 输出：3
// 解释：
// 从左上角开始，总共有 3 条路径可以到达右下角。
// 1. 向右 -> 向下 -> 向下
// 2. 向下 -> 向下 -> 向右
// 3. 向下 -> 向右 -> 向下
// 示例 3：

// 输入：m = 7, n = 3
// 输出：28
// 示例 4：

// 输入：m = 3, n = 3
// 输出：6
//

// 提示：

// 1 <= m, n <= 100
// 题目数据保证答案小于等于 2 * 109

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/unique-paths
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function uniquePaths(m: number, n: number): number {
  // dp[i][j] 代表 第 i 行 j 列的走法
  // 状态转移方程：
  // dp[i][j] = dp[i-1][j] + dp[i][j-1] && i >1 && j > 1
  // dp[i][j] = dp[i-1][j] && j == 1
  // dp[i][j] = dp[i][j-1] && i == 1
  // 边界：
  // dp[0][0~n] = 1;
  // dp[0~m][0] = 1;

  const dp = [...Array(m + 1)].map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = 1
  }

  for (let i = 0; i <= n; i++) {
    dp[0][i] = 1
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (j === 1) {
        dp[i][j] = dp[i - 1][j];
      } else if (i === 1) {
        dp[i][j] = dp[i][j - 1];
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[m][n];
}


// printResult(uniquePaths, [2, 2], 2);
printResult(uniquePaths, [3, 7], 28);
