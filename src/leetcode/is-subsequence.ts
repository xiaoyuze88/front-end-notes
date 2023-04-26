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

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function isSubsequenceDp(s: string, t: string): boolean {
  
}

console.log(isSubsequence("abc", "ahbgdc"));
