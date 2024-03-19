// 接雨水
// https://leetcode.cn/explore/interview/card/bytedance/243/array-and-sorting/1047/
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

import { printResult } from "../../utils";

// 示例 1：

// 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出：6
// 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
// 示例 2：

// 输入：height = [4,2,0,3,2,5]
// 输出：9

// 提示：

// n == height.length
// 1 <= n <= 2 * 104
// 0 <= height[i] <= 105

/**
 * 单调栈
 *
 * 1. 弄一个单调递减栈，遍历数组，大过栈尾的，将栈尾依次推出，同时计算每个的面积
 */

function trap(height: number[]): number {
  let areaSum = 0;

  const stack = [];

  const calcSize = (i: number, j: number) => {
    if (Math.abs(j - i) <= 1 || height[i] === 0 || height[j] === 0) {
      return 0;
    }

    const heightArr = [];

    const start = Math.min(i, j);
    const end = Math.max(i, j);

    for (let index = start; index <= end; index++) {
      heightArr.push(height[index]);
    }

    const first = heightArr.shift();
    const last = heightArr.pop();

    const width = Math.abs(j - i) - 1;

    // 先算最大一块，然后减掉中间的
    let size = Math.min(first, last) * width;

    size -= Math.max(...heightArr) * width;

    return size;
  };

  let totalSize = 0;

  for (let i = 0, l = height.length; i < l; i++) {
    const currentHeight = height[i];

    // 推入条件，当前大于栈顶
    if (currentHeight > height[stack[stack.length - 1]]) {
      // 遍历推出栈内小过 currentHeight 的
      while (stack.length && currentHeight > height[stack[stack.length - 1]]) {
        const top = stack.pop();

        const size = calcSize(top, i);
        totalSize += size;
      }

      // 都推出来之后，看看还有值没，有的话肯定是比自己大的值，也计算面积，它再前面的就不用管了，因为短板在 i
      if (stack.length) {
        const top = stack[stack.length - 1];

        const size = calcSize(top, i);
        totalSize += size;
      }
    }

    stack.push(i);
  }

  return totalSize;
}

printResult(trap, [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], 6);
printResult(trap, [[4, 2, 0, 3, 2, 5]], 9);
