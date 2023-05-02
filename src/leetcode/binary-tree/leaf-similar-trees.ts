import { printResult } from "../utils";
import { TreeNode, arrayToTreeNode } from "./TreeNode";

// 请考虑一棵二叉树上所有的叶子，这些叶子的值按从左到右的顺序排列形成一个 叶值序列 。

// 举个例子，如上图所示，给定一棵叶值序列为 (6, 7, 4, 9, 8) 的树。

// 如果有两棵二叉树的叶值序列是相同，那么我们就认为它们是 叶相似 的。

// 如果给定的两个根结点分别为 root1 和 root2 的树是叶相似的，则返回 true；否则返回 false 。

//

// 示例 1：

// 输入：root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
// 输出：true
// 示例 2：

// 输入：root1 = [1,2,3], root2 = [1,3,2]
// 输出：false
//

// 提示：

// 给定的两棵树结点数在 [1, 200] 范围内
// 给定的两棵树上的值在 [0, 200] 范围内

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/leaf-similar-trees
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  const array1 = getLeafArray(root1);
  const array2 = getLeafArray(root2);

  if (array1.length !== array2.length) return false;

  for (let i = 0, l = array1.length; i < l; i++) {
    if (array1[i] !== array2[i]) return false;
  }

  return true;
}

const getLeafArray = (tree: TreeNode): number[] => {
  const array: number[] = [];

  if (!tree) return array;

  const iterator = (node: TreeNode) => {
    if (!node.left && !node.right) {
      array.push(node.val);
    }

    if (node.left) {
      iterator(node.left);
    }

    if (node.right) {
      iterator(node.right);
    }
  };

  iterator(tree);

  return array;
};

// const tree1 = arrayToTreeNode([3, 5, 1, 6, 2, 9, 8, null, null, 7, 4]);
// const tree2 = arrayToTreeNode([3, 5, 1, 6, 7, 4, 2, null, null, null, null, null, null, 9, 8]);

// printResult(leafSimilar, [tree1, tree2], true);

const tree1 = arrayToTreeNode([
  3,
  5,
  1,
  6,
  7,
  4,
  2,
  null,
  null,
  null,
  null,
  null,
  null,
  9,
  11,
  null,
  null,
  8,
  10
]);
const tree2 = arrayToTreeNode([3, 5, 1, 6, 2, 9, 8, null, null, 7, 4]);

printResult(leafSimilar, [tree1, tree2], false);
