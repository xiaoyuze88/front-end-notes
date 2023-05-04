// n 座城市，从 0 到 n-1 编号，其间共有 n-1 条路线。因此，要想在两座不同城市之间旅行只有唯一一条路线可供选择（路线网形成一颗树）。去年，交通运输部决定重新规划路线，以改变交通拥堵的状况。

import { printResult } from "../utils";

// 路线用 connections 表示，其中 connections[i] = [a, b] 表示从城市 a 到 b 的一条有向路线。

// 今年，城市 0 将会举办一场大型比赛，很多游客都想前往城市 0 。

// 请你帮助重新规划路线方向，使每个城市都可以访问城市 0 。返回需要变更方向的最小路线数。

// 题目数据 保证 每个城市在重新规划路线方向后都能到达城市 0 。

//

// 示例 1：

// 输入：n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
// 输出：3
// 解释：更改以红色显示的路线的方向，使每个城市都可以到达城市 0 。
// 示例 2：

// 输入：n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
// 输出：2
// 解释：更改以红色显示的路线的方向，使每个城市都可以到达城市 0 。
// 示例 3：

// 输入：n = 3, connections = [[1,0],[2,0]]
// 输出：0
//

// 提示：

// 2 <= n <= 5 * 10^4
// connections.length == n-1
// connections[i].length == 2
// 0 <= connections[i][0], connections[i][1] <= n-1
// connections[i][0] != connections[i][1]

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 相当于从0开始遍历，将不朝内的方向都捋过来
function minReorder(n: number, connections: number[][]): number {
  const directionMap: {
    [start: number]: number[];
  } = {};
  const adjacencyMatrix: number[][] = [...Array(n)].map(() => []);

  let count = 0;

  connections.forEach(([start, end]) => {
    if (!directionMap[start]) directionMap[start] = [];

    directionMap[start].push(end);
    adjacencyMatrix[start].push(end);
    adjacencyMatrix[end].push(start);
  });

  const queue = [0];

  const visited = new Set<number>();

  while (queue.length) {
    const currentIndex = queue.shift();

    visited.add(currentIndex);

    adjacencyMatrix[currentIndex].forEach((key) => {
      if (!visited.has(key)) {
        queue.push(key);

        // 有值说明方向是 currentIndex -> key，需要反过来
        if (directionMap[currentIndex]?.includes(key)) {
          count++;
        }
      }
    });
  }

  return count;
}

function minReorder2(n: number, connections: number[][]): number {
  const adjacencyMatrixWithOrder: {
    // 跟i有关的边，带方向，如: { 0: [[0, 3], [4, 0]] }
    [i: number]: number[][];
  } = {};

  let count = 0;

  connections.forEach(([start, end]) => {
    if (!adjacencyMatrixWithOrder[start]) adjacencyMatrixWithOrder[start] = [];
    if (!adjacencyMatrixWithOrder[end]) adjacencyMatrixWithOrder[end] = [];

    adjacencyMatrixWithOrder[start].push([start, end]);
    adjacencyMatrixWithOrder[end].push([start, end]);
  });

  const queue = [0];

  const visited = new Set<number>();

  while (queue.length) {
    const currentKey = queue.shift();

    visited.add(currentKey);

    adjacencyMatrixWithOrder[currentKey].forEach(([start, end]) => {
      // start/end 总有一个等于 currentKey
      // 如果是 start == currentKey，则相当于 currentKey => end，需要反转

      const shouldRevert = start === currentKey;

      let next = shouldRevert ? end : start;

      if (!visited.has(next)) {
        if (shouldRevert) count++;

        queue.push(next);
      }
    });
  }

  return count;
}

printResult(
  minReorder2,
  [
    6,
    [
      [0, 1],
      [1, 3],
      [2, 3],
      [4, 0],
      [4, 5]
    ]
  ],
  3
);
