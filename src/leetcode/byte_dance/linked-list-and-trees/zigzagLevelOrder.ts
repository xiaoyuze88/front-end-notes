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
  const queue: TreeNode[] = [root];

  let fromLeftToRight = true;

  while (queue.length) {
    const first = queue.shift();

    if (!first) break;

    console.log("first", first.val);

    queue.push(first.left);
    queue.push(first.right);

    if (fromLeftToRight) {
      fromLeftToRight = false;
    }
  }

  return [];
}

zigzagLevelOrder(
  arrayToTreeNode([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
);
