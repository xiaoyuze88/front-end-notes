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

function search(nums: number[], target: number): number {
  if (nums.length === 1) {
    return nums[0] === target ? 0 : -1;
  }

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    console.log("mid", {
      mid,
      left,
      right,
    });

    // 已到左边界
    if (mid === left) {
      console.log("bordered", { mid, left, right });

      if (nums[mid] === target) return mid;
      if (nums[right] === target) return right;

      return -1;
    }

    if (nums[mid] === target) return mid;

    // 说明mid是边界，左侧都是升序的,右侧也都是升序的，mid为最小值
    if (nums[mid - 1] > nums[mid]) {
      // 可以判断下最后一个值跟target的大小比较，可以判断target在左边还是右边
      if (nums[right] === target) return right;
      // 左侧为最大值，如果target比它大则不存
      if (nums[mid - 1] < target) return -1;
      // mid为最小值，比它还小肯定不存在
      if (nums[mid] > target) return -1;

      // 最后一个为右侧最大值，如果比target小，则必定在左侧
      if (nums[right] < target) {
        right = mid;
      }
      // 否则必定在右侧
      else {
        left = mid;
      }
      continue;
    }
    // 说明mid是边界，右侧都是升序的，左侧也都是升序的，mid为最大值
    else if (nums[mid + 1] < nums[mid]) {
      // mid为最大值
      if (nums[mid] < target) return -1;
      // 右侧为最小值，比它还小就不存在了
      if (nums[mid + 1] > target) return -1;
      if (nums[right] === target) return right;

      // 可以判断下最后一个值跟target的大小比较，可以判断target在左边还是右边
      // 最后一个为右侧最大值，如果比target小，则必定在左侧
      if (nums[right] < target) {
        right = mid;
      }
      // 否则必定在右侧
      else {
        left = mid;
      }

      continue;
    }

    // 普通场景，还没办法判断在哪边？
    // 如果比mid大，那么只有两种可能，要么在右边，要么不存

    // 如果比mid大
    if (nums[mid] < target) {
      if (nums[right] === target) return right;

      // 比右边界大
      if (nums[right] < target) {
        // 比mid大,比右边界也大，比左边界还大，那么只可能在右边
        if (nums[left] < target) {
          left = mid;
        }
        // 比mid大，比右边界大，比左边界小，在左侧？
        else {
          right = mid;
        }
      }
      // 比mid大，比右边界小，在右侧
      else {
        left = mid;
      }
    }
    // 比mid小
    else {
      if (nums[left] === target) return left;

      // 比mid小，同时比左边界还小，肯定在右边
      if (nums[left] > target) {
        left = mid;
      }
      // 比mid小，同时比左边界大，肯定在左边
      else {
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
printResult(search, [[4, 5, 6, 7, 8, 1, 2, 3], 8], 4);
