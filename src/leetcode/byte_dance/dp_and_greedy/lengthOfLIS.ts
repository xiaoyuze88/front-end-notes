// 300. 最长递增子序列
// https://leetcode.cn/problems/longest-increasing-subsequence/description/?utm_source=LCUS&utm_medium=ip_redirect&utm_campaign=transfer2china
// 中等
// 相关标签
// 相关企业
// 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

import { printResult } from "../../utils";

// 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的
// 子序列
// 。

// 示例 1：

// 输入：nums = [10,9,2,5,3,7,101,18]
// 输出：4
// 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
// 示例 2：

// 输入：nums = [0,1,0,3,2,3]
// 输出：4
// 示例 3：

// 输入：nums = [7,7,7,7,7,7,7]
// 输出：1

// 提示：

// 1 <= nums.length <= 2500
// -104 <= nums[i] <= 104

// 进阶：

// 你能将算法的时间复杂度降低到 O(n log(n)) 吗?

/**
 * 解法：
 *
 * dp[i] = 以i结尾的递增子序列长度
 * dp[0] = 1;
 * dp[i] = max(dp[j]), j < i && nums[j] < dp[i]
 *
 * 进阶：找 dp[j] 的过程，可以用二分法替代，但是前提是有序？
 */

function lengthOfLIS(nums: number[]): number {
  // 以 i 作为结尾元素的LIS
  const dp = Array(nums.length).fill(0);

  dp[0] = 1;

  // 状态转移方程：
  // dp[i] 为在 nums[i] > nums[j] 的前提下，dp 的最大值+1

  let maxDpTotal = 1;

  for (let i = 1; i < nums.length; i++) {
    let maxDp = 0;

    // 遍历前面所有的，找到所有比 i 小的数，看他们的dp值，挑一个最大的出来
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        if (dp[j] > maxDp) {
          maxDp = dp[j];
        }
      }
    }

    // 如果找得到，dp[i] = maxDp + 1
    dp[i] = maxDp + 1;

    maxDpTotal = Math.max(maxDpTotal, dp[i]);
  }

  // console.log("dp", dp);

  return maxDpTotal;
}

// printResult(lengthOfLIS, [[10, 9, 2, 5, 3, 7, 101, 18]], 4);
printResult(lengthOfLIS, [[0]], 1);
