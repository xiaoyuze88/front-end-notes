// 合并区间
// https://leetcode.cn/explore/interview/card/bytedance/243/array-and-sorting/1046/
// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

import { printResult } from "../../utils";
import { data } from "./merge_data";

// 示例 1：

// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 示例 2：

// 输入：intervals = [[1,4],[4,5]]
// 输出：[[1,5]]
// 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。

// 提示：

// 1 <= intervals.length <= 104
// intervals[i].length == 2
// 0 <= starti <= endi <= 104

/**
 * 交并集
 * 1. max(start) < min(end) 判断是否相交
 * 2. 通过交并集找到所有相交的区间
 * 3. 返回
 */
function merge(intervals: number[][]): number[][] {
  const parent: number[] = [];
  const rank: number[] = [];

  const size = intervals.length;

  const hasOverlap = (i: number, j: number) => {
    const [startI, endI] = intervals[i];
    const [startJ, endJ] = intervals[j];

    return Math.max(startI, startJ) <= Math.min(endI, endJ);
  };

  for (let i = 0, l = intervals.length; i < l; i++) {
    parent[i] = i;
    rank[i] = 1;
  }

  const find = (i: number) => {
    let index = i;

    while (index !== parent[index]) {
      parent[index] = parent[parent[index]];
      index = parent[index];
    }

    return index;
  };

  const union = (x: number, y: number) => {
    const xRoot = find(x);
    const yRoot = find(y);

    // rank 标志了某个集合的度量，每当两个树被合并且度量一样时，合入的一方，rank+1
    if (rank[xRoot] > rank[yRoot]) {
      parent[yRoot] = xRoot;
    } else if (rank[xRoot] < rank[yRoot]) {
      parent[xRoot] = yRoot;
    } else {
      // 这里顺序其实不重要，但是要将合入一方的rank+1
      parent[xRoot] = yRoot;

      rank[yRoot]++;
    }
  };

  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      if (hasOverlap(i, j)) {
        union(i, j);
      }
    }
  }

  const map: {
    [key: string]: [number, number];
  } = {};

  parent.forEach((i, index) => {
    i = find(i);

    const [start, end] = intervals[index];

    if (!map[i]) {
      map[i] = [start, end];
    } else {
      map[i] = [Math.min(map[i][0], start), Math.max(map[i][1], end)];
    }
  });

  return Object.values(map);
}

// printResult(merge, [[[1,3],[2,6],[8,10],[15,18]]], [[1,6],[8,10],[15,18]])
// printResult(merge, [[[1,4],[4,5]]], [[1, 5]])
printResult(merge, [data], [[2, 7]]);
