// 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。

// 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。

// 请不要使用除法，且在 O(n) 时间复杂度内完成此题。

//

// 示例 1:

// 输入: nums = [1,2,3,4]
// 输出: [24,12,8,6]
// 示例 2:

// 输入: nums = [-1,1,0,-3,3]
// 输出: [0,0,9,0,0]
//

// 提示：

// 2 <= nums.length <= 105
// -30 <= nums[i] <= 30
// 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内
//

// 进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组不被视为额外空间。）
// L[i] R[i] 代表下标为i的数左、右边所有数的乘积，
// 其中: L[0] = 1, L[1] = nums[0], R[length - 1] = 1; R[length - 2] = nums[length - 1];
function productExceptSelf(nums: number[]): number[] {
  const length = nums.length;

  const L: number[] = Array(length).fill(1);
  const R: number[] = Array(length).fill(1);

  L[1] = nums[0];
  R[length - 2] = nums[length - 1];

  for (let i = 2, l = nums.length; i < l; i++) {
    L[i] = L[i - 1] * nums[i - 1];
    R[length - 1 - i] = R[length - 1 - i + 1] * nums[length - 1 - i + 1];
  }

  return nums.map((_, index) => L[index] * R[index]);
}

console.log(productExceptSelf([1, 2, 3, 4]));
