// https://leetcode.cn/explore/interview/card/bytedance/243/array-and-sorting/1034/
// 岛屿的最大面积
// 给你一个大小为 m x n 的二进制矩阵 grid 。

import { printResult } from "../../utils";

// 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。

// 岛屿的面积是岛上值为 1 的单元格的数目。

// 计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。

// 示例 1：

// 输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
// 输出：6
// 解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
// 示例 2：

// 输入：grid = [[0,0,0,0,0,0,0,0]]
// 输出：0

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 50
// grid[i][j] 为 0 或 1

// 四个合法的位移
const directions = [
  {
    y: -1,
    x: 0,
  },
  {
    y: 0,
    x: -1,
  },
  {
    y: 0,
    x: 1,
  },
  {
    y: 1,
    x: 0,
  },
];

function maxAreaOfIsland(grid: number[][]): number {
  let x = 0;
  let y = 0;

  const x_len = grid[0].length;
  const y_len = grid.length;

  const record = {};

  let maxSize = 0;

  let stack = [];
  let islandRecord = [];

  const search = (y: number, x: number) => {};

  // while (y <= y_len) {
  //   while (x <= x_len) {

  //   }
  // }

  for (let y = 0; y < y_len; y++) {
    for (let x = 0; x < x_len; x++) {
      const key = `${y}|${x}`;

      console.log("checking key", key);

      if (!record[key]) {
        record[key] = true;

        if (grid[y][x]) {
          // console.log("recording", key);
          stack.push(key);
          islandRecord.push(key);

          while (stack.length) {
            // console.log("stack", stack);

            const current = stack.pop();

            const [currentY, currentX] = current.split("|");

            // 搜索四个方向，找到的推入
            for (let d_i = 0, d_l = directions.length; d_i < d_l; d_i++) {
              const { x, y } = directions[d_i];

              const nextY = +currentY + y;
              const nextX = +currentX + x;

              console.log("next", { nextY, nextX });

              if (grid?.[nextY]?.[nextX]) {
                const nextKey = `${nextY}|${nextX}`;

                if (!record[nextKey]) {
                  console.log("recording", nextKey);
                  record[nextKey] = true;
                  stack.push(nextKey);
                  islandRecord.push(nextKey);
                }
              }
            }
          }

          // console.log("done searching", islandRecord);

          // 结束搜索，统计面积
          if (maxSize < islandRecord.length) {
            maxSize = islandRecord.length;
          }

          islandRecord = [];
          stack = [];
        }
      } else {
        // console.log("recorded ignore", key);
      }
    }
  }

  return maxSize;
}

printResult(
  maxAreaOfIsland,
  [
    [
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    ],
  ],
  6
);
