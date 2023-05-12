// 前序遍历
// 先过根，然后先左节点到底，然后往上一层找右节点

import { IterationType } from "../../utils";
import { TreeNode, TreeNodeIteratorCallback, testNodes } from "./TreeNode";

export const preOrderIterator = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>,
  type: IterationType = "iteration"
) => {
  return type === "iteration"
    ? preOrderIterator_iteration(tree, cb)
    : preOrderIterator_recursion(tree, cb);
};

// 递归
// export const preOrderIterator_recursion = <T = number>(
//   tree: TreeNode<T>,
//   cb: TreeNodeIteratorCallback<T>
// ) => {
//   const doPreOrder = (node: TreeNode<T>) => {
//     if (node) {
//       cb(node.val, node);
//       doPreOrder(node.left);
//       doPreOrder(node.right);
//     }
//   };

//   doPreOrder(tree);
// };
export const preOrderIterator_recursion = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {
  const iterator = (node: TreeNode<T>) => {
    const shouldBreak = cb(node.val, node);

    if (shouldBreak === true) return;

    if (node.left) iterator(node.left);
    if (node.right) iterator(node.right);
  };

  iterator(tree);
};

// 迭代
export const preOrderIterator_iteration = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {
  const stack = [tree];

  while (stack.length) {
    const node = stack.pop();

    const shouldBreak = cb(node.val, node);

    if (shouldBreak === true) return;

    if (node.right !== null) stack.push(node.right);
    if (node.left !== null) stack.push(node.left);
  }
};

// test case
preOrderIterator(testNodes.tree1, (val) => console.log(val), "iteration");
