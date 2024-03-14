// 1. 完全二叉树的数组表示
// 2. 完全二叉树的特性，以1起始下标，父为 Math.floor(i/2)，子为 i * 2 & i * 2 + 1
// 3. DFS - 前序，一遍历到就执行，常用于只需要遍历（无顺序要求）
// 4. DFS - 中序，对于二分搜索树（l < p < r），中序遍历符合从小到大的顺序，如果是这种树可以用此顺序
// 5. DFS - 后序，最大特点是执行操作时，必定已经遍历过该节点的左右了，故适合执行一些破坏性操作（删除）
// 6. BFS
// 7. 二叉搜索树，左 < 根 < 右
// BFS/DFS 差异及各自特点讲解：https://leetcode.cn/problems/binary-tree-level-order-traversal/solutions/244853/bfs-de-shi-yong-chang-jing-zong-jie-ceng-xu-bian-l/

class TreeNode<T = number> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  constructor(val?: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const list2TreeNode = (array: number[]) => {
  if (!array.length) return null;

  let root: TreeNode = new TreeNode(array[0]);

  const queue: TreeNode[] = [root];

  let isLeft = true;

  for (let i = 1, l = array.length; i < l; i++) {
    const parent = queue[0];

    if (isLeft) {
      if (array[i] === null) {
        parent.left = null;
      } else {
        parent.left = new TreeNode(array[i]);
        queue.push(parent.left);
      }

      isLeft = false;
    } else {
      if (array[i] === null) {
        parent.right = null;
      } else {
        parent.right = new TreeNode(array[i]);
        queue.push(parent.right);
      }

      isLeft = true;
      queue.shift();
    }
  }

  return root;
};

// 前序,递归
const dfs_pre_order_recursion = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const dfs = (tree: TreeNode) => {
    const shouldBreak = cb(tree);

    if (shouldBreak) return;

    if (tree.left) dfs(tree.left);
    if (tree.right) dfs(tree.right);
  };

  dfs(tree);
};

// 前序，迭代
const dfs_pre_order_iteration = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const stack = [tree];

  while (stack.length) {
    const top = stack.pop();

    const shouldBreak = cb(top);

    if (shouldBreak) return;

    if (top.right) stack.push(top.right);
    if (top.left) stack.push(top.left);
  }
};

const dfsPreOrderIteration = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const stack = [tree];

  while (stack.length) {
    const top = stack.pop();

    cb(top);

    top.right && stack.push(top.right);
    top.left && stack.push(top.left);
  }
};

const dfs_in_order_recursion = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const dfs = (tree: TreeNode) => {
    if (tree.left) dfs(tree.left);

    cb(tree);

    if (tree.right) dfs(tree.right);
  };

  dfs(tree);
};

const dfs_in_order_iteration = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const stack: TreeNode[] = [tree];

  let current = tree;

  while (stack.length) {
    // 有左一直往下找，全部推进堆栈
    if (current.left) {
      stack.push(current.left);
      current = current.left;
    } else {
      // 没有左了，开始查
      const node = stack.pop();

      cb(node);

      if (node.right) {
        stack.push(node.right);
        current = node.right;
      }
    }
  }
};

const dfsInOrderIteration = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const stack = [tree];

  let current = tree;

  while (stack.length) {
    // 左到底
    if (current.left) {
      stack.push(current.left);
      current = current.left;
    } else {
      // 然后开始走
      const top = stack.pop();

      cb(top);

      if (top.right) {
        stack.push(top.right);
        current = top.right;
      }
    }
  }
};

const dfs_post_order_recursion = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);

    cb(node);
  };

  dfs(tree);
};

const dfs_post_order_iteration = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const stack: TreeNode[] = [tree];

  let lastNode: TreeNode;

  while (stack.length) {
    const top = stack[stack.length - 1];

    // 回来的时候，如果左节点==lastNode，说明左边走过了，如果右节点==lastNode，说明两边都走过了
    if (top.left && top.left !== lastNode && top.right !== lastNode) {
      stack.push(top.left);
    } else if (top.right && top.right !== lastNode) {
      stack.push(top.right);
    } else {
      const node = stack.pop();

      cb(node);
      lastNode = node;
    }
  }
};

const dfsPostOrderIteration = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const stack = [tree];
  let lastNode: TreeNode;

  while (stack.length) {
    const top = stack[stack.length - 1];

    if (top.left && top.left !== lastNode && top.right !== lastNode) {
      stack.push(top.left);
    } else if (top.right && top.right !== lastNode) {
      stack.push(top.right);
    } else {
      const current = stack.pop();

      cb(current);
      lastNode = current;
    }
  }
};

const bfs_recursion = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const queue: TreeNode[] = [tree];

  const bfs = () => {
    const first = queue.shift();

    if (!first) return;

    cb(first);
    if (first.left) queue.push(first.left);
    if (first.right) queue.push(first.right);

    bfs();
  };

  bfs();
};

const bfs_iteration = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const queue: TreeNode[] = [tree];

  while (queue.length) {
    const first = queue.shift();

    cb(first);

    if (first.left) queue.push(first.left);
    if (first.right) queue.push(first.right);
  }
};

const bfs_per_level = (tree: TreeNode) => {
  const queue = [tree];

  let n: number;

  const results: number[][] = [];

  while (queue.length) {
    const n = queue.length;

    const currentLevelResult = [];

    // 每次进这个循环的都是同一个层级的，因为他们都是同一个时机推入的（只要0级是一级同时推入，就能保证后面都是同一级别推入的）
    for (let i = 0; i < n; i++) {
      const first = queue.shift();

      currentLevelResult.push(first.val);

      if (first.left) queue.push(first.left);
      if (first.right) queue.push(first.right);
    }

    results.push(currentLevelResult);
  }

  console.log("results", results);

  return results;
};

const tree = list2TreeNode([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
// bfs_per_level(tree, (tree) =>
//   console.log(tree.val)
// );
