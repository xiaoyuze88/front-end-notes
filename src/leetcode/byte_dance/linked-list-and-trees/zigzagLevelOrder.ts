// 二叉树的锯齿形层序遍历
// https://leetcode.cn/explore/interview/card/bytedance/244/linked-list-and-tree/1027/
// 给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

// 示例 1：
// 输入：root = [3,9,20,null,null,15,7]
// 输出：[[3],[20,9],[15,7]]
// 示例 2：

// 输入：root = [1]
// 输出：[[1]]
// 示例 3：

// 输入：root = []
// 输出：[]

// 提示：

// 树中节点数目在范围 [0, 2000] 内
// -100 <= Node.val <= 100

import { TreeNode, arrayToTreeNode } from "../../binary-tree/TreeNode";

function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const queue: TreeNode[] = [root];

  let levelSize: number;

  const results: number[][] = [];

  let fromLeftToRight = false;

  let level = 0;

  while (queue.length) {
    levelSize = queue.length;

    // 每层反转
    fromLeftToRight = !fromLeftToRight;

    const currentLevelResults = [];
    const nextLevelQueue = [];

    // console.log(
    //   "currentLevel",
    //   level,
    //   queue.map((node) => node.val),
    //   `fromLeftToRight? => ${fromLeftToRight}`
    // );

    // queue都是按当前需要输出的方向排好
    currentLevelResults.push(...queue.map((node) => node.val));

    for (let i = 1; i <= levelSize; i++) {
      // 下一层是当前queue的逆序，从后往前取
      const last = queue.pop();

      // 但是要区分从左往右还是从右往左，当前层是从左到右，那么下一层就是从右往左
      if (fromLeftToRight) {
        last.right && nextLevelQueue.push(last.right);
        last.left && nextLevelQueue.push(last.left);
      } else {
        last.left && nextLevelQueue.push(last.left);
        last.right && nextLevelQueue.push(last.right);
      }
    }

    level++;
    queue.push(...nextLevelQueue);
    results.push(currentLevelResults);
  }

  return results;
}

console.log(zigzagLevelOrder(arrayToTreeNode([3, 9, 20, null, null, 15, 7])));
console.log(zigzagLevelOrder(arrayToTreeNode([1, 2, 3, 4, null, null, 5])));
console.log(zigzagLevelOrder(arrayToTreeNode([1, 2, 3, 4, 5, 6, 7])));
