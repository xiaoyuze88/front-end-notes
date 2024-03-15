// https://leetcode.cn/explore/interview/card/bytedance/242/string/1016/
// 字符串的排列
// 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。

import { printResult } from "../../utils";

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

// 顺序无关，字母个数匹配即可
function checkInclusion1(s1: string, s2: string): boolean {
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

function checkInclusion2(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const countMap = (string: string): CountMap => {
    const map = {};

    for (let i = 0, l = string.length; i < l; i++) {
      if (!map[string[i]]) map[string[i]] = 0;

      map[string[i]]++;
    }

    return map;
  };

  const diffMap = (map1: CountMap, map2: CountMap) => {
    for (let i = 0, l = alphabet.length; i < l; i++) {
      if (map1[alphabet[i]] !== map2[alphabet[i]]) {
        return false;
      }
    }

    return true;
  };

  const map1 = countMap(s1);

  for (let i = 0, l = s2.length - s1.length + 1; i < l; i++) {
    const substring = s2.substring(i, i + s1.length);

    countMap(substring);
  }
}

// 滑动窗口
function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  const arr1 = Array(26).fill(0);
  const arr2 = Array(26).fill(0);

  const doCount = (array: number[], char: string, isMinus?: boolean) => {
    if (!isMinus) {
      array[char.charCodeAt(0) - "a".charCodeAt(0)]++;
    } else {
      array[char.charCodeAt(0) - "a".charCodeAt(0)]--;
    }
  };

  for (let i = 0, l = s1.length; i < l; i++) {
    doCount(arr1, s1[i]);
  }

  const countStr1 = arr1.join("");

  for (let i = 0, l = s2.length; i < l; i++) {
    // 还不够长，直接加
    if (i <= s1.length - 1) {
      doCount(arr2, s2[i]);
    } else {
      // 超出了，加上当前，减掉第一个
      doCount(arr2, s2[i]);
      doCount(arr2, s2[i - s1.length], true);
    }

    // 此时长度是匹配的，直接比较
    if (countStr1 === arr2.join("")) return true;
  }

  return false;
}

// printResult(checkInclusion, ["ab", "eidbaooo"], true);
// printResult(checkInclusion, ["ab", "eidboaoo"], false);
// printResult(checkInclusion, ["adc", "dcda"], true);

printResult(checkInclusion, ["a", "ab"], true);
// printResult(checkInclusion, ["ab", "eidboaoo"], false);
// printResult(checkInclusion, ["adc", "dcda"], true);
