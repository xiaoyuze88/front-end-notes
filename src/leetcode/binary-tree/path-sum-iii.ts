// 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。

import { printResult } from "../utils";
import { TreeNode, arrayToTreeNode } from "./TreeNode";

// 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

//

// 示例 1：

// 输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
// 输出：3
// 解释：和等于 8 的路径有 3 条，如图所示。
// 示例 2：

// 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
// 输出：3
//

// 提示:

// 二叉树的节点个数的范围是 [0,1000]
// -109 <= Node.val <= 109
// -1000 <= targetSum <= 1000

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/path-sum-iii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
// function pathSum(root: TreeNode | null, targetSum: number): number {
//   // 从根到叶子的完整路径集合
//   const pathArray: number[][] = [];

//   const iterator = (node: TreeNode, paths: number[]) => {
//     const nextPaths = [...paths, node.val];

//     if (!node.left && !node.right) {
//       pathArray.push(nextPaths);
//     } else {
//       if (node.left) {
//         iterator(node.left, nextPaths);
//       }

//       if (node.right) {
//         iterator(node.right, nextPaths);
//       }
//     }
//   };

//   iterator(root, []);

//   return pathArray.filter((array) => {
//     console.log(array, includeTargetSum(array, targetSum));

//     return includeTargetSum(array, targetSum);
//   }).length;
// }

// const includeTargetSum = (array: number[], targetSum: number) => {
//   for (let i = 0, l = array.length; i < l; i++) {
//     let sum = array[i];

//     for (let j = i + 1, l = array.length; j < l; j++) {
//       sum += array[j];

//       if (sum === targetSum) return true;
//     }
//   }

//   return false;
// };

function pathSum(root: TreeNode | null, targetSum: number): number {
  if (!root) return 0;

  const prefixSumCountMap: {
    [prefixSum: number]: number; // { prefixSum: count }
  } = {
    0: 1 // 前缀和为0的总有一个，考虑 root: [1], targetSum=1的场景，map[1 - 1] == 1
  };

  let count = 0;

  const iterator = (node: TreeNode, prevPrefixSum: number) => {
    // 当前节点前缀和
    const prefixSum = node.val + prevPrefixSum;

    // 找到该节点之前的路径前缀和中满足条件的路径及其数量，累加满足条件的路径数
    if (prefixSumCountMap[prefixSum - targetSum] > 0) {
      count += prefixSumCountMap[prefixSum - targetSum];
    }

    if (!prefixSumCountMap[prefixSum]) prefixSumCountMap[prefixSum] = 0;

    // 将当前节点加入路径前缀和map
    prefixSumCountMap[prefixSum]++;

    // 递归子节点
    if (node.left) {
      iterator(node.left, prefixSum);
    }

    if (node.right) {
      iterator(node.right, prefixSum);
    }

    // 已经递归完所有子节点，需要将本层加上的前缀和统计移除
    prefixSumCountMap[prefixSum]--;
  };

  iterator(root, 0);

  return count;
}

const tree1 = arrayToTreeNode([10, 5, -3, 3, 2, null, 11, 3, -2, null, 1]);
printResult(pathSum, [tree1, 8], 3);

const tree2 = arrayToTreeNode([1]);
printResult(pathSum, [tree2, 0], 0);

const tree3 = arrayToTreeNode([0, 1, 1]);
printResult(pathSum, [tree3, 1], 4);

// console.log(includeTargetSum([10, 5, 3, 3], 8));
