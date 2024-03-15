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

function lengthOfLongestSubstring2(string: string) {
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

function lengthOfLongestSubstring(string: string): number {
  if (string.length <= 1) return string.length;

  let maxCount = 0;

  let l = 0;
  let r = 1;

  const updateMax = (current: number) => {
    if (current >= maxCount) maxCount = current;
  };

  while (r <= string.length) {
    const s = string.substring(l, r);

    // 当前字符串不包含右指针
    if (!s.includes(string[r])) {
      if (r >= string.length) {
        // console.log('r out of range, update max', r - l);
        updateMax(r - l);
        break;
      }

      r++;
      // console.log('move r', r);
    } else {
      // console.log('update current', r - l);
      updateMax(r - l);

      l++;

      // console.log('move l', l);

      if (l >= r) {
        r++;
        // console.log('move r too', r);
      }
    }
  }

  return maxCount;
}

printResult(lengthOfLongestSubstring, ["abcabcbb"], 3);
printResult(lengthOfLongestSubstring, ["bbbbb"], 1);
printResult(lengthOfLongestSubstring, ["pwwkew"], 3);
printResult(lengthOfLongestSubstring, ["au"], 2);
