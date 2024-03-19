// 俄罗斯套娃信封问题
// https://leetcode.cn/explore/interview/card/bytedance/246/dynamic-programming-or-greedy/1031/
// 给你一个二维整数数组 envelopes ，其中 envelopes[i] = [wi, hi] ，表示第 i 个信封的宽度和高度。

import { printResult } from "../../utils";
import data from "./maxEnvelopes_data.json";

// 当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。

// 请计算 最多能有多少个 信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。

// 注意：不允许旋转信封。

// 示例 1：

// 输入：envelopes = [[5,4],[6,4],[6,7],[2,3]]
// 输出：3
// 解释：最多信封的个数为 3, 组合为: [2,3] => [5,4] => [6,7]。
// 示例 2：

// 输入：envelopes = [[1,1],[1,1],[1,1]]
// 输出：1

// 提示：

// 1 <= envelopes.length <= 105
// envelopes[i].length == 2
// 1 <= wi, hi <= 105

/**
 * 1. 先将 w 按顺序排好，相同的 w，按 h 逆序排列(这样就不可能同w情况下按h排成递增序列)
 * 2. 按 h 取递增子序列
 */

function maxEnvelopes(envelopes: Array<[number, number]>): number {
  envelopes.sort((a, b) => {
    const [wa, ha] = a;
    const [wb, hb] = b;

    if (wa > wb) return 1;
    else if (wa < wb) return -1;

    // wa === wb, 此时按 h 逆序排列
    if (ha > hb) return 1;
    return -1;
  });

  console.log(envelopes);

  // 然后在顺序不变的情况下，挑选按 h 排列的严格递增子序列

  // dp[i] 表示最后一个数为 n[i] 的情况下的严格递增子序列
  const dp = Array(envelopes.length).fill(0);

  dp[0] = 1;

  let maxDpFinal = 1;

  for (let i = 1; i < envelopes.length; i++) {
    const [currentW, currentH] = envelopes[i];

    let maxDp = 0;

    for (let j = 0; j < i; j++) {
      const [prevW, prevH] = envelopes[j];
      // 在小过当前数的前提下，找到最大的dp
      if (prevH < currentH && currentW !== prevW) {
        maxDp = Math.max(maxDp, dp[j]);
      }
    }

    // 找到最大dp，+1
    dp[i] = maxDp + 1;
    maxDpFinal = Math.max(maxDpFinal, dp[i]);
  }

  console.log("dp", dp);

  return maxDpFinal;
}

// printResult(
//   maxEnvelopes,
//   [
//     [
//       [5, 4],
//       [6, 4],
//       [6, 7],
//       [2, 3],
//     ],
//   ],
//   3
// );

// printResult(
//   maxEnvelopes,
//   [
//     [
//       [4, 5],
//       [4, 6],
//       [6, 7],
//       [2, 3],
//       [1, 1],
//     ],
//   ],
//   4
// );

// console.log("data", data);
printResult(maxEnvelopes, [data as Array<[number, number]>], 4);
