// // 示例 1:

// // 输入: s = "abcabcbb"
// // 输出: 3
// // 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
// // 示例 2:

// // 输入: s = "bbbbb"
// // 输出: 1
// // 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
// // 示例 3:

// // 输入: s = "pwwkew"
// // 输出: 3
// // 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
// //      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
// // 0 <= s.length <= 5 * 104
// // s 由英文字母、数字、符号和空格组成

function lengthOfLongestSubstring1(s: string): number {
  let maxCount = 0;

  const map = {};

  const getMaxCount = () => {
    let count = 0;

    Object.keys(map).forEach((key) => {
      count += map[key];
    });

    return count;
  };

  const hasDuplicate = () => {
    const keys = Object.keys(map);

    for (let i = 0, l = keys.length; i < l; i++) {
      if (map[keys[i]] > 1) {
        return keys[i];
      }
    }

    return false;
  };

  const dumpKey = (key) => {
    if (map[key] - 1 === 0) {
      delete map[key];
    } else {
      map[key] = map[key] - 1;
    }
  };

  const addKey = (key) => {
    if (!map[key]) map[key] = 0;

      map[key]++;
  }

  for (let i = 0, l = s.length; i < l; i++) {
    // console.log("map", s[i], map, map[s[i]], hasDuplicate(), getMaxCount(), maxCount);

    const duplicatedKey = hasDuplicate();

    // 每当有重复，则剔除最左边一个
    // 判重逻辑有问题，不能只看当前元素是否重复，移动过程中其他也可能仍然重复，此时仍要剔除最左侧元素
    if (map[s[i]]) {
      // 设置最大值
      maxCount = Math.max(getMaxCount(), maxCount);

      // 如果最左边元素不等于当前元素，则剔除最左边一个元素(-1)
      if (s[i - maxCount] !== s[i]) {
        dumpKey(s[i - maxCount]);

        // 且当前值+1
        map[s[i]]++;
      } else {
        // 否则一加一减无需操作
      }
    }
    // 当前值无重复，但是列表中有重复的，相当于无损平移，当前值加入映射，最左值退出映射
    else if (duplicatedKey) {
      dumpKey(s[i - maxCount]);
      addKey(s[i]);
    } else {
      addKey(s[i]);
    }
  }

  // console.log("final", map, getMaxCount(), maxCount);

  maxCount = Math.max(getMaxCount(), maxCount);

  return maxCount;
}

function lengthOfLongestSubstring(s: string): number {
  let maxCount = 0;

  const map = {};

  let i = 0;

  while (i < s.length) {
    if (map[s[i]]) {
      // 拿到当前长度，找到重复的元素的下标，然后直接平移maxCount个单位
      maxCount = Math.max(maxCount, Object.keys(map).length);
    } else {
      map[s[i]] = i;
    }
  }

  return maxCount;
}

const printResult = (str, expect) => {
  // console.log("result", str);

  console.log(
    str,
    lengthOfLongestSubstring(str),
    "expect: ",
    expect,
    lengthOfLongestSubstring(str) === expect
  );
};

printResult("abcabcbb", 3);
printResult("bbbbb", 1);
printResult("pwwkew", 3);
printResult(" ", 1);
printResult("", 0);
printResult("dvdf", 3);
printResult("qrsvbspk", 5);
