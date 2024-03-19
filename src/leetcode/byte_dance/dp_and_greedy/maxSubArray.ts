// 最大子数组和
// https://leetcode.cn/explore/interview/card/bytedance/246/dynamic-programming-or-greedy/1029/
// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

import { printResult } from "../../utils";

// 子数组 是数组中的一个连续部分。

// 示例 1：

// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
// 示例 2：

// 输入：nums = [1]
// 输出：1
// 示例 3：

// 输入：nums = [5,4,-1,7,8]
// 输出：23

// 提示：

// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104

// 进阶：如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 分治法 求解。
// TODO: 线段树

/**
 * dp[i] 为以 nums[i] 结尾的子数组的最大和
 * dp[0] = -2;
 *
 * 要么加上i更大，要么就i自立门户更大
 * dp[i] = max(dp[i-1] + nums[i], nums[i])
 */

function maxSubArray2(nums: number[]): number {
  // if (nums.length === 1) return nums[0];

  // 以第i个数结果的最大合
  const dp = Array(nums.length).fill(0);

  let max = nums[0];

  dp[0] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    max = Math.max(max, dp[i]);
  }

  return max;
}

function maxSubArray(nums: number[]): number {
  const dp: number[] = Array(nums.length).fill(0);

  dp[0] = nums[0];

  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    max = Math.max(max, dp[i]);
  }

  return max;
}

printResult(maxSubArray, [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], 6);
printResult(maxSubArray, [[1]], 1);
printResult(maxSubArray, [[-1, -2]], -1);
