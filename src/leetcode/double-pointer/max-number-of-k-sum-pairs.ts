// 给你一个整数数组 nums 和一个整数 k 。

// 每一步操作中，你需要从数组中选出和为 k 的两个整数，并将它们移出数组。

// 返回你可以对数组执行的最大操作数。

//

// 示例 1：

// 输入：nums = [1,2,3,4], k = 5
// 输出：2
// 解释：开始时 nums = [1,2,3,4]：
// - 移出 1 和 4 ，之后 nums = [2,3]
// - 移出 2 和 3 ，之后 nums = []
// 不再有和为 5 的数对，因此最多执行 2 次操作。
// 示例 2：

// 输入：nums = [3,1,3,4,3], k = 6
// 输出：1
// 解释：开始时 nums = [3,1,3,4,3]：
// - 移出前两个 3 ，之后nums = [1,4,3]
// 不再有和为 6 的数对，因此最多执行 1 次操作。
//

// 提示：

// 1 <= nums.length <= 105
// 1 <= nums[i] <= 109
// 1 <= k <= 109

// 做法1：排序后双指针
// 做法2（当前）：
// 1. 先统计各个数的数量
// 2. 遍历数组，判断 k - num 的差，代表着需要的另一个数，从 countMap 中减去对应的数，<= 0 则表示已无法操作
function maxOperations(nums: number[], k: number): number {
  const map = {};

  let count = 0;

  nums.forEach((num) => {
    if (!map[num]) map[num] = 0;

    map[num]++;
  });

  nums.forEach((num) => {
    if (k - num === num) {
      if (map[num] > 1) {
        map[num]--;
        map[num]--;
        count++;
      }
    } else if (map[k - num] > 0 && map[num] > 0) {
      map[k - num]--;
      map[num]--;
      count++;
    }
  });

  return count;
}

console.log(maxOperations([3, 1, 3, 4, 3], 6));
// console.log(maxOperations([2, 5, 4, 4, 1, 3, 4, 4, 1, 4, 4, 1, 2, 1, 2, 2, 3, 2, 4, 2], 3));
