// https://leetcode.cn/explore/interview/card/bytedance/242/string/1016/
// 字符串的排列
// 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。

import { printResult } from "../utils";

// 换句话说，s1 的排列之一是 s2 的 子串 。

// 示例 1：

// 输入：s1 = "ab" s2 = "eidbaooo"
// 输出：true
// 解释：s2 包含 s1 的排列之一 ("ba").
// 示例 2：

// 输入：s1= "ab" s2 = "eidboaoo"
// 输出：false

// 提示：

// 1 <= s1.length, s2.length <= 104
// s1 和 s2 仅包含小写字母

type CountMap = {
  [key: string]: number;
};

function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const countMap = (string: string) => {
    const map: CountMap = {};

    for (let i = 0, l = string.length; i < l; i++) {
      if (!map[string[i]]) map[string[i]] = 1;
      else map[string[i]]++;
    }

    return map;
  };

  // 比较map2是否一致
  const checkMapInclusion = (map1: CountMap, map2: CountMap) => {
    for (let i = 0, l = alphabet.length; i < l; i++) {
      if ((map2[alphabet[i]] || 0) !== (map1[alphabet[i]] || 0)) {
        return false;
      }
    }

    return true;
  };

  const s1Map = countMap(s1);

  // console.log("s1map", s1Map);

  for (let i = 0, l = s2.length; i <= l; i++) {
    for (let j = 0, j_l = s2.length; j <= j_l; j++) {
      const substringLen = j - i;

      // 不够长继续
      if (substringLen !== s1.length) continue;

      // 超出了退出
      if (j - i > s1.length) break;

      const s2Map = countMap(s2.substring(i, j));

      // console.log(
      //   "i, j",
      //   i,
      //   j,
      //   s2.substring(i, j),
      //   s2Map,
      //   checkMapInclusion(s1Map, s2Map)
      // );

      if (checkMapInclusion(s1Map, s2Map)) {
        return true;
      }
    }
  }

  return false;
}

// printResult(checkInclusion, ["ab", "eidbaooo"], true);
// printResult(checkInclusion, ["ab", "eidboaoo"], false);
printResult(checkInclusion, ["adc", "dcda"], true);
