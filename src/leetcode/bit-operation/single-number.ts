// 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

// 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。

//

// 示例 1 ：

// 输入：nums = [2,2,1]
// 输出：1
// 示例 2 ：

// 输入：nums = [4,1,2,1,2]
// 输出：4
// 示例 3 ：

// 输入：nums = [1]
// 输出：1
//

// 提示：

// 1 <= nums.length <= 3 * 104
// -3 * 104 <= nums[i] <= 3 * 104
// 除了某个元素只出现一次以外，其余每个元素均出现两次。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/single-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 异或运算 （xor） js运算符 ^
// 只有两位只有一个位1时，得到1：1 ^ 0= 1; 0 ^ 0 = 0; 1 ^ 1 = 0
// 所以任何数与自己xor都为0，因为所有位都相等
function singleNumber(nums: number[]): number {
  return nums.reduce((prev, next) => {
    return prev ^ next;
  }, 0);
}