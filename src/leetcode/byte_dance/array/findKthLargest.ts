// https://leetcode.cn/explore/interview/card/bytedance/243/array-and-sorting/1018/
// 数组中的第K个最大元素
// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

import { printResult } from "../../utils";

// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

// 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。

// 示例 1:

// 输入: [3,2,1,5,6,4], k = 2
// 输出: 5
// 示例 2:

// 输入: [3,2,3,1,2,4,5,5,6], k = 4
// 输出: 4

// 提示：

// 1 <= k <= nums.length <= 105
// -104 <= nums[i] <= 104

function findKthLargest(nums: number[], k: number): number {
  // 1. 建大顶堆

  const arr = [, ...nums];

  // 从下到上
  const shiftUp = (index: number) => {
    while (index >= 1) {
      const parent = Math.floor(index / 2);

      if (parent >= 1 && arr[parent] < arr[index]) {
        swap(parent, index);
      }

      index = parent;
    }
  };

  const shiftDown = (index: number) => {
    while (index <= Math.floor((arr.length - 1) / 2)) {
      let largestIndex = index;

      const leftNodeIndex = index * 2;
      const rightNodeIndex = index * 2 + 1;

      if (arr[leftNodeIndex] > arr[largestIndex]) largestIndex = leftNodeIndex;
      if (arr[rightNodeIndex] > arr[largestIndex]) largestIndex = rightNodeIndex;

      if (largestIndex !== index) {
        swap(index, largestIndex);
        index = largestIndex;
      } else {
        break;
      }
    }
  };

  const swap = (src: number, target: number) => {
    const temp = arr[src];
    arr[src] = arr[target];
    arr[target] = temp;
  }

  const poll = () => {
    if (!arr.length) return undefined;

    swap(1, arr.length - 1);

    const peak = arr.pop();

    shiftDown(1);

    return peak;
  }

  // 从前往后，从下往上
  for (let i = 1, l = arr.length; i < l; i++) {
    shiftUp(i);
  }

  for (let i = 0, l = k - 1; i < l; i++) {
    poll();
  }

  return poll();
}

printResult(findKthLargest, [[3,2,1,5,6,4], 2], 5)
printResult(findKthLargest, [[3,2,3,1,2,4,5,5,6], 4], 4)