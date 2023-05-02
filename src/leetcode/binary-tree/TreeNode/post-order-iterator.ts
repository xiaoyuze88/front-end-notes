// 中序遍历
// 先左节点到底，然后右节点，最后到根，再往右往下走

import { IterationType } from "../../utils";
import { TreeNode, TreeNodeIteratorCallback, testNodes } from "./TreeNode";

export const postOrderIterator = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>,
  type: IterationType = "iteration"
) => {
  return type === "iteration"
    ? postOrderIterator_iteration(tree, cb)
    : postOrderIterator_recursion(tree, cb);
};

// 递归
export const postOrderIterator_recursion = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {
  const iterator = (node: TreeNode<T>) => {
    if (node.left) iterator(node.left);
    if (node.right) iterator(node.right);

    cb(node.val, node);
  };

  iterator(tree);
};

// 迭代
export const postOrderIterator_iteration = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {
  const stack = [tree];

  let current = tree;

  while (stack.length) {
    if (current.left) {
      stack.push(current.left);
      current = current.left;
    } else {
      const node = stack.pop();

      if (current.right) {
        stack.push(current.right);
        current = current.right;
        continue;
      }

      cb(node.val, node);
    }
  }
};

// test case
postOrderIterator(testNodes.treeFullDeep, (val) => console.log(val), "iteration");
// preOrderIterator2(testNodes.treeFull, (val) => console.log(val));
