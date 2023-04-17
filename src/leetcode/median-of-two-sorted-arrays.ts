// 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

// 算法的时间复杂度应该为 O(log (m+n)) 。

// 示例 1：

// 输入：nums1 = [1,3], nums2 = [2]
// 输出：2.00000
// 解释：合并数组 = [1,2,3] ，中位数 2
// 示例 2：

// 输入：nums1 = [1,2], nums2 = [3,4]
// 输出：2.50000
// 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5

// 1. 并归排序，拆分到剩 Array(1),然后依次比较两数组的左0，小的推出
function findMedianSortedArrays1(nums1: number[], nums2: number[]): number {
  const sortedArr: number[] = [];

  while (nums1.length && nums2.length) {
    if (nums1[0] <= nums2[0]) {
      sortedArr.push(nums1.shift());
    } else {
      sortedArr.push(nums2.shift());
    }
  }

  while (nums1.length) {
    sortedArr.push(nums1.shift());
  }

  while (nums2.length) {
    sortedArr.push(nums2.shift());
  }

  if (sortedArr.length % 2) {
    return sortedArr[(sortedArr.length - 1) / 2 ];
  } else {
    return (sortedArr[sortedArr.length / 2] + sortedArr[(sortedArr.length / 2) - 1]) / 2;
  }
}

// 2. 找第k小的数
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const isEven = (nums1.length + nums2.length) % 2 === 0;

  function iterator(nums1, nums2) {
    const k = Math.floor(((nums1.length + nums2.length) / 2));

    // const halfK
  }

  return 0
}

console.log(findMedianSortedArrays([1,3], [2]));
console.log(findMedianSortedArrays([1,2], [3,4]));
console.log(findMedianSortedArrays([1,4, 7, 9], [0, 9 , 10, 19]));
