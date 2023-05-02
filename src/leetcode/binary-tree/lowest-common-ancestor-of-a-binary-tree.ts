import { TreeNode, arrayToTreeNode, findTreeNode, preOrderIterator } from "./TreeNode";
import { printResult } from "../utils";

// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

//

// 示例 1：

// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// 输出：3
// 解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
// 示例 2：

// 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// 输出：5
// 解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
// 示例 3：

// 输入：root = [1,2], p = 1, q = 2
// 输出：1
//

// 提示：

// 树中节点数目在范围 [2, 105] 内。
// -109 <= Node.val <= 109
// 所有 Node.val 互不相同 。
// p != q
// p 和 q 均存在于给定的二叉树中。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  let target: TreeNode;

  const iterator = (node: TreeNode) => {
    if (!node) return null;

    // 需要先找子节点，再往上找父，后序遍历
    const sonLeft = iterator(node.left);
    const sonRight = iterator(node.right);

    if (
      // 如果在左子树里，或当前值就命中pq
      (sonLeft || (!sonLeft && (node.val === p.val || node.val === q.val))) &&
      // 如果在右子树里，或当前值就命中pq
      (sonRight || (!sonRight && (node.val === p.val || node.val === q.val)))
    ) {
      // 说明命中目标，当前就是最近公共祖先
      target = node;
    }

    if (sonLeft || sonRight) {
      return sonLeft || sonRight;
    }

    if (node.val === p.val || node.val === q.val) {
      return node;
    }

    return null;
  };

  iterator(root);

  return target;
}

const doPrintResult = (array: number[], p: number, q: number, expected: number) => {
  const tree = arrayToTreeNode(array);

  printResult(
    lowestCommonAncestor,
    [tree, findTreeNode(tree, (val) => val === p), findTreeNode(tree, (val) => val === q)],
    findTreeNode(tree, (val) => val === expected)
  );
};

doPrintResult([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1, 3);
doPrintResult([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 4, 5);
doPrintResult([1, 2], 1, 2, 1);
