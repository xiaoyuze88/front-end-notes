import { TreeNode, TreeNodeIteratorCallback } from "./TreeNode";

// 递归
export const bfs_recursion = <T = number>(tree: TreeNode<T>, cb: TreeNodeIteratorCallback<T>) => {};

// 迭代
export const bfs_iteration = <T = number>(tree: TreeNode<T>, cb: TreeNodeIteratorCallback<T>) => {};

export const inOrderIterator_recursion = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {};

// 迭代
export const inOrderIterator_iteration = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {};

// 递归
export const postOrderIterator_recursion = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {};

// 迭代
export const postOrderIterator_iteration = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {};

export const preOrderIterator_recursion = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {};

// 迭代
export const preOrderIterator_iteration = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {};
