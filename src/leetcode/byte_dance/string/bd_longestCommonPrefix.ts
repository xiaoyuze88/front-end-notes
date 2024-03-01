// https://leetcode.cn/explore/interview/card/bytedance/242/string/1014/
// 最长公共前缀
// 编写一个函数来查找字符串数组中的最长公共前缀。

import { printResult } from "../../utils";

// 如果不存在公共前缀，返回空字符串 ""。

// 示例 1：

// 输入：strs = ["flower","flow","flight"]
// 输出："fl"
// 示例 2：

// 输入：strs = ["dog","racecar","car"]
// 输出：""
// 解释：输入不存在公共前缀。

// 提示：

// 1 <= strs.length <= 200
// 0 <= strs[i].length <= 200
// strs[i] 仅由小写英文字母组成

// 因为是前缀，直接从前往后遍历即可

function longestCommonPrefix2(strs: string[]): string {
  if (strs.length <= 1) return strs[0] || "";

  const minLen = Math.min(...strs.map((s) => s.length));

  let maxIndex = 0;

  for (let i = 0, l = minLen; i < l; i++) {
    for (let j = 1, j_l = strs.length; j < j_l; j++) {
      // console.log("i,j", i, j, strs[j][i], strs[0][i]);

      if (strs[j][i] !== strs[0][i]) {
        return strs[0].substring(0, i);
      }
    }
    maxIndex = i + 1;
  }

  return strs[0].substring(0, maxIndex);
}

function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 1) return strs[0];

  const minLen = Math.min(...strs.map(s => s.length));

  let maxPrefix = '';

  for (let i = 1, l = minLen; i <= l; i++) {
    let prefix = strs[0].substring(0, i);

    // console.log('prefix', prefix)

    for (let j = 1, l_j = strs.length; j < l_j; j++) {
      if (!strs[j].startsWith(prefix)) {
        // console.log('prefix not match', strs[j]);
        prefix = '';
        break;
      }
    }

    if (prefix.length >= maxPrefix.length) {
      maxPrefix = prefix;
    }
  }

  return maxPrefix;
}

printResult(longestCommonPrefix, [["flower", "flow", "flight"]], "fl");
printResult(longestCommonPrefix, [["dog", "racecar", "car"]], "");
printResult(longestCommonPrefix, [["a"]], "a");
printResult(longestCommonPrefix, [["ab", "a"]], "a");
