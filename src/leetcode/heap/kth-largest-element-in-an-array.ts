// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

import { printResult } from "../utils";

// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

// 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。

//

// 示例 1:

// 输入: [3,2,1,5,6,4], k = 2
// 输出: 5
// 示例 2:

// 输入: [3,2,3,1,2,4,5,5,6], k = 4
// 输出: 4
//

// 提示：

// 1 <= k <= nums.length <= 105
// -104 <= nums[i] <= 104

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/kth-largest-element-in-an-array
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 堆
function findKthLargest(nums: number[], k: number): number {
  if (nums.length === 1) return nums[0];

  // 构造0元素，使得下标从1开始
  nums.unshift(undefined);

  // 构建max heap
  buildHeap(nums);

  let validHeapCount = nums.length - 1;
  let kCount = k;

  for (let i = nums.length - 1; i > 1; i--) {
    // 交换首位
    swap(nums, i, 1);
    validHeapCount--;
    kCount--;
    // 每交换一次k-1，k为0时最后一个元素即为目标
    if (kCount === 0) return nums[i];

    heapify(nums, validHeapCount, 1);
  }

  // 移除首位
  nums.splice(0, 1);

  // 到这说明交换不了k次就完成了排序，此时拿到的nums是已经按从小到大排序的数组
  // 那么第k大也就是第length - k 位
  return nums[nums.length - k];
}

// 构建最小堆
function buildHeap(data: number[]) {
  // 从最后一个不为叶子的节点开始，从后往前，从上往下整理
  for (let i = Math.floor((data.length - 1) / 2); i >= 1; i--) {
    heapify(data, data.length - 1, i);
  }
}

function heapify(data: number[], size: number, index: number) {
  while (index <= size) {
    const leftIndex = index * 2;
    const rightIndex = index * 2 + 1;

    let nextIndex = index;

    if (leftIndex <= size && data[leftIndex] > data[nextIndex]) {
      nextIndex = leftIndex;
    }

    if (rightIndex <= size && data[rightIndex] > data[nextIndex]) {
      nextIndex = rightIndex;
    }

    if (nextIndex === index) break;

    swap(data, nextIndex, index);
    index = nextIndex;
  }
}

function swap(data: number[], sourceIndex: number, targetIndex: number) {
  const temp = data[sourceIndex];
  data[sourceIndex] = data[targetIndex];
  data[targetIndex] = temp;
}

// printResult(findKthLargest, [[3, 2, 1, 5, 6, 4], 2], 5);
printResult(findKthLargest, [[2, 1], 2], 1);
