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

  // 堆栈最后一个节点
  let lastNode: TreeNode<T>;
  // 上一个遍历过的节点
  let prevNode: TreeNode<T>;

  while (stack.length) {
    lastNode = stack[stack.length - 1];

    // 如果左节点遍历过，且上一个完成遍历的节点不是该节点的左或者右节点，则入栈（否则说明这个节点已经遍历过了，需要出栈找下一个了）
    if (lastNode.left && lastNode.left !== prevNode && lastNode.right !== prevNode) {
      stack.push(lastNode.left);
    }
    // 同上，找右节点
    else if (lastNode.right && lastNode.right !== prevNode) {
      stack.push(lastNode.right);
    } else {
      const node = stack.pop();

      cb(node.val, node);

      prevNode = node;
    }
  }
};

// test case
// postOrderIterator(testNodes.treeFullDeep, (val) => console.log(val), "iteration");
// preOrderIterator2(testNodes.treeFull, (val) => console.log(val));
