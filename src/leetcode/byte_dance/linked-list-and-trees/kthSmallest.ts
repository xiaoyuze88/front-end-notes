// 378. 有序矩阵中第 K 小的元素
// https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/description/
// 中等
// 相关标签
// 相关企业
// 给你一个 n x n 矩阵 matrix ，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
// 请注意，它是 排序后 的第 k 小元素，而不是第 k 个 不同 的元素。

import { printResult } from "../../utils";

// 你必须找到一个内存复杂度优于 O(n2) 的解决方案。

// 示例 1：

// 输入：matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
// 输出：13
// 解释：矩阵中的元素为 [1,5,9,10,11,12,13,13,15]，第 8 小元素是 13
// 示例 2：

// 输入：matrix = [[-5]], k = 1
// 输出：-5

// 提示：

// n == matrix.length
// n == matrix[i].length
// 1 <= n <= 300
// -109 <= matrix[i][j] <= 109
// 题目数据 保证 matrix 中的所有行和列都按 非递减顺序 排列
// 1 <= k <= n2

// 进阶：

// 你能否用一个恒定的内存(即 O(1) 内存复杂度)来解决这个问题?
// 你能在 O(n) 的时间复杂度下解决这个问题吗?这个方法对于面试来说可能太超前了，但是你会发现阅读这篇文章（ this paper ）很有趣。

// 1. 每次比较第一个，较小的推入，第k次比较即可找到
// 每次需要找n行，需要找k次，复杂度 O(nk)
function kthSmallest1(matrix: number[][], k: number): number {
  const n = matrix.length;

  const minArray: number[] = [];

  let min = Number.MAX_SAFE_INTEGER;
  let minIndex = -1;

  while (minArray.length < k) {
    for (let i = 0; i < n; i++) {
      if (min > matrix[i][0]) {
        min = matrix[i][0];
        minIndex = i;
      }
    }

    // 找到当前最小值，推入
    minArray.push(min);
    matrix[minIndex].shift();
    min = Number.MAX_SAFE_INTEGER;
    minIndex = -1;
  }

  // console.log("minArray", minArray);

  return minArray[minArray.length - 1];
}

// 将内层数组作为最大堆节点的内容去存，生成节点数为n的最小堆，推k个出来即可
// 建堆复杂度 O(n)，每次操作复杂度 logn,操作k次，复杂度O(n+k*logn)=O(k*logn)
function kthSmallest2(matrix: number[][], k: number): number {}

// 二分法去找最小，找k次
// k*logn
function kthSmallest(matrix: number[][], k: number): number {}

printResult(
  kthSmallest,
  [
    [
      [1, 5, 9],
      [10, 11, 13],
      [12, 13, 15],
    ],
    8,
  ],
  13
);

printResult(kthSmallest, [[[-5]], 1], -5);
