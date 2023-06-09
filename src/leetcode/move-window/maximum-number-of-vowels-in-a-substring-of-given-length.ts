import { printResult } from "../utils";

// 给你字符串 s 和整数 k 。

// 请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。

// 英文中的 元音字母 为（a, e, i, o, u）。

// 示例 1：

// 输入：s = "abciiidef", k = 3
// 输出：3
// 解释：子字符串 "iii" 包含 3 个元音字母。
// 示例 2：

// 输入：s = "aeiou", k = 2
// 输出：2
// 解释：任意长度为 2 的子字符串都包含 2 个元音字母。
// 示例 3：

// 输入：s = "leetcode", k = 3
// 输出：2
// 解释："lee"、"eet" 和 "ode" 都包含 2 个元音字母。
// 示例 4：

// 输入：s = "rhythms", k = 4
// 输出：0
// 解释：字符串 s 中不含任何元音字母。
// 示例 5：

// 输入：s = "tryhard", k = 4
// 输出：1
//

// 提示：

// 1 <= s.length <= 10^5
// s 由小写英文字母组成
// 1 <= k <= s.length

const vowels = "aeiou";

// 还是先统计元音总和
// 然后固定窗口长度遍历，依次增减，比较最大值
function maxVowels(s: string, k: number): number {
  let lastCount = [...Array(k)].reduce((prev, next, index) => {
    return prev + countVowel(s[index]);
  }, 0);

  let max = lastCount;

  for (let i = 1, l = s.length - k + 1; i < l; i++) {
    lastCount = lastCount - countVowel(s[i - 1]) + countVowel(s[i + k - 1]);

    max = Math.max(lastCount, max);
  }

  return max;
}

function countVowel(char: string): number {
  return vowels.includes(char) ? 1 : 0;
}

printResult(maxVowels, ["abciiidef", 3], 3);
printResult(maxVowels, ["aeiou", 2], 2);
printResult(maxVowels, ["leetcode", 3], 2);
printResult(maxVowels, ["rhythms", 4], 0);
printResult(maxVowels, ["tryhard", 4], 1);
