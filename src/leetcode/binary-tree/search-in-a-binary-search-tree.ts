import { printResult } from "../utils";
import { TreeNode, arrayToTreeNode, findTreeNode } from "./TreeNode";

// 给定二叉搜索树（BST）的根节点 root 和一个整数值 val。

// 你需要在 BST 中找到节点值等于 val 的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 null 。

//

// 示例 1:

// 输入：root = [4,2,7,1,3], val = 2
// 输出：[2,1,3]
// 示例 2:

// 输入：root = [4,2,7,1,3], val = 5
// 输出：[]
//

// 提示：

// 数中节点数在 [1, 5000] 范围内
// 1 <= Node.val <= 107
// root 是二叉搜索树
// 1 <= val <= 107

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/search-in-a-binary-search-tree
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  let target: TreeNode = null;

  let current = root;

  while (current) {
    if (val === current.val) {
      target = current;
      break;
    }

    // 在左
    if (val < current.val) {
      current = current.left;
    } else if (val > current.val) {
      current = current.right;
    }
  }

  return target;
}

const tree1 = arrayToTreeNode([4, 2, 7, 1, 3]);

printResult(
  searchBST,
  [tree1, 2],
  findTreeNode(tree1, (val) => val === 2)
);
