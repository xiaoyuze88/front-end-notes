// 中序遍历
// 先左节点到底，然后右节点，最后到根，再往右往下走

import { IterationType } from "../../utils";
import { TreeNode, TreeNodeIteratorCallback, testNodes } from "./TreeNode";

export const inOrderIterator = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>,
  type: IterationType = "iteration"
) => {
  return type === "iteration"
    ? inOrderIterator_iteration(tree, cb)
    : inOrderIterator_recursion(tree, cb);
};

// 递归
// export const inOrderIterator_recursion = <T = number>(
//   tree: TreeNode<T>,
//   cb: TreeNodeIteratorCallback<T>
// ) => {
//   const iterator = (node: TreeNode<T>) => {
//     if (node.left) iterator(node.left);

//     cb(node.val, node);

//     if (node.right) iterator(node.right);
//   };

//   iterator(tree);
// };
export const inOrderIterator_recursion = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {
  const iterator = (node: TreeNode<T>) => {
    if (node.left !== null) iterator(node.left);

    cb(node.val, node);

    if (node.right !== null) iterator(node.right);
  };

  iterator(tree);
};

// 迭代
export const inOrderIterator_iteration = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {
  const stack = [tree];

  let current: TreeNode<T> = tree;

  while (stack.length) {
    // 有左，一直往里推
    if (current.left) {
      stack.push(current.left);
      current = current.left;
    }
    // 否则说明左到底了，开始执行
    else {
      const last = stack.pop();

      cb(last.val, last);

      if (last.right) {
        stack.push(last.right);
        current = last.right;
      }
    }
  }
};

// test case
// inOrderIterator(testNodes.treeFullDeep, (val) => console.log(val), 'iteration');
// preOrderIterator2(testNodes.treeFull, (val) => console.log(val));
