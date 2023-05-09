// 给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。返回 需要移除区间的最小数量，使剩余区间互不重叠 。

import { printResult } from "../utils";

//

// 示例 1:

// 输入: intervals = [[1,2],[2,3],[3,4],[1,3]]
// 输出: 1
// 解释: 移除 [1,3] 后，剩下的区间没有重叠。
// 示例 2:

// 输入: intervals = [ [1,2], [1,2], [1,2] ]
// 输出: 2
// 解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
// 示例 3:

// 输入: intervals = [ [1,2], [2,3] ]
// 输出: 0
// 解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
//

// 提示:

// 1 <= intervals.length <= 105
// intervals[i].length == 2
// -5 * 104 <= starti < endi <= 5 * 104

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/non-overlapping-intervals
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
type Interval = [number, number];

// function eraseOverlapIntervals(intervals: Interval[]): number {
//   // intervals.sort(([, a], [, b]) => {
//   //   return a < b ? -1 : 1;
//   // });

//   const overlaps: Interval[] = [[...intervals[0]]];

//   const isWithinOverlap = (interval: Interval, overlap: Interval) => {
//     const [, overlapRight] = overlap;
//     const [intervalLeft] = interval;

//     return intervalLeft < overlapRight;
//   };

//   const intersectionOverlap = (target: Interval, overlap: Interval) => {
//     overlap[0] = Math.max(target[0], overlap[0]);
//     overlap[1] = Math.min(target[1], overlap[1]);
//   };

//   for (let i = 1; i < intervals.length; i++) {
//     const overlap = overlaps.find((overlap) => {
//       return isWithinOverlap(intervals[i], overlap);
//     });

//     if (overlap) {
//       intersectionOverlap(intervals[i], overlap);
//     } else {
//       overlaps.push(intervals[i]);
//     }
//   }

//   return intervals.length - overlaps.length;
// }

function eraseOverlapIntervals(intervals: Interval[]): number {
  intervals.sort(([, a], [, b]) => {
    return a < b ? -1 : 1;
  });

  let currentOverlapEnd = intervals[0][1];

  let count = 1;

  for (let i = 1; i < intervals.length; i++) {
    if (currentOverlapEnd <= intervals[i][0]) {
      count++;
      currentOverlapEnd = intervals[i][1];
    }
  }

  return intervals.length - count;
}

printResult(
  eraseOverlapIntervals,
  [
    [
      [2, 5],
      [1, 6],
      [3, 7],
      [6, 8],
      [5, 9],
      [9, 10]
    ]
  ],
  3
);
