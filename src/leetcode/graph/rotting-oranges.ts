// 在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：

import { printResult } from "../utils";

// 值 0 代表空单元格；
// 值 1 代表新鲜橘子；
// 值 2 代表腐烂的橘子。
// 每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。

// 返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。

//

// 示例 1：

// 输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
// 输出：4
// 示例 2：

// 输入：grid = [[2,1,1],[0,1,1],[1,0,1]]
// 输出：-1
// 解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个正向上。
// 示例 3：

// 输入：grid = [[0,2]]
// 输出：0
// 解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
//

// 提示：

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 10
// grid[i][j] 仅为 0、1 或 2

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/rotting-oranges
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function orangesRotting(grid: number[][]): number {
  if (!grid.length) return -1;

  // 四个方向的矢量 [y, x] 代表 y/x 轴偏移量
  const vector: [number, number][] = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1]
  ];

  const rottedArray: [number, number][] = [];
  let freshCount = 0;

  grid.forEach((row, y) => {
    row.forEach((status, x) => {
      if (status == 2) {
        rottedArray.push([y, x]);
      } else if (status === 1) {
        freshCount++;
      }
    });
  });

  if (!freshCount) return 0;
  if (!rottedArray.length) return -1;

  const queue = rottedArray.map((item) => ({
    coordinate: item,
    minute: 0
  }));

  let maxMinutes = -1;

  while (queue.length) {
    const {
      coordinate: [y, x],
      minute
    } = queue.shift();

    if (freshCount === 0) {
      return maxMinutes;
    }

    for (let i = 0, l = 4; i < l; i++) {
      const [shiftY, shiftX] = vector[i];

      const nextY = y + shiftY;
      const nextX = x + shiftX;

      const nextStatus = grid?.[nextY]?.[nextX];

      if (nextStatus === 1) {
        freshCount--;
        grid[nextY][nextX] = 2;
        maxMinutes = Math.max(maxMinutes, minute + 1);
        queue.push({
          coordinate: [nextY, nextX],
          minute: minute + 1
        });
      }
    }
  }

  return -1;
}

// printResult(
//   orangesRotting,
//   [
//     [
//       [2, 1, 1],
//       [1, 1, 0],
//       [0, 1, 1]
//     ]
//   ],
//   4
// );

// printResult(
//   orangesRotting,
//   [
//     [
//       [2, 1, 1],
//       [1, 1, 1],
//       [0, 1, 2]
//     ]
//   ],
//   2
// );

printResult(
  orangesRotting,
  [
    [
      [2, 1, 1],
      [0, 1, 1],
      [1, 0, 1]
    ]
  ],
  -1
);
