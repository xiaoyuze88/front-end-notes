import { TreeNode, TreeNodeIteratorCallback } from "./TreeNode";

// 递归
export const bfs_recursion = <T = number>(tree: TreeNode<T>, cb: TreeNodeIteratorCallback<T>) => {
  const queue = [tree];

  while (queue.length) {
    const current = queue.shift();

    cb(current.val, current);

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
};

// 迭代
export const bfs_iteration = <T = number>(tree: TreeNode<T>, cb: TreeNodeIteratorCallback<T>) => {
  const queue = [tree];

  const iterator = () => {
    const current = queue.shift();

    if (!current) return;

    cb(current.val, current);

    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);

    iterator();
  };

  iterator();
};

// 递归
export const preOrderIterator_recursion = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {
  const iterator = (node: TreeNode<T>) => {
    cb(node.val, node);

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
    const current = stack.pop();

    cb(current.val, current);

    if (current.right) stack.push(current.right);
    if (current.left) stack.push(current.left);
  }
};

export const inOrderIterator_recursion = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {
  const iterator = (node: TreeNode<T>) => {
    if (node.left) iterator(node.left);

    cb(node.val, node);

    if (node.right) iterator(node.right);
  };

  iterator(tree);
};

// 迭代
export const inOrderIterator_iteration = <T = number>(
  tree: TreeNode<T>,
  cb: TreeNodeIteratorCallback<T>
) => {
  const stack = [tree];

  // current是标识当前遍历指针的指向
  let current = tree;

  while (stack.length) {
    if (current.left) {
      stack.push(current.left);
      current = current.left;
    }
    // 到底了，开始检查栈中数据
    else {
      const last = stack.pop();

      cb(last.val, last);

      // 如果还有右，则开始遍历右指针
      if (last.right) {
        stack.push(last.right);
        current = last.right;
      }
    }
  }
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

  // 指向最后一个被遍历的元素
  let prevNode: TreeNode<T>;

  while (stack.length) {
    const last = stack[stack.length - 1];

    // 先一路找左，不执行
    if (
      last.left &&
      // 栈回退到上一格，需要跟最后一次执行的（左节点）比较，如果一致说明已经走完左边回来了
      last.left !== prevNode &&
      // 再次回来上一格，再跟最后一次执行的（右节点）比较，如果相同说明右边也走完回来了
      last.right !== prevNode
    ) {
      stack.push(last.left);
    }
    // 左找到底，然后看看还有没有右
    else if (
      last.right &&
      // 同上，再次回来上一格，再跟最后一次执行的（右节点）比较，如果相同说明右边也走完回来了
      last.right !== prevNode
    ) {
      stack.push(last.right);
    }
    // 没左也没右了，或左右都走过了，开始执行
    else {
      const current = stack.pop();

      cb(current.val, current);

      prevNode = current;
    }
  }
};
