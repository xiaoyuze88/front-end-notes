// 二叉树的最近公共祖先
// https://leetcode.cn/explore/interview/card/bytedance/244/linked-list-and-tree/1026/
// 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

// 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

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

// 提示：

// 树中节点数目在范围 [2, 105] 内。
// -109 <= Node.val <= 109
// 所有 Node.val 互不相同 。
// p != q
// p 和 q 均存在于给定的二叉树中。

/**
 * 解法：
 * dfs，返回是否命中左/右孩子、或自己就是左、右节点
 *
 * isLeftSon = dfs(node.left);
 * isRightSon = dfs(node.right);
 *
 * 如果左右孩子都在当前节点之下，那么它就是结果（因为还要往回走，越后面的层级越高，所以最终结果必然是最高的节点）
 */

import { TreeNode } from "../../binary-tree/TreeNode";

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
  let result: TreeNode = null;

  const dfs = (node: TreeNode): boolean => {
    if (!node) return false;

    const lSon = dfs(node.left);
    const rSon = dfs(node.right);

    const isCurrentPOrQ = node.val === p.val || node.val === q.val;

    if ((lSon && rSon) || ((lSon || rSon) && isCurrentPOrQ)) {
      result = node;
    }

    return lSon || rSon || isCurrentPOrQ;
  };

  dfs(root);

  return result;
}

function lowestCommonAncestor2(tree: TreeNode, p: number, q: number) {
  let result = null;

  const dfs = (node: TreeNode) => {
    if (!node) return false;

    const isLeftSon = dfs(node.left);
    const isRightSon = dfs(node.right);

    if (
      (isLeftSon && isRightSon) ||
      ((isRightSon || isLeftSon) && (node.val === p || node.val === q))
    ) {
      result = node.val;
    }

    return isLeftSon || isRightSon || node.val === p || node.val === q;
  };
}
