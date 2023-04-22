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

function lengthOfLongestSubstring(s: string): number {
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
  };

  // 指针平移，每次碰到的字符及其数量记入 map
  // 1. 若平移到某一个字符发现计数>1
  // 说明当前字符有重复，如果此时前面字符串无重复，则更新最大值为Max(map count, latestMax)
  // 接下来此时有两种case：
  // 1.1 最左边字符与当前字符相同，此时最左剔除，当前加入，一增一减map无变化
  // 1.2 最左边字符不等于当前字符，此时将最左边一位字符从map中递减1（若为0则从map中剔除），相当于窗口平移，而当前值+1
  // 2. 若指针指向的字符未重复，但是当前字符串中已有重复字符，说明原本已有重复（如：bacad 遍历到 d 时，此时map中包含：{ a: 2, c: 1 }），此时仍将最左边一位减一，且当前值+1
  // 3. 当前值无重复，且当前map中也无重复，当前值+1
  // 遍历一遍到结尾，最后判断一次 Max(map count, latestMax)，然后返回最大值
  for (let i = 0, l = s.length; i < l; i++) {
    const duplicatedKey = hasDuplicate();

    // 每当有重复，则剔除最左边一个
    if (map[s[i]]) {
      // 如果当前值有重复且前面的字符串无重复，更新最大值
      if (!duplicatedKey) {
        maxCount = Math.max(getMaxCount(), maxCount);
      }

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

  maxCount = Math.max(getMaxCount(), maxCount);

  return maxCount;
}

// dp[i][j]: boolean 表示s从i~j的字符串是否无重复
// 状态转移：dp[i][j] = dp[i][j-1] & !(s[j - 1] in s[i - 1]~s[j - 1])
// 有解，但是根据条件 s.length < 5 * 10^4 ，此时 dp 数组会内存溢出.
function lengthOfLongestSubstringDP(s) {
  const dp = [...Array(s.length + 1)].map(() => Array(s.length + 1).fill(false));

  dp[0][0] = true;
  if (s.length > 0) {
    dp[0][1] = true;
  }

  for (let i = 0, l = s.length + 1; i < l; i++) {
    dp[i][i] = true;
  }

  // console.log('dp', dp);

  let max = s.length > 0 ? 1 : 0;

  // i < j
  for (let i = 1, l_i = s.length + 1; i < l_i; i++) {
    for (let j = i + 1, l_j = s.length + 1; j < l_j; j++) {
      const prevStr = s.substring(i - 1, j - 1);

      if (!prevStr.includes(s[j - 1])) {
        dp[i][j] = dp[i][j - 1];
        if (dp[i][j]) {
          // console.log('try set max', max, i, j, j - i + 1);
          max = Math.max(max, j - i + 1);
        }
      }
    }
  }

  // console.log('dp', dp);

  return max;
}

const printResult = (str, expect) => {
  // console.log("result", str);

  // lengthOfLongestSubstringDP(str);
  // return;

  console.log(
    str,
    lengthOfLongestSubstringDP(str),
    "expect: ",
    expect,
    lengthOfLongestSubstringDP(str) === expect
  );
};

printResult("abcabcbb", 3);
printResult("bbbbb", 1);
printResult("pwwkew", 3);
printResult(" ", 1);
printResult("", 0);
printResult("dvdf", 3);
printResult("qrsvbspk", 5);
printResult("aab", 2);