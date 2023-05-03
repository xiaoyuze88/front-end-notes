import { TreeNode, arrayToTreeNode, bfs } from "./TreeNode";

// 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。返回二叉搜索树（有可能被更新）的根节点的引用。

// 一般来说，删除节点可分为两个步骤：

// 首先找到需要删除的节点；
// 如果找到了，删除它。
//

// 示例 1:

// 输入：root = [5,3,6,2,4,null,7], key = 3
// 输出：[5,4,6,2,null,null,7]
// 解释：给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。
// 一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。
// 另一个正确答案是 [5,2,6,null,4,null,7]。

// 示例 2:

// 输入: root = [5,3,6,2,4,null,7], key = 0
// 输出: [5,3,6,2,4,null,7]
// 解释: 二叉树不包含值为 0 的节点
// 示例 3:

// 输入: root = [], key = 0
// 输出: []
//

// 提示:

// 节点数的范围 [0, 104].
// -105 <= Node.val <= 105
// 节点值唯一
// root 是合法的二叉搜索树
// -105 <= key <= 105
//

// 进阶： 要求算法时间复杂度为 O(h)，h 为树的高度。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/delete-node-in-a-bst
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null;

  if (root.val === key) {
    return doDelete(root);
  }

  let current = root.val < key ? root.right : root.left;
  let currentParent = root;

  while (current) {
    if (current.val === key) {
      break;
    }

    if (current.val < key) {
      if (current.right) {
        currentParent = current;
        current = current.right;
      } else {
        // 找不到
        currentParent = current = null;
        break;
      }
    } else {
      if (current.left) {
        currentParent = current;
        current = current.left;
      } else {
        // 找不到
        currentParent = current = null;
        break;
      }
    }
  }

  if (current && currentParent) {
    const currentIsLeft = currentParent.left === current;

    const nodeAfterDeleted = doDelete(current);

    // 说明可以直接删
    if (!nodeAfterDeleted) {
      if (currentIsLeft) {
        currentParent.left = null;
      } else {
        currentParent.right = null;
      }
    }
    // 否则，将处理结束的节点替换掉current
    else {
      if (currentIsLeft) {
        currentParent.left = nodeAfterDeleted;
      } else {
        currentParent.right = nodeAfterDeleted;
      }
    }
  }

  return root;
}

// 删除该节点，返回处理完后的新节点，如果可以直接删除则返回null
function doDelete(targetNode: TreeNode): TreeNode | null {
  // 1. 没有子节点，直接删
  if (!targetNode.left && !targetNode.right) {
    return null;
  }
  // 2. 只有左，那么parent.left=target.left
  else if (targetNode.left && !targetNode.right) {
    return targetNode.left;
  }
  // 3. 只有右，那么parent.left=target.right
  else if (targetNode.right && !targetNode.left) {
    return targetNode.right;
  }
  // 4. 有左也有右，那么找右树中最小的节点，代替targetNode（也可以找左树种最大的节点）
  else {
    // 找到右树最小值
    let minNode = targetNode.right;
    let minNodeParent = targetNode;

    // 说明它自己就是最小值，则直接将自己替换掉target即可
    if (!minNode.left) {
      minNode.left = targetNode.left;
      return minNode;
    }
    // 说明右节点还有子树，需要找到其最小值，替换掉targetNode
    else {
      while (minNode) {
        if (minNode.left) {
          minNodeParent = minNode;
          minNode = minNode.left;
        } else {
          break;
        }
      }

      // 如果还有右，则直接接到 parent.left上面去
      if (minNode.right) {
        minNodeParent.left = minNode.right;
      }
      // 否则直接从minNodeParent中删除
      else {
        minNodeParent.left = null;
      }

      minNode.left = targetNode.left;
      minNode.right = targetNode.right;

      return minNode;
    }
  }
}

// const tree1 = arrayToTreeNode([5, 3, 6, 2, 4, null, 7]);

// bfs(deleteNode(tree1, 3), (val) => console.log(val));

// const tree2 = arrayToTreeNode([5, 3, 6, 2, 4, null, 7]);

// console.log(deleteNode(tree2, 5));

// const tree3 = arrayToTreeNode([50, 30, 70, null, 40, 60, 80]);

// console.log(deleteNode(tree3, 50));

const tree4 = arrayToTreeNode([3, 2, 5, null, null, 4, 10, null, null, 8, 15, 7]);

console.log(deleteNode(tree4, 5));

