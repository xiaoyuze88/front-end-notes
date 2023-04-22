// 给你一个字符串 s，找到 s 中最长的回文子串。

// 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。

//

// 示例 1：

// 输入：s = "babad"
// 输出："bab"
// 解释："aba" 同样是符合题意的答案。
// 示例 2：

// 输入：s = "cbbd"
// 输出："bb"
//

// 提示：

// 1 <= s.length <= 1000
// s 仅由数字和英文字母组成

// 1. 动态规划
// 1.1 拆分子问题
// 1.2 状态转移方程
// 1.3 边界
// 1.4 记录子问题结果

// 对于该问题：
// dp[i][j]: boolean 代表 s 从 i到j的字符串是否为回文子串
// 若 s[i] === s[j]，则 dp[i][j] 的结果取决于其中间子串是否为回文串，即：
// dp[i][j] = dp[i + 1][j - 1] & s[i] === s[j]
function longestPalindrome1(s: string): string {
  const result: boolean[][] = [...Array(s.length)].map(() => [...Array(s.length)]);

  let max = 1;
  let begin = 0;

  // 遍历长度
  for (let length = 1; length <= s.length; length++) {
    // 遍历左边界
    for (let left = 0, l = s.length; left < l; left++) {
      const right = left + length - 1;

      if (s[left] !== s[right]) {
        result[left][right] = false;
      } else {
        // 只要大于2，既可以观察上一个子集是否是回串
        if (length > 2) {
          result[left][right] = result[left + 1][right - 1];
        }
        // 等于1，肯定是回串
        // 等于2，肯定不是
        else {
          result[left][right] = true;
        }
      }

      if (result[left][right] && right - left + 1 > max) {
        max = right - left + 1;
        begin = left;
      }
    }
  }

  return s.substring(begin, begin + max);
}

// 扩散法，遍历中点，往两边扩散
// TODO
function longestPalindrome(s: string): string {
  let max = 1;

  for (let i = 0, l = s.length; i < l; i++) {
    let length = 1;

    let left = i - length;
    let right = i + length;

    if (s[left] === s[i] || s[right] === s[i]) {
      max = Math.max(2, max);
    }

    while (left >= 0 && right <= s.length) {
      if (i[left] === i[right]) {
      }
    }
  }
  return '';
}

console.log(longestPalindrome("bb"));
