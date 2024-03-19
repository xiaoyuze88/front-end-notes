// https://leetcode.cn/explore/interview/card/bytedance/243/array-and-sorting/1020/
// 三数之和
// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请

import { printResult } from "../../utils";

// 你返回所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

// 示例 1：

// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 解释：
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
// 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
// 注意，输出的顺序和三元组的顺序并不重要。
// 示例 2：

// 输入：nums = [0,1,1]
// 输出：[]
// 解释：唯一可能的三元组和不为 0 。
// 示例 3：

// 输入：nums = [0,0,0]
// 输出：[[0,0,0]]
// 解释：唯一可能的三元组和为 0 。

// 提示：

// 3 <= nums.length <= 3000
// -105 <= nums[i] <= 105

/**
 * 解法：
 * 1. 先排序
 * 2. 从左到右遍历，到谁谁做中位数，然后双指针两头往中间走，大了就右左一，小了就左右移，
 * @param nums
 * @returns
 */

function isValid(nums: number[]) {
  return nums.length === 3 && nums.reduce((prev, next) => prev + next, 0) === 0;
}

// 回溯咯？
// 不行
// function threeSum(nums: number[]): number[][] {
//   nums.sort();

//   const results: number[][] = [];

//   const uniqMap = {};

//   const indexCount = {};

//   let totalCount = 0;

//   function backTrace({
//     stack,
//     currentIndex,
//   }: {
//     stack: number[];
//     currentIndex: number;
//   }): boolean {
//     console.log("backTracing", stack, currentIndex);

//     const val = nums[currentIndex];

//     if (!indexCount[val]) indexCount[val] = 0;

//     indexCount[val]++;
//     totalCount++;

//     if (totalCount > 10000) return;

//     if (stack.length >= 3) {
//       if (isValid(stack)) {
//         // console.log("match", stack);
//         // console.time("uniq");
//         const matchedList = [...stack];
//         const key = matchedList.join("|");
//         // console.timeEnd("uniq");

//         if (!uniqMap[key]) {
//           uniqMap[key] = true;
//           results.push(matchedList);
//         }

//         return true;
//       }

//       // console.log("not match", stack);
//       return false;
//     }

//     let index = currentIndex;

//     while (index <= nums.length - 1) {
//       stack.push(nums[index]);

//       index++;

//       const isMatch = backTrace({
//         stack,
//         currentIndex: index,
//       });

//       stack.splice(stack.length - 1, 1);

//       if (isMatch) {
//         break;
//       }
//     }
//   }

//   backTrace({
//     stack: [],
//     currentIndex: 0,
//   });

//   console.log("indexCount", indexCount);
//   console.log("totalCount", totalCount);

//   // TODO: 去重
//   return results;
// }

// 双指针
function threeSum2(nums: number[]): number[][] {
  nums.sort((prev, next) => {
    return prev > next ? 1 : -1;
  });

  const results: number[][] = [];

  if (nums.length < 3) return results;

  const findNextNotSameIndex = (
    currentIndex: number,
    direction: "left" | "right"
  ) => {
    let nextIndex = currentIndex;

    while (nums[nextIndex] === nums[currentIndex]) {
      if (direction === "left") {
        nextIndex--;
      } else {
        nextIndex++;
      }
    }

    return nextIndex;
  };

  let i = 1;

  const uniqMap = {};

  // console.log("after sort", nums);

  while (i <= nums.length - 2) {
    let l = 0;
    let r = nums.length - 1;

    while (l < r && l < i && r > i) {
      const sum = nums[i] + nums[l] + nums[r];

      // console.log("checking", {
      //   l: nums[l],
      //   i: nums[i],
      //   r: nums[r],
      //   sum,
      // });

      if (sum === 0) {
        const matchedList = [nums[l], nums[i], nums[r]];

        const key = matchedList.join("|");

        // console.log("uniqMap", uniqMap, uniqMap[key]);

        if (!uniqMap[key]) {
          uniqMap[key] = true;
          results.push(matchedList);
        }

        // 找到了之后，还要继续匹配其他可能性
        // 左右都往内移动
        l = findNextNotSameIndex(l, "right");
        r = findNextNotSameIndex(r, "left");
      }
      // 小于0，说明左边太小了，右移n位
      else if (sum < 0) {
        l = findNextNotSameIndex(l, "right");
      }
      // 大于0，说明右边太大了，左移n位
      else {
        r = findNextNotSameIndex(r, "left");
      }
    }

    i++;
  }

  return results;
}

function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => (a > b ? 1 : -1));

  let mid = 1;

  const results = new Set<string>();

  // 中值逐步右移，两侧双指针从两边往中间遍历
  while (mid < nums.length - 1) {
    let left = 0;
    let right = nums.length - 1;

    while (left < mid && right > mid) {
      const sum = nums[mid] + nums[left] + nums[right];

      if (sum === 0) {
        results.add([nums[left], nums[mid], nums[right]].join("|"));
        left++;
        right--;
      }
      // 由于已经排序，右边是最大，左边是最小，结果太大，那么需要右指针左移
      else if (sum > 0) {
        right--;
      } else if (sum < 0) {
        left++;
      }
    }

    mid++;
  }

  return Array.from(results).map((s) => s.split("|").map((s) => +s));
}

printResult(threeSum, [[-1, 0, 1, 2, -1, -4]], []);
printResult(threeSum, [[0, 1, 1]], []);
printResult(threeSum, [[0, 0, 0, 0]], []);
printResult(threeSum, [[3, 0, -2, -1, 1, 2]], []);
