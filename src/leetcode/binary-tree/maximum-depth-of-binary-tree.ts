import { printResult } from "../utils";
import { TreeNode, arrayToTreeNode } from "./TreeNode";

// 给定一个二叉树，找出其最大深度。

// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

// 说明: 叶子节点是指没有子节点的节点。

// 示例：
// 给定二叉树 [3,9,20,null,null,15,7]，

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回它的最大深度 3 。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/maximum-depth-of-binary-tree
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;

  let maxLevel = 0;

  const iterator = (node: TreeNode, level: number) => {
    if (maxLevel < level) {
      maxLevel = level;
    }

    if (node.left !== null) iterator(node.left, level + 1);
    if (node.right !== null) iterator(node.right, level + 1);
  };

  iterator(root, 1);

  return maxLevel;
}

const tree = arrayToTreeNode([3, 9, 20, null, null, 15, 17]);

printResult(maxDepth, [tree], 3);
