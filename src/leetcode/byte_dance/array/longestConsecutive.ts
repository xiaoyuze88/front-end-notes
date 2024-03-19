// https://leetcode.cn/explore/interview/card/bytedance/243/array-and-sorting/1019/
// 最长连续序列

import { printResult } from "../../utils";

// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

// 示例 1：

// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
// 示例 2：

// 输入：nums = [0,3,7,2,5,8,4,6,0,1]
// 输出：9

// 提示：

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109

/**
 * 解法1：
 * 1. 建最小堆 O(n)
 * 2. 依次推出，记录（相当于堆排序了，复杂度 O(nLogN)）
 *
 * 解法2：
 * 1. 遍历一次记录所有值（Set去重）
 * 2. 遍历Set，当存在 num-1 才去递增找，直到不再满足，这样每个数只会遍历一次
 */

function longestConsecutive2(nums: number[]): number {
  // 1. 建最小堆
  // 2. 从小到大推出，只要不连续就记录，然后继续推

  const arr = [, ...nums];

  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const shiftDown = (i) => {
    while (i <= Math.floor((arr.length - 1) / 2)) {
      let smallestI = i;

      const l = i * 2;
      const r = i * 2 + 1;

      if (arr[l] < arr[smallestI]) smallestI = l;
      if (arr[r] < arr[smallestI]) smallestI = r;

      if (smallestI !== i) {
        swap(i, smallestI);
        i = smallestI;
      } else {
        break;
      }
    }
  };

  const shiftUp = (i) => {
    while (i >= 1) {
      const parent = Math.floor(i / 2);

      if (arr[i] < arr[parent]) {
        swap(i, parent);
      }

      i = parent;
    }
  };

  const poll = () => {
    swap(1, arr.length - 1);

    const peak = arr.pop();

    shiftDown(1);

    return peak;
  };

  for (let i = 1, l = arr.length; i < l; i++) {
    shiftUp(i);
  }

  let prevValue = null;
  let count = 0;

  // 建堆 O(n)，遍历一次 n

  while (arr.length - 1 >= 0) {}

  return -1;
}

function longestConsecutive(nums: number[]): number {
  // 1. 记录所有数值
  // 2. 找到任一没有 num - 1 的数开始循环去找num + 1，找到没有为止，然后记录当前长度

  const set = new Set<number>();

  nums.forEach((num) => set.add(num));

  let maxCount = 0;

  set.forEach((num) => {
    // 只有没有 n - 1 才去遍历，这样每个满足条件的数字最多出现一次
    if (!set.has(num - 1)) {
      let currentNum = num;
      let count = 1;

      while (set.has(currentNum + 1)) {
        currentNum++;
        count++;
      }

      maxCount = Math.max(count, maxCount);
    }
  });

  return maxCount;
}

printResult(longestConsecutive, [[100, 4, 200, 1, 3, 2]], 4);
printResult(longestConsecutive, [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], 9);
