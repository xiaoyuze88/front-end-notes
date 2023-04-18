// 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

// '.' 匹配任意单个字符
// '*' 匹配零个或多个前面的那一个元素
// 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

//
// 示例 1：

// 输入：s = "aa", p = "a"
// 输出：false
// 解释："a" 无法匹配 "aa" 整个字符串。
// 示例 2:

// 输入：s = "aa", p = "a*"
// 输出：true
// 解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
// 示例 3：

// 输入：s = "ab", p = ".*"
// 输出：true
// 解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
//

// 提示：

// 1 <= s.length <= 20
// 1 <= p.length <= 20
// s 只包含从 a-z 的小写字母。
// p 只包含从 a-z 的小写字母，以及字符 . 和 *。
// 保证每次出现字符 * 时，前面都匹配到有效的字符

// 动态规划
//
function isMatch(s: string, p: string): boolean {
  const dp = [...Array(s.length + 1)].map(() => Array(p.length + 1).fill(false));

  dp[0][0] = true;

  for (let j = 1, l = p.length + 1; j < l; j++) {
    if (p[j - 1] === "*") dp[0][j] = dp[0][j - 2];
  }

  for (let i = 1, l_i = s.length + 1; i < l_i; i++) {
    for (let j = 1, l_j = p.length + 1; j < l_j; j++) {
      if (s[i - 1] === p[j - 1] || p[j - 1] === ".") {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === "*") {
        // if (s[i - 1] === p[j - 2] || p[j - 2] === ".") {
        //   dp[i][j] = dp[i][j - 2] || dp[i - 1][j - 2] || dp[i - 1][j];
        // } 
        // if (p[j - 3] === s[i - 1]) {
        //   dp[i][j] = dp[i][j - 2];
        // } else if (p[j - 2] === s[i - 1]) {
        //   dp[i][j] = dp[i - 1][j - 2];
        // } else if (p[j - 2] === s[i - 1] && p[j - 2] === s[i - 2]) {
        //   dp[i][j] = dp[i - 1][j];
        // } else if (p[j - 2] !== s[i - 1] && p[j - 3] === s[i - 1]) {
        //   dp[i][j] = dp[i][j - 2];
        // } else {
        //   console.error("unexcepted case", i, j);
        // }
      }
    }
  }

  console.log(dp);

  return false;
}

console.log(isMatch("cabaaaa", "c*ba*"));
// console.log(isMatch("c", "c"));
