// 中序遍历
// 先左节点到底，然后右节点，最后到根，再往右往下走

import { IterationType } from "../../utils";
import { TreeNode, TreeNodeIteratorCallback, testNodes } from "./TreeNode";

export const bfs = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>,
  type: IterationType = "iteration"
) => {
  return type === "iteration" ? bfs_iteration(tree, cb) : bfs_recursion(tree, cb);
};

// 递归
export const bfs_recursion = <T = number>(tree: TreeNode<T>, cb: TreeNodeIteratorCallback<T>) => {
  const stack = [tree];

  const iterator = () => {
    const current = stack.shift();

    if (!current) return;

    cb(current.val, current);
    if (current.left) stack.push(current.left);
    if (current.right) stack.push(current.right);

    iterator();
  };

  iterator();
};

// 迭代
export const bfs_iteration = <T = number>(tree: TreeNode<T>, cb: TreeNodeIteratorCallback<T>) => {
  const stack = [tree];

  let current: TreeNode<T>;

  while (stack.length) {
    current = stack.shift();

    if (current) {
      cb(current.val, current);

      if (current.left) stack.push(current.left);
      if (current.right) stack.push(current.right);
    }
  }
};

// test case
// bfs(testNodes.tree1, (val) => console.log(val), "iteration");
// preOrderIterator2(testNodes.treeFull, (val) => console.log(val));
