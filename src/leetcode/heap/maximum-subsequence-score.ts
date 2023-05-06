// 给你两个下标从 0 开始的整数数组 nums1 和 nums2 ，两者长度都是 n ，再给你一个正整数 k 。你必须从 nums1 中选一个长度为 k 的 子序列 对应的下标。

import { printResult } from "../utils";
import { Heap } from "./Heap";

// 对于选择的下标 i0 ，i1 ，...， ik - 1 ，你的 分数 定义如下：

// nums1 中下标对应元素求和，乘以 nums2 中下标对应元素的 最小值 。
// 用公示表示： (nums1[i0] + nums1[i1] +...+ nums1[ik - 1]) * min(nums2[i0] , nums2[i1], ... ,nums2[ik - 1]) 。
// 请你返回 最大 可能的分数。

// 一个数组的 子序列 下标是集合 {0, 1, ..., n-1} 中删除若干元素得到的剩余集合，也可以不删除任何元素。

//

// 示例 1：

// 输入：nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
// 输出：12
// 解释：
// 四个可能的子序列分数为：
// - 选择下标 0 ，1 和 2 ，得到分数 (1+3+3) * min(2,1,3) = 7 。
// - 选择下标 0 ，1 和 3 ，得到分数 (1+3+2) * min(2,1,4) = 6 。
// - 选择下标 0 ，2 和 3 ，得到分数 (1+3+2) * min(2,3,4) = 12 。
// - 选择下标 1 ，2 和 3 ，得到分数 (3+3+2) * min(1,3,4) = 8 。
// 所以最大分数为 12 。
// 示例 2：

// 输入：nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
// 输出：30
// 解释：
// 选择下标 2 最优：nums1[2] * nums2[2] = 3 * 10 = 30 是最大可能分数。
//

// 提示：

// n == nums1.length == nums2.length
// 1 <= n <= 105
// 0 <= nums1[i], nums2[j] <= 105
// 1 <= k <= n

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/maximum-subsequence-score
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function maxScore(nums1: number[], nums2: number[], k: number): number {
  const indexList = nums2.map((_, index) => index).sort((a, b) => (nums2[a] < nums2[b] ? 1 : -1));

  let max = 0;
  let sum = 0;

  const minHeap = new Heap();

  let current1: number;
  let current2: number;
  let currentIndex: number;

  // 枚举下标数组，并认为i为当前nums2中的最小值，而当为最小值时，其他取值必定在i的左侧
  // 不用关心nums2的取值，因为已经在枚举它的最小值，我们现在需要关注的是nums1的取值
  // 原问题变为，nums1在 0 ~ i 之中，找到其最大的 k 个数，并与 nums2[i] 相乘，找到最大值
  for (let i = 0, l = indexList.length; i < l; i++) {
    currentIndex = indexList[i];
    current1 = nums1[currentIndex];
    current2 = nums2[currentIndex];

    // 找到当前最小值，与 current1 比较，如果小于等于则可跳过本轮
    const smallest = minHeap.peak();

    // 一边推入一边累加，当到size=k后，得到的sum既是i中前k个最大值，此时乘以nums2[i]即为结果
    // 继续遍历，超过后推出最小的，同时减掉这个数
    if (minHeap.size === k) {
      // 更小，无需操作
      if (smallest >= current1) continue;

      minHeap.poll();
      sum -= smallest;
    }

    // 推入最新的值
    minHeap.offer(current1);
    sum += current1;

    // 塞进去后要立刻计算
    if (minHeap.size === k) {
      max = Math.max(max, sum * current2);
    }
  }

  return max;
}

printResult(maxScore, [[1, 3, 3, 2], [2, 1, 3, 4], 3], 12);
