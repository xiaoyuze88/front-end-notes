// 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

import { printResult } from "../utils";

// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

// 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
// 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

//

// 示例 1：

// 输入：text1 = "abcde", text2 = "ace"
// 输出：3
// 解释：最长公共子序列是 "ace" ，它的长度为 3 。
// 示例 2：

// 输入：text1 = "abc", text2 = "abc"
// 输出：3
// 解释：最长公共子序列是 "abc" ，它的长度为 3 。
// 示例 3：

// 输入：text1 = "abc", text2 = "def"
// 输出：0
// 解释：两个字符串没有公共子序列，返回 0 。
//

// 提示：

// 1 <= text1.length, text2.length <= 1000
// text1 和 text2 仅由小写英文字符组成。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/longest-common-subsequence
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function longestCommonSubsequence(text1: string, text2: string): number {
  // 构建dp[i][j]代表t1:0~i-1与t2:0~j-1的最长公共子序列（gcs）长度

  // 状态转移方程：
  // 对于ij有这么几种情况：
  // 1. 首先是text1[i-1] == text2[j-1]，此时必定有 dp[i][j] = dp[i-1][j-1] + 1
  // 2. 对于 text1[i-1] != text2[j-1]，又会有三种情况：
  // 2.1 text1[i-1] 不在 gcs 中，而 text2[j-1]在 gcs 中，此时 dp[i][j] = dp[i-1][j]
  // 2.2 text1[i-1] 在 gcs 中，而 text2[j-1] 不在 gcs 中，此时 dp[i][j] = dp[i][j-1]
  // 2.3 text1[i-1]、text2[j-1] 都不在 gcs 中，此时 dp[i][j] = dp[i-1][j-1]
  // 只可能在上述三种场景中发生，也就是不可能同时会出现上述三个场景，也就是说上述三个等式仅有一个会成立，而其他两个会被多减了1，所以此时有：
  // dp[i][j] = max(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) && text1[i-1] !== text2[j-1]

  // 边界条件：
  // text1 或 text2长度为0，返回0

  if (!text1.length || !text2.length) return 0;

  const dp = [...Array(text1.length + 1)].map(() => Array(text2.length + 1).fill(0));

  for (let i = 1; i <= text1.length; i++) {
    for (let j = 1; j <= text2.length; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[text1.length][text2.length];
}

printResult(longestCommonSubsequence, ["abcde", "ace"], 3);
