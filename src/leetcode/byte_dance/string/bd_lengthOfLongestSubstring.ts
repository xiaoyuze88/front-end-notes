// https://leetcode.cn/explore/interview/card/bytedance/242/string/1012/
// 无重复字符的最长子串
// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

import { printResult } from "../../utils";

// 示例 1:

// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// 示例 2:

// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// 示例 3:

// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

// 提示：

// 0 <= s.length <= 5 * 104
// s 由英文字母、数字、符号和空格组成

function lengthOfLongestSubstring(string: string) {
  if (string.length <= 1) return string.length;

  let i = 0;
  let j = 1;

  let max = 0;

  const updateMax = (current: number) => {
    if (current > max) {
      max = current;
      // console.log("update max", max);
    }
  };

  while (true) {
    if (j > string.length) {
      updateMax(j - 1 - i);
      break;
    }

    if (i === j) {
      j++;
    }

    // console.log("i,j", i, j, string.substring(i, j));

    if (string.substring(i, j).includes(string[j])) {
      updateMax(j - i);
      i++;
    } else {
      j++;
    }
  }

  return max;
}

printResult(lengthOfLongestSubstring, ["abcabcbb"], 3);
printResult(lengthOfLongestSubstring, ["bbbbb"], 1);
printResult(lengthOfLongestSubstring, ["pwwkew"], 3);
printResult(lengthOfLongestSubstring, ["au"], 2);
