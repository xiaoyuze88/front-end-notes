// 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

// 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

// 进阶：

// 如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？

// 致谢：

// 特别感谢 @pbrother 添加此问题并且创建所有测试用例。

//

// 示例 1：

// 输入：s = "abc", t = "ahbgdc"
// 输出：true
// 示例 2：

// 输入：s = "axc", t = "ahbgdc"
// 输出：false
//

// 提示：

// 0 <= s.length <= 100
// 0 <= t.length <= 10^4
// 两个字符串都只由小写字符组成。
function isSubsequence(s: string, t: string): boolean {
  let s_i = 0;
  let t_i = 0;

  // 双指针，一个指向s一个指向t
  // 如果不相等则移动t，相等则s/t都移动
  // 最后比较比较s指针的下标是否等于字符串长度
  while (s_i < s.length && t_i < t.length) {
    if (s[s_i] !== t[t_i]) {
      t_i++;
    } else {
      s_i++;
      t_i++;
    }
  }

  return s_i === s.length;
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";

// 先预处理t
// dp[i][j] 表示t中第i个字符，往后j字符第一次出现的位置
function isSubsequenceDp(s: string, t: string): boolean {
  // dp[i][j] = i && t[i] === j
  // dp[i][j] = dp[i + 1][j] && t[i] !== j
  const dp: number[][] = [...Array(t.length + 1)].map(() => [...Array(alphabet.length)].fill(0));

  for (let i = 0, l = alphabet.length; i < l; i++) {
    // 最后一个字符，后面任何数都认为是它自己的下标
    dp[t.length][i] = -1;
  }

  for (let i = t.length - 1; i >= 0; i--) {
    for (let j = 0, l = alphabet.length; j < l; j++) {
      // console.log("i", i, "j", j, "t[i]", t[i], "j", alphabet[j]);

      if (t[i] === alphabet[j]) {
        dp[i][j] = i;
      } else {
        dp[i][j] = dp[i + 1][j];
      }
    }
  }

  // console.log(dp);

  // currentIndex 表示当前正在比较的 t 中的下标
  let currentIndex = 0;

  for (let i = 0, l = s.length; i < l; i++) {
    const j = alphabet.indexOf(s[i]);
    
    // console.log('i: ', i, ', s[i]: ', s[i], ', j', j, ', currentIndex: ', currentIndex);

    // t currentIndex 的字符，下一个 s[i] 不存在，则表示不匹配
    if (dp[currentIndex][j] === -1) {
      return false;
    }

    // 到这里表示 t 中第 dp[currentIndex][j] 下标的字符匹配 s[i]，将currentIndex 右移一位
    currentIndex = dp[currentIndex][j] + 1;
  }

  return true;
}

// console.log(isSubsequenceDp("abc", "ahbgdc"));
console.log(isSubsequenceDp("aaaaaa", "bbaaaa"));
