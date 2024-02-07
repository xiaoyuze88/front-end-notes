// https://leetcode.cn/explore/interview/card/bytedance/243/array-and-sorting/1017/
// 搜索旋转排序数组
// 整数数组 nums 按升序排列，数组中的值 互不相同 。

import { printResult } from "../../utils";

// 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

// 给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

// 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

// 示例 1：

// 输入：nums = [4,5,6,7,0,1,2], target = 0
// 输出：4
// 示例 2：

// 输入：nums = [4,5,6,7,0,1,2], target = 3
// 输出：-1
// 示例 3：

// 输入：nums = [1], target = 0
// 输出：-1

// 提示：

// 1 <= nums.length <= 5000
// -104 <= nums[i] <= 104
// nums 中的每个值都 独一无二
// 题目数据保证 nums 在预先未知的某个下标上进行了旋转
// -104 <= target <= 104

// 二分法+左右序列判断+边界场景判断
function search(nums: number[], target: number): number {
  if (nums.length === 1) {
    return nums[0] === target ? 0 : -1;
  }

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    const m = nums[mid];
    const l = nums[left];
    const r = nums[right];

    // console.log(`current:
    // left=> index:${left},value: ${l};
    // mid=> index:${mid},value: ${m};
    // right=> index:${right},value: ${r};
    // `);

    // 正好命中，直接退出
    if (m === target) return mid;
    if (l === target) return left;
    if (r === target) return right;

    // 已到左边界
    if (mid === left) {
      // console.log("bordered", { mid, left, right });

      if (m === target) return mid;
      if (r === target) return right;

      return -1;
    }

    // 在左序列
    if (m > l && m > r) {
      // 在左序列的话，右边还有比mid大的，左边都是比mid小的，右边也有比mid小的

      // 比mid大，只可能在右边
      if (target > m) {
        left = mid;
      }
      // 比mid小，有可能在左右可能在右
      else {
        // 如果比r大，说明只能在左序列中
        if (target > r) {
          right = mid;
        }
        // 比r小，只可能在右边
        else {
          left = mid;
        }
      }
    }
    // 右序列
    else if (m < l && m < r) {
      // 在右序列的话，右边只有比mid大的，左边有比mid大的也有比mid 小的

      // 比mid小，只可能在左边
      if (target < m) {
        right = mid;
      }
      // 比mid大，可能在左也可能在右
      else {
        // 比l大，只可能在左边
        if (target > l) {
          right = mid;
        }
        // 比mid大，但是比l小，只能在右边
        else {
          left = mid;
        }
      }
    }
    // m >= l && m <= r，说明当前已经是正常序列
    else {
      // 右边
      if (target > m) {
        left = mid;
      } else {
        right = mid;
      }
    }
  }

  return -1;
}

// printResult(search, [[4, 5, 6, 7, 0, 1, 2], 0], 4);
// printResult(search, [[4, 5, 6, 7, 0, 1, 2], 3], -1);
// printResult(search, [[1], 0], -1);
// printResult(search, [[3, 5, 1], 3], 0);
// printResult(search, [[4, 5, 6, 7, 8, 1, 2, 3], 8], 4);
printResult(search, [[5, 1, 3], 5], 0);
