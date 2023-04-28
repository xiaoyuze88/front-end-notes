import { printResult } from "../utils";

// 给你一个二进制数组 nums ，你需要从中删掉一个元素。

// 请你在删掉元素的结果数组中，返回最长的且只包含 1 的非空子数组的长度。

// 如果不存在这样的子数组，请返回 0 。

//

// 提示 1：

// 输入：nums = [1,1,0,1]
// 输出：3
// 解释：删掉位置 2 的数后，[1,1,1] 包含 3 个 1 。
// 示例 2：

// 输入：nums = [0,1,1,1,0,1,1,0,1]
// 输出：5
// 解释：删掉位置 4 的数字后，[0,1,1,1,1,1,0,1] 的最长全 1 子数组为 [1,1,1,1,1] 。
// 示例 3：

// 输入：nums = [1,1,1]
// 输出：2
// 解释：你必须要删除一个元素。
//

// 提示：

// 1 <= nums.length <= 105
// nums[i] 要么是 0 要么是 1 。

// 即返回仅包含一个0的最长子数组，还是毛毛虫法，找只包含一个0的最长子数组
function longestSubarray(nums: number[]): number {
  let left = 0;
  let right = 0;
  let zeros = 0;
  let max = 0;

  while (right < nums.length) {
    if (nums[right] === 0) {
      zeros++;
    }

    while (zeros > 1) {
      if (nums[left] === 0) {
        zeros--;
      }
      left++;
    }

    max = Math.max(right - left + 1, max);
    right++;
  }

  return max - 1;
}

printResult(longestSubarray, [[1, 1, 0, 1]], 3);
printResult(longestSubarray, [[1, 1, 1]], 2);
printResult(longestSubarray, [[0, 1, 1, 1, 0, 1, 1, 0, 1]], 5);
printResult(longestSubarray, [[0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1]], 3);
printResult(longestSubarray, [[0]], 0);
