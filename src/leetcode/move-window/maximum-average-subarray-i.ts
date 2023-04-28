// 给你一个由 n 个元素组成的整数数组 nums 和一个整数 k 。

// 请你找出平均数最大且 长度为 k 的连续子数组，并输出该最大平均数。

// 任何误差小于 10-5 的答案都将被视为正确答案。

//

// 示例 1：

// 输入：nums = [1,12,-5,-6,50,3], k = 4
// 输出：12.75
// 解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
// 示例 2：

// 输入：nums = [5], k = 1
// 输出：5.00000
//

// 提示：

// n == nums.length
// 1 <= k <= n <= 10^5
// -10^4 <= nums[i] <= 10^4

// 1. 先计算所有值的和，得到所有数的平均值
// 2. 指定窗口长度，遍历，每移动一个值，在总和之上加上后入的值，减去前值，得到当前的平均值，max值赋值
function findMaxAverage(nums: number[], k: number): number {
  let lastAmount = [...Array(k)].reduce((prev, next, index) => {
    return prev + nums[index];
  }, 0);

  let max = lastAmount / k;

  for (let i = 1, l = nums.length - k + 1; i < l; i++) {
    lastAmount = (lastAmount - nums[i - 1] + nums[i + k - 1]);

    max = Math.max(lastAmount / k, max);
  }

  return max;
}

console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4));
