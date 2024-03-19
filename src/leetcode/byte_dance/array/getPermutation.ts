// https://leetcode.cn/explore/interview/card/bytedance/243/array-and-sorting/1021/
// 题解：https://leetcode.cn/problems/permutation-sequence/solutions/401574/di-kge-pai-lie-by-leetcode-solution/
// 排列序列
// 给出集合 [1,2,3,...,n]，其所有元素共有 n! 种排列。

import { printResult } from "../../utils";

// 按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：

// "123"
// "132"
// "213"
// "231"
// "312"
// "321"
// 给定 n 和 k，返回第 k 个排列。

// 示例 1：

// 输入：n = 3, k = 3
// 输出："213"
// 示例 2：

// 输入：n = 4, k = 9
// 输出："2314"
// 示例 3：

// 输入：n = 3, k = 1
// 输出："123"

// 提示：

// 1 <= n <= 9
// 1 <= k <= n!

/**
 * 解法:
 * 1. 找规律，逐渐缩小范围
 */

const factorial = (n: number) => {
  let result = 1;

  while (n > 1) {
    result = result * n;
    n--;
  }

  return result;
};

// 找规律
function getPermutation(n: number, k: number): string {
  // 找到的推进来
  const stack = [];

  // 剩下合法的数字
  let numberLeft = Array(n)
    .fill(0)
    .map((_, index) => index + 1);

  // 够数则返回
  while (stack.length <= n) {
    console.log("numberLeft", numberLeft);

    // k为1直接返回第一个
    if (k === 1) {
      const first = numberLeft.shift();

      stack.push(first);
      console.log("k == numberLeft.length", first, stack);
    } else {
      // 依次找第一个数，排除第一个数后，剩下的数的组合数为 (n - 1)!
      const numberRightFactorial = factorial(numberLeft.length - 1);

      // k 除以 剩下数的组合数，可以得到当前首位在第几个数
      const prefixIndex = Math.floor((k - 1) / numberRightFactorial);

      // 找到首位
      const prefixNum = numberLeft[prefixIndex];

      // k 减去当前首位前面的所有组合数，下一轮找在确定首位的情况下剩下的组合情况
      k = k - prefixIndex * numberRightFactorial;

      // 找到首位，推入
      stack.push(prefixNum);
      // 删掉已经确定的首位
      numberLeft.splice(prefixIndex, 1);

      console.log("prefix", prefixNum, {
        numberRightFactorial,
        prefixIndex,
        prefixNum,
        numberLeft,
        stack,
        k,
      });
    }
  }

  console.log("stack", stack);

  return stack.join("");
}

// printResult(getPermutation, [3, 3], '213');
// printResult(getPermutation, [4, 9], '2314');
// printResult(getPermutation, [3, 1], '123');
// printResult(getPermutation, [2, 2], '21');
// printResult(getPermutation, [3, 2], '132');
// printResult(getPermutation, [3, 5], '312');
