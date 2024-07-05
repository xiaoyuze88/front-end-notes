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
  const dfs = (node: TreeNode) => {
    cb(node);

    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  };

  dfs(tree);
};

// 前序，迭代
const dfs_pre_order_iteration = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const stack = [tree];

  while(stack.length) {
    const last = stack.pop();

    cb(last);

    // 先进后出，所以先进右后进左
    if (last.right) stack.push(last.right);
    if (last.left) stack.push(last.left);
  }
};

const dfs_in_order_recursion = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);

    cb(node);

    if (node.right) dfs(node.right);
  }

  dfs(tree);
};

const dfs_in_order_iteration = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const stack = [tree];

  let current = tree;

  while( stack.length) {
    if (current.left) {
      stack.push(current.left);
      current = current.left;
    } else {
      const node = stack.pop();

      cb(node);

      if (node.right) {
        stack.push(node.right);
        current = node.right;
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
  const stack = [tree];

  let lastNode = tree;

  while(stack.length) {
    const top = stack[stack.length - 1];

    if (top.left && lastNode !== top.left && lastNode !== top.right) {
      stack.push(top.left);
    } else if (top.right && lastNode !== top.right) {
      stack.push(top.right);
    } else {
      lastNode = stack.pop();

      cb(lastNode);
    }
  }
};


const bfs_recursion = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {
  const queue = [tree];

  while(queue.length) {
    const first = queue.shift();

    cb(first);

    if (first.left) queue.push(first.left);
    if (first.right) queue.push(first.right);
  }
};

const bfs_iteration = (
  tree: TreeNode,
  cb: (tree: TreeNode) => boolean | void
) => {

};

const bfs_per_level = (tree: TreeNode) => {
  const results: number[][] = [];

  const queue = [tree];

  while(queue.length) {
    const currentLevelCount = queue.length;

    const currentLevelResult: number[] = [];

    for (let i = 0; i < currentLevelCount; i++) {
      const current = queue.shift();

      currentLevelResult.push(current.val);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    results.push(currentLevelResult)
  }

  return results;
};

const tree = list2TreeNode([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
// bfs_recursion(tree, (tree) =>
//   console.log(tree.val)
// );
console.log(bfs_per_level(tree));
