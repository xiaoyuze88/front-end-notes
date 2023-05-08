// 给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。

import { printResult } from "../utils";

// 你可以对一个单词进行如下三种操作：

// 插入一个字符
// 删除一个字符
// 替换一个字符
//

// 示例 1：

// 输入：word1 = "horse", word2 = "ros"
// 输出：3
// 解释：
// horse -> rorse (将 'h' 替换为 'r')
// rorse -> rose (删除 'r')
// rose -> ros (删除 'e')
// 示例 2：

// 输入：word1 = "intention", word2 = "execution"
// 输出：5
// 解释：
// intention -> inention (删除 't')
// inention -> enention (将 'i' 替换为 'e')
// enention -> exention (将 'n' 替换为 'x')
// exention -> exection (将 'n' 替换为 'c')
// exection -> execution (插入 'u')
//

// 提示：

// 0 <= word1.length, word2.length <= 500
// word1 和 word2 由小写英文字母组成

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/edit-distance
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function minDistance(word1: string, word2: string): number {
  /**
   * dp[i][j] 代表 word1[1~i] 转为 word2[1~j] 的最少次数
   *
   * 转义方程：
   * 1. 需要增：dp[i][j] = dp[i-1][j] + 1
   * 2. 需要删：dp[i][j] = dp[i][j-1] + 1
   * 3. 需要改：dp[i][j] = dp[i-1][j-1] + 1
   * 4. 最后一位匹配：dp[i][j] = dp[i-1][j-1]
   * 求最小值，所以等价于 dp[i][j] = min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + 1, dp[i-1][j-1])
   *
   * 边界条件：
   * dp[0][0]=0
   * dp[0][1]=1
   * dp[1][0]=1
   *
   */

  if (word2.length === 0 && word1.length === 0) return 0;

  const dp = [...Array(word1.length + 1)].map(() => Array(word2.length + 1).fill(0));

  dp[0][0] = 0;

  for (let i = 1; i <= word1.length; i++) {
    dp[i][0] = i;
  }
  for (let i = 1; i <= word2.length; i++) {
    dp[0][i] = i;
  }

  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1] + 1, dp[i - 1][j] + 1, dp[i][j - 1] + 1);
      }
    }
  }

  return dp[word1.length][word2.length];
}

printResult(minDistance, ["horse", "ros"], 3);
printResult(minDistance, ["sea", "eat"], 2);
