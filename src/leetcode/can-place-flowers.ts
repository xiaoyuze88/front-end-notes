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
function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  let i = -1;

  let count = 0;

  for (let j = 0, l = flowerbed.length; j < l; j++) {
    if (flowerbed[j]) {
      if (i === -1) {
        count += Math.floor(j / 2);
      } else {
        count += Math.floor((j - i - 2) / 2);
      }

      i = j;
    }
  }

  // 说明全为0
  if (i === -1) {
    count += Math.floor((flowerbed.length + 1) / 2);
  }
  // 说明右边有空间
  else if (i !== flowerbed.length - 1) {
    count += Math.floor((flowerbed.length - i - 1) / 2);
  }

  return count >= n;
}

const printResult = (flowerbed: number[], n: number) => {
  // console.log("result", str);

  // lengthOfLongestSubstringDP(str);
  // return;

  console.log(flowerbed, n, canPlaceFlowers(flowerbed, n));
};

// printResult([0], 1);
// printResult([0, 0], 1);
// printResult([0, 0, 0], 2);
// printResult([1, 0, 0, 0, 1], 1);
// printResult([1, 0, 0, 0, 0, 0, 1], 2);
// printResult([0, 0, 0, 1, 0, 0, 0, 0, 0, 1], 3);
// printResult([0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0], 4);
// printResult([1, 0, 0, 0, 1], 1);
printResult([0, 0, 1, 0, 0], 1);
