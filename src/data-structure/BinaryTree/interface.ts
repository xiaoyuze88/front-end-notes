import { TreeNode, TreeNodeIteratorCallback } from "./TreeNode";

// 递归
export const bfs_recursion = <T = number>(tree: TreeNode<T>, cb: TreeNodeIteratorCallback<T>) => {
  const iterator = (queue: TreeNode<T>[]) => {
    const current = queue.shift();

    if (!current) return;

    cb(current.val, current);

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);

    iterator(queue);
  };

  iterator([tree]);
};

// 迭代
export const bfs_iteration = <T = number>(tree: TreeNode<T>, cb: TreeNodeIteratorCallback<T>) => {
  const queue = [tree];

  while (queue.length) {
    const current = queue.shift();

    cb(current.val, current);

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
};

export const preOrderIterator_recursion = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {};

// 迭代
export const preOrderIterator_iteration = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {};

export const inOrderIterator_recursion = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {};

// 迭代
export const inOrderIterator_iteration = <T = number>(
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
      const last = stack.pop();

      cb(last.val, last);

      if (last.right) {
        stack.push(last.right);
        current = last.right;
      }
    }
  }
};

// 迭代
export const postOrderIterator_iteration = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {
  const stack = [tree];
  let lastNode: TreeNode<T>;

  while (stack.length) {
    const current = stack[stack.length - 1];

    if (current.left && current.left !== lastNode && current.right !== lastNode) {
      stack.push(current.left);
    } else if (current.right && current.right !== lastNode) {
      stack.push(current.right);
    } else {
      const last = stack.pop();

      cb(last.val, last);

      lastNode = last;
    }
  }
};

// 递归
export const postOrderIterator_recursion = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {};
