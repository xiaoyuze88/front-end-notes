// 假设有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

// 给你一个整数数组 flowerbed 表示花坛，由若干 0 和 1 组成，其中 0 表示没种植花，1 表示种植了花。另有一个数 n ，能否在不打破种植规则的情况下种入 n 朵花？能则返回 true ，不能则返回 false 。

//

// 示例 1：

// 输入：flowerbed = [1,0,0,0,1], n = 1
// 输出：true
// 示例 2：

// 输入：flowerbed = [1,0,0,0,1], n = 2
// 输出：false
//

// 提示：

// 1 <= flowerbed.length <= 2 * 10^4
// flowerbed[i] 为 0 或 1
// flowerbed 中不存在相邻的两朵花
// 0 <= n <= flowerbed.length
import { printResult } from "../utils";

// function canPlaceFlowers(flowerbed: number[], n: number): boolean {
//   let i = -1;

//   let count = 0;

//   // 首先考虑两边都有花，中间为空的case
//   // 找到规律，发现中间的空间与可种的花的规律为 Math.floor((j - i - 2)/2)
//   for (let j = 0, l = flowerbed.length; j < l; j++) {
//     if (flowerbed[j]) {
//       if (i === -1) {
//         count += Math.floor(j / 2);
//       } else {
//         count += Math.floor((j - i - 2) / 2);
//       }

//       i = j;
//     }
//   }

//   // 然后再分别计算全为0和右边还有0的case

//   // 说明全为0
//   if (i === -1) {
//     count += Math.floor((flowerbed.length + 1) / 2);
//   }
//   // 说明右边有空间
//   else if (i !== flowerbed.length - 1) {
//     count += Math.floor((flowerbed.length - i - 1) / 2);
//   }

//   return count >= n;
// }

function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  // 标识当前1的指针
  let k = -1;

  let count = 0;

  for (let i = 0; i < flowerbed.length; i++) {
    if (flowerbed[i]) {
      // 说明左边有空位，左边的规律是 Math.floor(emptyLength / 2)
      if (k === -1) {
        if (i !== 0) {
          count += Math.floor(i / 2);
        }
      }
      // 中间的，规律：
      // 空位偶数, emptyLength / 2 -1
      // 空位奇数, Math.floor(emptyLength / 2)
      else {
        const emptyLength = i - k - 1;

        // 奇数
        if (emptyLength % 2) {
          count += Math.floor(emptyLength / 2);
        } else {
          count += emptyLength / 2 - 1;
        }
      }

      k = i;
    }
  }

  // 说明一个1都没有，所有都是空位
  if (k === -1) {
    const emptyLength = flowerbed.length;
    if (emptyLength % 2) {
      count += Math.floor(emptyLength / 2) + 1;
    } else {
      count += emptyLength / 2;
    }
  }
  // 说明右边有空位，规律跟左空一致
  else if (k !== flowerbed.length - 1) {
    const emptyLength = flowerbed.length - k - 1;

    count += Math.floor(emptyLength / 2);
  }

  return count >= n;
}

// const printResult = (flowerbed: number[], n: number) => {
//   // console.log("result", str);

//   // lengthOfLongestSubstringDP(str);
//   // return;

//   console.log(flowerbed, n, canPlaceFlowers(flowerbed, n));
// };

printResult(canPlaceFlowers, [[0], 1], true);
printResult(canPlaceFlowers, [[0, 0], 1], true);
printResult(canPlaceFlowers, [[0, 0, 0], 2], true);
printResult(canPlaceFlowers, [[1, 0, 0, 0, 1], 1], true);
printResult(canPlaceFlowers, [[1, 0, 0, 0, 0, 0, 1], 2], true);
printResult(canPlaceFlowers, [[0, 0, 0, 1, 0, 0, 0, 0, 0, 1], 3], true);
printResult(canPlaceFlowers, [[0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0], 4], true);
printResult(canPlaceFlowers, [[1, 0, 0, 0, 1], 1], true);
printResult(canPlaceFlowers, [[0, 0, 1, 0, 0], 1], true);
