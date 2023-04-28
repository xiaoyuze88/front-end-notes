// 给定一个经过编码的字符串，返回它解码后的字符串。

// 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

// 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

// 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

//

// 示例 1：

// 输入：s = "3[a]2[bc]"
// 输出："aaabcbc"
// 示例 2：

// 输入：s = "3[a2[c]]"
// 输出："accaccacc"
// 示例 3：

// 输入：s = "2[abc]3[cd]ef"
// 输出："abcabccdcdcdef"
// 示例 4：

// 输入：s = "abc3[cd]xyz"
// 输出："abccdcdcdxyz"
//

// 提示：

// 1 <= s.length <= 30
// s 由小写英文字母、数字和方括号 '[]' 组成
// s 保证是一个 有效 的输入。
// s 中所有整数的取值范围为 [1, 300]

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/decode-string
function decodeString(s: string): string {
  let result = "";

  const stack = [];

  let currentRepeat = "";

  for (let i = 0, l = s.length; i < l; i++) {
    const isNumber = checkIsNumber(s[i]);
    const isString = checkIsString(s[i]);

    if (isString && !stack.length) {
      result += s[i];
      continue;
    }

    if (isNumber) {
      currentRepeat += s[i];
      continue;
    }

    if (s[i] === "[") {
      // 碰到第一级左括号，推出堆栈，保留上下文
      stack.push({
        repeat: currentRepeat,
        string: ""
      });
      currentRepeat = "";
      continue;
    }

    if (s[i] === "]") {
      const { repeat, string } = stack.pop();

      const decodeStr = [...Array(+repeat)].reduce((prev) => prev + string, "");

      // 如果还有上一级，则加到上一级的上下文中去
      // 否则可以直接往结果上去加
      if (stack.length) {
        stack[stack.length - 1].string += decodeStr;
      } else {
        result += decodeStr;
      }

      continue;
    }

    // 到这里认为肯定是普通字符串了
    if (stack.length) {
      stack[stack.length - 1].string += s[i];
    } else {
      result += s[i];
    }
  }

  return result;
}

const checkIsNumber = (s: string) => /\d/.test(s);
const checkIsString = (s: string) => /[a-z]/.test(s);

// console.log(decodeString("3[a]2[bc]"));
console.log(decodeString("3[a2[c]]"));

// function decodeString(s: string): string {
//   let result = "";

//   const stack = [];

//   let currentRepeat = "";
//   let currentString = "";
//   let recording = false;

//   for (let i = 0, l = s.length; i < l; i++) {
//     const isNumber = checkIsNumber(s[i]);
//     const isString = checkIsString(s[i]);

//     // 不需要重复
//     if (!currentRepeat && isString) {
//       result += s[i];
//       continue;
//     }

//     if (isNumber) {
//       currentRepeat += s[i];
//       continue;
//     }

//     if (s[i] === "[") {
//       recording = true;
//       continue;
//     }

//     // 结束，整理推入堆栈
//     if (s[i] === "]") {
//       stack.push({
//         repeat: +currentRepeat,
//         string: currentString
//       });

//       currentRepeat = "";
//       currentString = "";
//       recording = false;
//       continue;
//     }

//     if (recording) {
//       currentString += s[i];
//     }
//   }

//   let current = stack.pop();

//   while (current) {}

//   debugger;

//   return result;
// }
