// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

import { printResult } from "../utils";

// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

//

// 示例 1：

// 输入：digits = "23"
// 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
// 示例 2：

// 输入：digits = ""
// 输出：[]
// 示例 3：

// 输入：digits = "2"
// 输出：["a","b","c"]
//

// 提示：

// 0 <= digits.length <= 4
// digits[i] 是范围 ['2', '9'] 的一个数字。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/letter-combinations-of-a-phone-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
const digitMap = {
  2: "abc",
  3: "def",
  4: "ghi",
  5: "jkl",
  6: "mno",
  7: "pqrs",
  8: "tuv",
  9: "wxyz"
};

function letterCombinations(digits: string): string[] {
  const result: string[] = [];

  if (!digits.length) return result;

  backtrack(result, digits);

  return result;
}

function backtrack(
  combinations: string[],
  digits: string,
  digitIndex: number = 0,
  combination: string = ""
) {
  if (combination.length === digits.length) {
    combinations.push(combination);
    return;
  }

  const digit = digits.charAt(digitIndex);

  const digitString = digitMap[digit];

  for (let i = 0, l = digitString.length; i < l; i++) {
    combination += digitString[i];
    backtrack(combinations, digits, digitIndex + 1, combination);
    combination = combination.substring(0, combination.length - 1);
  }
}

printResult(letterCombinations, ["23"], ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]);
