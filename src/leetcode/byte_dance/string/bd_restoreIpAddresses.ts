// https://leetcode.cn/explore/interview/card/bytedance/242/string/1044/
// 复原 IP 地址
// 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

import { printResult } from "../../utils";

// 例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
// 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。

// 示例 1：

// 输入：s = "25525511135"
// 输出：["255.255.11.135","255.255.111.35"]
// 示例 2：

// 输入：s = "0000"
// 输出：["0.0.0.0"]
// 示例 3：

// 输入：s = "101023"
// 输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

// 提示：

// 1 <= s.length <= 20
// s 仅由数字组成

const eqList = (l1: string[], l2: string[]) => {
  return l1.length === l2.length && l1.every((item) => l2.includes(item));
};

printResult(
  restoreIpAddresses,
  ["25525511135"],
  ["255.255.11.135", "255.255.111.35"],
  eqList
);
printResult(restoreIpAddresses, ["0000"], ["0.0.0.0"], eqList);
printResult(
  restoreIpAddresses,
  ["101023"],
  ["1.0.10.23", "1.0.102.3", "10.1.0.23", "10.10.2.3", "101.0.2.3"],
  eqList
);

// 每个整数位于 0 到 255 之间组成，且不能含有前导 0
function isValidIpWidget(s: string) {
  if (s === "0") return true;

  if (s.startsWith("0")) return false;
  if (s.length > 3) return false;

  const num = +s;

  return num >= 0 && num <= 255;
}

// 核心就是回溯
function restoreIpAddresses2(s: string): string[] {
  const results: Set<string> = new Set<string>();

  function backTrace({
    stringLeft,
    currentStack,
    currentIndex,
  }: {
    stringLeft: string;
    currentStack: string[];
    currentIndex: number;
  }) {
    // console.log("backTracing", {
    //   stringLeft,
    //   currentStack,
    //   currentIndex,
    // });

    if (currentIndex === 0) currentIndex++;
    if (!stringLeft) {
      if (currentStack.length === 4) {
        // console.log("valid one", currentStack.join("."));

        results.add(currentStack.join("."));
      } else {
        // console.log("no string left, return");
      }
      return;
    }

    // 如果没空间了，直接退出了不用往下
    if (currentStack.length >= 4) return;

    while (currentIndex <= 3) {
      const stringWidget = stringLeft.substring(0, currentIndex);

      // 只要合法都往下尝试
      if (isValidIpWidget(stringWidget)) {
        backTrace({
          stringLeft: stringLeft.substring(currentIndex),
          // 合法就推入
          currentStack: [...currentStack, stringWidget],
          currentIndex: 1,
        });

        currentIndex++;
      } else {
        // console.log("widget not valid", stringWidget);
        break;
      }
    }
  }

  if (s.length >= 4 && s.length <= 12) {
    backTrace({
      stringLeft: s,
      currentStack: [],
      currentIndex: 1,
    });
  }

  return Array.from(results);
}

function restoreIpAddresses(s: string): string[] {
  const results = new Set<string>();

  function backTrace({
    string,
    stack,
  }: {
    string: string;
    stack: string[];
  }) {
    if (stack.length === 4 && !string) {
      results.add(stack.join('.'));
      return;
    }

    for (let i = 1, l = string.length; i <= l; i++) {
      const prefix = string.substring(0, i);

      if (isValidIpWidget(prefix)) {
        stack.push(prefix);

        backTrace({
          stack,
          string: string.substring(i),
        });

        stack.pop();
      }
    }
  }

  backTrace({
    string: s,
    stack: [],
  });

  return Array.from(results);
}
