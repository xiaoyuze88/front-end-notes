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

/**
 * 解法一，dfs/bfs，依次对每个元素执行遍历，走过的记录下来避免重复，启动了多少次查询那就是有多少个省份
 *
 * 解法二：交并集
 *
 * 1. 一共n个城市，维护一个长度n的数组，表示当前的队顶，初始情况队顶就是自己
 * 2. 依次遍历矩阵所有城市，当两个城市相连时，分别找到他们的队顶，如果不相同，则合并（另外维护一个rank数组，当小的合入大的后，大的+1）
 * 3. 最后查看一共有多少个队顶
 */
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
}

function findCircleNum1(isConnected: number[][]): number {
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
}

// const unionFind = new UnionFind(
//   [
//     [1, 0, 0, 0, 1, 0],
//     [0, 1, 0, 0, 0, 1],
//     [0, 0, 1, 1, 0, 1],
//     [0, 0, 1, 1, 0, 0],
//     [1, 0, 0, 0, 1, 0],
//     [0, 1, 1, 0, 0, 1],
//   ]
// )

// 并查集
function findCircleNum(isConnected: number[][]): number {
  class UnionFind {
    matrix: number[][];
    // parent[i] 代表第 i 个元素的父节点是哪个，parent[i] = i 表示自己就是自己的父节点
    parent: number[] = [];
    // parent[i] 代表第 i 个元素所在树的高度
    rank: number[] = [];

    constructor(matrix: number[][]) {
      this.matrix = matrix;

      // 初始化，大家都各自为树
      for (let i = 0, l = matrix.length; i < l; i++) {
        this.parent[i] = i;
        this.rank[i] = 1;
      }
    }

    isConnected(i: number, j: number) {
      return !!this.matrix[i][j];
    }

    // 找i元素对应的根节点
    find(i: number) {
      let index = i;

      while (index !== this.parent[index]) {
        // 路径压缩，找到parent的parent，将自己挂上去
        this.parent[index] = this.parent[this.parent[index]];
        index = this.parent[index];
      }

      return index;
    }

    union(i: number, j: number) {
      const rootI = this.find(i);
      const rootJ = this.find(j);

      // console.log({ rootI, rootJ });

      if (rootI === rootJ) return;

      // console.log('this.rank', this.rank);

      // 小的挂到大的下
      if (this.rank[rootI] > this.rank[rootJ]) {
        // console.log('combine j to i', { rootI, rootJ });
        this.parent[rootJ] = rootI;
      } else {
        // console.log('combine i to j', { rootI, rootJ });
        this.parent[rootI] = rootJ;
      }

      const sum = this.rank[rootJ] + this.rank[rootI];

      this.rank[rootI] = this.rank[rootJ] = sum;

      // console.log('after parent', this.parent);
    }

    start() {
      for (let i = 0, l = this.matrix.length; i < l; i++) {
        for (let j = i + 1; j < l; j++) {
          // console.log('current', i, j);

          if (this.isConnected(i, j)) {
            // console.log('isConnected', i, j);
            this.union(i, j);
          }
        }
      }

      const set = new Set();

      this.parent.forEach((i) => {
        set.add(this.find(i));
      });

      // console.log('this.parent', this.parent);

      return set.size;
    }
  }

  const unionFind = new UnionFind(isConnected);

  return unionFind.start();
}

printResult(
  findCircleNum,
  [
    [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
    ],
  ],
  2
);
printResult(
  findCircleNum,
  [
    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
  ],
  3
);
printResult(
  findCircleNum,
  [
    [
      [1, 0, 0, 1],
      [0, 1, 1, 0],
      [0, 1, 1, 1],
      [1, 0, 1, 1],
    ],
  ],
  1
);
