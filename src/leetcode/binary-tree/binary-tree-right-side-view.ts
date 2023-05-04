import { printResult } from "../utils";
import { TreeNode, arrayToTreeNode } from "./TreeNode";

// 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

//

// 示例 1:

// 输入: [1,2,3,null,5,null,4]
// 输出: [1,3,4]
// 示例 2:

// 输入: [1,null,3]
// 输出: [1,3]
// 示例 3:

// 输入: []
// 输出: []
//

// 提示:

// 二叉树的节点个数的范围是 [0,100]
// -100 <= Node.val <= 100

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/binary-tree-right-side-view
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];

  const stack: {
    level: number;
    node: TreeNode;
  }[] = [
    {
      level: 0,
      node: root
    }
  ];

  const levelArr: number[] = [];

  while (stack.length) {
    const current = stack.shift();

    if (current) {
      const { level, node } = current;

      if (levelArr.length < level + 1) {
        levelArr.push(node.val);
      } else {
        levelArr[level] = node.val;
      }

      if (node.left) {
        stack.push({
          level: level + 1,
          node: node.left
        });
      }

      if (node.right) {
        stack.push({
          level: level + 1,
          node: node.right
        });
      }
    }
  }

  return levelArr;
}

const tree3 = arrayToTreeNode([1, 2, 3, null, 5, null, 4]);

printResult(rightSideView, [tree3], [1, 3, 4]);
