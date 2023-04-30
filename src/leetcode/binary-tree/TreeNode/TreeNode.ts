export class TreeNode<T = number> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  constructor(val?: T, left?: TreeNode<T> | null, right?: TreeNode<T> | null) {
    this.val = val === undefined ? null : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

export type TreeNodeIteratorCallback<T = number> = (nodeValue: T, node: TreeNode<T>) => void;

// [3, 9, 20, null, null, 15, 7];
// [1, null, 2, 3, 4, null, null, 5]; // null下面的节点被省略
export const arrayToTreeNode = <T = number>(array: T[]): TreeNode<T> => {
  const root = new TreeNode<T>(array[0]);

  const queue = [root];

  let isLeft = true;

  for (let i = 1, l = array.length; i < l; i++) {
    const parent = queue[0];

    if (isLeft) {
      if (array[i] !== null) {
        parent.left = new TreeNode(array[i]);
        queue.push(parent.left);
      }
      isLeft = false;
    } else {
      if (array[i] !== null) {
        parent.right = new TreeNode(array[i]);
        queue.push(parent.right);
      }

      isLeft = true;
      queue.shift();
    }
  }

  return root;
};

export const arrayToTreeNode2 = <T = number>(array: T[]): TreeNode<T> => {
  if (!array.length) return null;

  const root = new TreeNode(array[0]);

  const queue = [root];

  let isLeft = true;

  for (let i = 1, l = array.length; i < l; i++) {
    const parent = queue[0];

    if (isLeft) {
      if (array[i] !== null) {
        parent.left = new TreeNode(array[i]);
        queue.push(parent.left);
      }
      isLeft = false;
    } else {
      if (array[i] !== null) {
        parent.right = new TreeNode(array[i]);
        queue.push(parent.right);
      }

      isLeft = true;
      queue.shift();
    }
  }

  return root;
};

export const testNodes = {
  tree1: arrayToTreeNode2([3, 9, 20, null, null, 15, 17]),
  tree2: arrayToTreeNode([1, null, 2, 3, 4, null, null, 5]),
  treeFull: arrayToTreeNode([1, 2, 3, 4, 5, 6, 7]),
  treeFullDeep: arrayToTreeNode([1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "-", "/", "!", "$", "@"])
};

// console.log(testNodes.treeFull);
