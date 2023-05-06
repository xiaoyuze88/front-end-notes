// 给你两个正整数数组 spells 和 potions ，长度分别为 n 和 m ，其中 spells[i] 表示第 i 个咒语的能量强度，potions[j] 表示第 j 瓶药水的能量强度。

import { printResult } from "../utils";

// 同时给你一个整数 success 。一个咒语和药水的能量强度 相乘 如果 大于等于 success ，那么它们视为一对 成功 的组合。

// 请你返回一个长度为 n 的整数数组 pairs，其中 pairs[i] 是能跟第 i 个咒语成功组合的 药水 数目。

//

// 示例 1：

// 输入：spells = [5,1,3], potions = [1,2,3,4,5], success = 7
// 输出：[4,0,3]
// 解释：
// - 第 0 个咒语：5 * [1,2,3,4,5] = [5,10,15,20,25] 。总共 4 个成功组合。
// - 第 1 个咒语：1 * [1,2,3,4,5] = [1,2,3,4,5] 。总共 0 个成功组合。
// - 第 2 个咒语：3 * [1,2,3,4,5] = [3,6,9,12,15] 。总共 3 个成功组合。
// 所以返回 [4,0,3] 。
// 示例 2：

// 输入：spells = [3,1,2], potions = [8,5,8], success = 16
// 输出：[2,0,2]
// 解释：
// - 第 0 个咒语：3 * [8,5,8] = [24,15,24] 。总共 2 个成功组合。
// - 第 1 个咒语：1 * [8,5,8] = [8,5,8] 。总共 0 个成功组合。
// - 第 2 个咒语：2 * [8,5,8] = [16,10,16] 。总共 2 个成功组合。
// 所以返回 [2,0,2] 。
//

// 提示：

// n == spells.length
// m == potions.length
// 1 <= n, m <= 105
// 1 <= spells[i], potions[i] <= 105
// 1 <= success <= 1010

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/successful-pairs-of-spells-and-potions
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function successfulPairs(spells: number[], potions: number[], success: number): number[] {
  potions.sort((a, b) => (a > b ? 1 : -1));

  return spells.map((spell) => find(potions, spell, success));
}

function find(potions: number[], spell: number, success: number) {
  let left = 0;
  let right = potions.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // 满足条件，则目标在左边
    if (potions[mid] * spell >= success) {
      right = mid - 1;
    }
    // 不满足条件，目标在右边
    else {
      left = mid + 1;
    }
  }

  return potions.length - right - 1;
}

// printResult(successfulPairs, [[5, 1, 3], [1, 2, 3, 4, 5], 7], [4, 0, 3]);
// printResult(successfulPairs, [[3, 1, 2], [8, 5, 8], 16], [2, 0, 2]);

printResult(successfulPairs, [[6], [27, 37, 33, 34, 14, 7, 23, 12, 22, 37], 43], [9]);
