// 最大正方形
// https://leetcode.cn/explore/interview/card/bytedance/246/dynamic-programming-or-greedy/1028/
// 在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。

import { printResult } from "../../utils";

// 示例 1：

// 输入：matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
// 输出：4
// 示例 2：

// 输入：matrix = [["0","1"],["1","0"]]
// 输出：1
// 示例 3：

// 输入：matrix = [["0"]]
// 输出：0

// 提示：

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 300
// matrix[i][j] 为 '0' 或 '1'

/**
 * 解法：
 * 1. dp[i][j] 为 以 ij 为右下角的正方形的边长
 * 2. dp[i][j] = min(dp[i-1][j], dp[i-1][j-1], dp[i][j-1]) + 1, matrix[i][j] == 1
 * 3. 返回 dp 中的最大值
 */

function maximalSquare(matrix: string[][]): number {
  const lengthY = matrix.length;
  const lengthX = matrix[0].length;

  if (lengthY === lengthX && lengthX === 1) {
    return matrix[0][0] === "1" ? 1 : 0;
  }

  //
  const dp: number[][] = Array(lengthY)
    .fill(undefined)
    .map(() => Array(lengthX).fill(0));

  let maxSideLength = 0;

  for (let x = 0; x < lengthX; x++) {
    for (let y = 0; y < lengthY; y++) {
      if (x === 0 || y === 0) {
        dp[y][x] = +matrix[y][x];
      } else {
        // console.log("current dp", dp);
        // console.log("y, x", y, x, matrix[y][x]);

        // 如果当前为1，那么最大边长等于上、左、左上的取值的最小值+1，
        if (matrix[y][x] === "1") {
          dp[y][x] = Math.min(dp[y - 1][x], dp[y - 1][x - 1], dp[y][x - 1]) + 1;
        }
        // 如果当前为0，那么最大边长等于上、左、左上的取值的最大值，
        else {
          // dp[y][x] = Math.max(dp[y - 1][x], dp[y - 1][x - 1], dp[y][x - 1]);
        }

        // console.log(`dp[${y}][${x}] = `, dp[y][x]);
        // console.log("after dp", dp);
      }

      maxSideLength = Math.max(dp[y][x], maxSideLength);
    }
  }

  return maxSideLength * maxSideLength;
  // return maxSideLength * maxSideLength;
}

// printResult(
//   maximalSquare,
//   [
//     [
//       ["1", "0", "1", "0", "0"],
//       ["1", "0", "1", "1", "1"],
//       ["1", "1", "1", "1", "1"],
//       ["1", "0", "0", "1", "0"],
//       // ["1", "1", "1", "1", "1"],
//       // ["1", "1", "1", "1", "1"],
//       // ["1", "1", "1", "1", "1"],
//       // ["1", "1", "1", "1", "1"],
//     ],
//   ],
//   4
// );

printResult(
  maximalSquare,
  [
    [
      ["0", "1"],
      ["1", "0"],
    ],
  ],
  1
);
