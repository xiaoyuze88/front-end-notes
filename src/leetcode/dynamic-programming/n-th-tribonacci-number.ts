// 泰波那契序列 Tn 定义如下：

import { printResult } from "../utils";

// T0 = 0, T1 = 1, T2 = 1, 且在 n >= 0 的条件下 Tn+3 = Tn + Tn+1 + Tn+2

// 给你整数 n，请返回第 n 个泰波那契数 Tn 的值。

//

// 示例 1：

// 输入：n = 4
// 输出：4
// 解释：
// T_3 = 0 + 1 + 1 = 2
// T_4 = 1 + 1 + 2 = 4
// 示例 2：

// 输入：n = 25
// 输出：1389537
//

// 提示：

// 0 <= n <= 37
// 答案保证是一个 32 位整数，即 answer <= 2^31 - 1。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/n-th-tribonacci-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function tribonacci(n: number): number {
  let d_1 = 0;
  let d_2 = 1;
  let d_3 = 1;
  let d_4: number;

  if (n <= 2) {
    switch (n) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 1;
    }
  }

  // d[n] = Tn-3 + Tn-2 + Tn-1
  for (let i = 2, l = n; i < l; i++) {
    // console.log(i);
    d_4 = d_1 + d_2 + d_3;
    d_1 = d_2;
    d_2 = d_3;
    d_3 = d_4;
  }

  return d_4;
}

// printResult(tribonacci, [4], 4);
printResult(tribonacci, [25], 1389537);
