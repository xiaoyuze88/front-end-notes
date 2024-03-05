// https://leetcode.cn/explore/interview/card/bytedance/243/array-and-sorting/1036/
// 省份数量
// 有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。

import { printResult } from "../../utils";

// 省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

// 给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。

// 返回矩阵中 省份 的数量。

 

// 示例 1：


// 输入：isConnected = [[1,1,0],[1,1,0],[0,0,1]]
// 输出：2
// 示例 2：


// 输入：isConnected = [[1,0,0],[0,1,0],[0,0,1]]
// 输出：3
 

// 提示：

// 1 <= n <= 200
// n == isConnected.length
// n == isConnected[i].length
// isConnected[i][j] 为 1 或 0
// isConnected[i][i] == 1
// isConnected[i][j] == isConnected[j][i]
function findCircleNum2(isConnected: number[][]): number {
  // 依次遍历，对每个点 dfs/bfs，已走过的记录
  const n = isConnected.length;

  let count = 0;

  const markMap = {};

  const dfs = (i: number) => {
    const stack = [];

    stack.push(i);

    while (stack.length) {
      const current = stack.pop();

      for (let i = 0; i < n; i++) {
        if (i === current) continue;

        if (isConnected[current][i] && !markMap[i]) {
          markMap[i] = 1;
          stack.push(i);
        }
      }
    }
  };

  //  遍历每条路径，看联通的则dfs查找，已查过的标记上避免重复
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (isConnected[i][j] && !markMap[j]) {
        dfs(i);
        count++;
      }
    }
  }

  return count;
};

function findCircleNum(isConnected: number[][]): number {
  // 依次遍历，对每个点 dfs/bfs，已走过的记录
  const n = isConnected.length;

  let count = 0;

  const markMap = {};

  const dfs = (i: number) => {
    const stack = [];

    stack.push(i);

    while (stack.length) {
      const current = stack.pop();

      for (let i = 0; i < n; i++) {
        if (i === current) continue;

        if (isConnected[current][i] && !markMap[i]) {
          markMap[i] = 1;
          stack.push(i);
        }
      }
    }
  };

  //  遍历每条路径，看联通的则dfs查找，已查过的标记上避免重复
  for (let i = 0; i < n; i++) {
    if (!markMap[i]) {
      dfs(i);
      count++;
    }
  }

  return count;
};

printResult(findCircleNum, [[[1,1,0],[1,1,0],[0,0,1]]], 2);
printResult(findCircleNum, [[[1,0,0],[0,1,0],[0,0,1]]], 3);
