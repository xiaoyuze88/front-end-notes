// 给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，计算其二进制表示中 1 的个数 ，返回一个长度为 n + 1 的数组 ans 作为答案。

import { printResult } from "../utils";

//

// 示例 1：

// 输入：n = 2
// 输出：[0,1,1]
// 解释：
// 0 --> 0
// 1 --> 1
// 2 --> 10
// 示例 2：

// 输入：n = 5
// 输出：[0,1,1,2,1,2]
// 解释：
// 0 --> 0
// 1 --> 1
// 2 --> 10
// 3 --> 11
// 4 --> 100
// 5 --> 101
//

// 提示：

// 0 <= n <= 105
//

// 进阶：

// 很容易就能实现时间复杂度为 O(n log n) 的解决方案，你可以在线性时间复杂度 O(n) 内用一趟扫描解决此问题吗？
// 你能不使用任何内置函数解决此问题吗？（如，C++ 中的 __builtin_popcount ）

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/counting-bits
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function countBits(n: number): number[] {
  return [...Array(n + 1)].map((_, i) => oneBitCount(i));
}

// 一比特数算法
// n & n-1，会将n最后一个1变成0，所以重复操作k次后n将变为0，此k即是n的1的个数
function oneBitCount(n: number) {
  let count = 0;

  while (n > 0) {
    n = n & (n - 1);
    count++;
  }

  return count;
}

// console.log(oneBitCount(2));
printResult(countBits, [2], [0, 1, 1]);
