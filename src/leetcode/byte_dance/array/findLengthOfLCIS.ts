// https://leetcode.cn/explore/interview/card/bytedance/243/array-and-sorting/1035/
// 最长连续递增序列
// 给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。

import { printResult } from "../../utils";

// 连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。

// 示例 1：

// 输入：nums = [1,3,5,4,7]
// 输出：3
// 解释：最长连续递增序列是 [1,3,5], 长度为3。
// 尽管 [1,3,5,7] 也是升序的子序列, 但它不是连续的，因为 5 和 7 在原数组里被 4 隔开。
// 示例 2：

// 输入：nums = [2,2,2,2,2]
// 输出：1
// 解释：最长连续递增序列是 [2], 长度为1。

// 提示：

// 1 <= nums.length <= 104
// -109 <= nums[i] <= 109

/**
 * 解法：
 * 因为是找连续递增，可以用双指针
 * 1. 只要右指针比左边的大，就一直右移，直到不满足
 * 2. 左指针移动到当前右指针处，然后右指针右移一位
 */

// 双指针
function findLengthOfLCIS2(nums: number[]): number {
  let left = 0;
  let right = 1;

  let maxLen = 1;

  if (nums.length === 1) return maxLen;

  let matchedList = [nums[0]];

  while (right < nums.length) {
    // console.log(`current index:
    //   left: index: ${left}, value: ${nums[left]};
    //   right: index: ${right}, value: ${nums[right]};
    //   `);

    // 满足递增，右指针右移
    if (nums[right] > nums[right - 1]) {
      matchedList.push(nums[right]);
      // console.log(`matched:
      // matchedList: ${matchedList}
      // `);

      right++;
    }
    // 不满足了，左指针指向当前right,right再增1
    else {
      if (maxLen < matchedList.length) {
        // console.log("not match, count length", matchedList, matchedList.length);
        maxLen = matchedList.length;
      }

      matchedList = [nums[left]];
      left = right;
      right++;
    }
  }

  if (matchedList.length && matchedList.length > maxLen) {
    maxLen = matchedList.length;
  }

  return maxLen;
}

function findLengthOfLCIS(nums: number[]): number {
  if (nums.length === 1) return 1;

  let l = 0;

  let maxLength = 1;

  while (l < nums.length - 1) {
    let r = l + 1;

    // 当前l满足，才往下走
    if (nums[l] < nums[r]) {
      // r一直右移
      while (r < nums.length) {
        // 当右边满足条件，则往右移
        if (nums[r + 1] > nums[r]) {
          r++;
        }
        // 否则，记录长度，l移动到r，r移到r+1
        else {
          const len = r - l + 1;
          if (len > maxLength) {
            maxLength = len;
          }
          l = r;
          r += 1;
          break;
        }
      }
    }

    l++;
  }

  return maxLength;
}

printResult(findLengthOfLCIS, [[1, 3, 5, 4, 7]], 3);
printResult(findLengthOfLCIS, [[2, 2, 2, 2, 2]], 1);
printResult(findLengthOfLCIS, [[1, 3, 5, 4, 2, 3, 4, 5]], 4);
