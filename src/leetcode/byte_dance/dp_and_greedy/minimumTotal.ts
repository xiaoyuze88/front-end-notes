// 三角形最小路径和
// https://leetcode.cn/explore/interview/card/bytedance/246/dynamic-programming-or-greedy/1030/
// 给定一个三角形 triangle ，找出自顶向下的最小路径和。

import { printResult } from "../../utils";

// 每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。

// 示例 1：

// 输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
// 输出：11
// 解释：如下面简图所示：
//    2
//   3 4
//  6 5 7
// 4 1 8 3
// 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
// 示例 2：

// 输入：triangle = [[-10]]
// 输出：-10

// 提示：

// 1 <= triangle.length <= 200
// triangle[0].length == 1
// triangle[i].length == triangle[i - 1].length + 1
// -104 <= triangle[i][j] <= 104

// 进阶：

// 你可以只使用 O(n) 的额外空间（n 为三角形的总行数）来解决这个问题吗？

/**
 * dp[i][j] 为走到 第i行第j个元素时的最小值
 *
 * 第一个列只能为第一列的合
 * dp[i][0] = dp[i-1][0] + triangle[i][0];
 * 最后一列也只能为最后一列的合
 * dp[i][triangle[i].length - 1] = triangle[i][triangle[i].length - 1]
 *
 * dp[i][j] = Math.min(dp[i-1][j], dp[i-1][j - 1])
 *
 *
 */

function minimumTotal(triangle: number[][]): number {
  if (triangle.length === 1) return triangle[0][0];

  // dp[i][j] 代表第 i 行 第 j 个的最小和
  const dp: number[][] = [[]];

  // 往下只能选j或j+1，反过来就是往上选只能选 j 或者 j - 1
  // 那么当确定 ij 后，它的值必然为 min(dp[i-1][j], dp[i-1][j-1]) + triangle[i][j]
  // dp[i][j] = Math.min(dp[i-1][j], dp[i - 1][j - 1])
  // 边界：
  dp[0][0] = triangle[0][0];

  let min = Number.MAX_SAFE_INTEGER;

  for (let i = 1, l_i = triangle.length; i < l_i; i++) {
    const sumRow = [];

    // console.log(`dp[${i - 1}]`, dp[i - 1]);

    for (let j = 0, l_j = i + 1; j < l_j; j++) {
      const current = triangle[i][j];
      let sum: number;

      // 第一个只能为每一行第一个的合
      if (j === 0) {
        sum = dp[i - 1][j] + current;
      }
      // 最后一个元素也只能是每一行最后一个的合
      else if (j === i) {
        sum = dp[i - 1][j - 1] + current;
      } else {
        sum = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + current;
      }

      if (i === triangle.length - 1) {
        min = Math.min(sum, min);
      }
      sumRow.push(sum);
    }

    dp.push(sumRow);
  }

  // console.log("dp", dp);

  return min;
}

printResult(minimumTotal, [[[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]], 11);
