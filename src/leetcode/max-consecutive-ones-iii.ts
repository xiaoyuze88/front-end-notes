// 给定一个二进制数组 nums 和一个整数 k，如果可以翻转最多 k 个 0 ，则返回 数组中连续 1 的最大个数 。

//

// 示例 1：

// 输入：nums = [1,1,1,0,0,0,1,1,1,1,0], K = 2
// 输出：6
// 解释：[1,1,1,0,0,1,1,1,1,1,1]
// 粗体数字从 0 翻转到 1，最长的子数组长度为 6。
// 示例 2：

// 输入：nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
// 输出：10
// 解释：[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
// 粗体数字从 0 翻转到 1，最长的子数组长度为 10。
//

// 提示：

// 1 <= nums.length <= 105
// nums[i] 不是 0 就是 1
// 0 <= k <= nums.length
// 等价于寻找区间内最大的子数组，满足有k个0
function longestOnes(nums: number[], k: number): number {
  let left = 0;
  let right = 0;
  let zeros = 0;
  let max = 0;

  while (right < nums.length) {
    if (nums[right] === 0) {
      zeros++;
    }

    // 挪 left
    while (zeros > k) {
      if (nums[left] === 0) {
        zeros--;
      }
      left++;
    }

    // 此时满足left-right zeros <= k，可以统计长度
    max = Math.max(max, right - left + 1);
    // 挪right
    right++;
  }

  return max;
}

const printResult = (nums: number[], k: number, expected: number) => {
  // console.log("result", str);

  // lengthOfLongestSubstringDP(str);
  // return;

  console.log(nums, k, longestOnes(nums, k), longestOnes(nums, k) === expected);
};

printResult([1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0], 3, 6);
printResult([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2, 6);
// printResult([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3, 10);
printResult([0], 0, 0);
