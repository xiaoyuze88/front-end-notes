// 给你三个正整数 a、b 和 c。

import { printResult } from "../utils";

// 你可以对 a 和 b 的二进制表示进行位翻转操作，返回能够使按位或运算   a OR b == c  成立的最小翻转次数。

// 「位翻转操作」是指将一个数的二进制表示任何单个位上的 1 变成 0 或者 0 变成 1 。

//

// 示例 1：

// 输入：a = 2, b = 6, c = 5
// 输出：3
// 解释：翻转后 a = 1 , b = 4 , c = 5 使得 a OR b == c
// 示例 2：

// 输入：a = 4, b = 2, c = 7
// 输出：1
// 示例 3：

// 输入：a = 1, b = 2, c = 3
// 输出：0
//

// 提示：

// 1 <= a <= 10^9
// 1 <= b <= 10^9
// 1 <= c <= 10^9

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/minimum-flips-to-make-a-or-b-equal-to-c
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

function minFlips(a: number, b: number, c: number): number {
  // 10^9 ，最大为30位二进制
  const binaryA = genBinary(a, 30);
  const binaryB = genBinary(b, 30);
  const binaryC = genBinary(c, 30);

  let count = 0;

  // 依次按位计算
  for (let i = 0; i < 30; i++) {
    // 若 ci = 0,则只有 ai=0&bi=1 或 ai=1&bi=0 或 ai=0 & bi = 0，
    // 其中为1的需要反转一次，为0的无需反转，故 count+=ai+bi
    if (binaryC[i] === "0") {
      count += +binaryA[i] + +binaryB[i];
    }
    // ci=1，则有 ai=0&bi=1 或 ai=1&bi=1 或 ai=1&bi=0
    else {
      // 任一为1则无需反转
      if (binaryA[i] === "1" || binaryB[i] === "1") {
        count += 0;
      } else {
        // 否则反转任一个即可
        count += 1;
      }
    }
  }

  return count;
}

function genBinary(n: number, size: number) {
  let binary = n.toString(2);

  return (
    Array(size - binary.length)
      .fill(0)
      .join("") + binary
  );
}

function minFlips_pureBinary(a: number, b: number, c: number): number {
  let bitA: number;
  let bitB: number;
  let bitC: number;

  let count = 0;

  // 依次按位计算
  for (let i = 0; i < 30; i++) {
    bitA = getNthBit(a, i);
    bitB = getNthBit(b, i);
    bitC = getNthBit(c, i);

    // ci为0，则需要反转ai+bi
    if (bitC === 0) {
      count += bitA + bitB;
    } else {
      // ci为1，则ai/bi任一要为1

      // 任一为1则无需操作
      if (!bitA && !bitB) {
        count += 1;
      }
    }
  }

  return count;
}

// 返回第i位（i从0开始，从右往左）的二进制数
function getNthBit(n: number, nth: number) {
  return (n >> nth) & 1;
}

printResult(minFlips_pureBinary, [2, 6, 5], 3);
