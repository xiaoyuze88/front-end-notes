import { IterationType } from "src/leetcode/utils";
import { TreeNode, TreeNodeIteratorCallback } from "./TreeNode";
import { inOrderIterator } from "./in-order-iterator";
import { postOrderIterator } from "./post-order-iterator";
import { preOrderIterator } from "./pre-order-iterator";

export const findTreeNode = <T = number>(
  tree: TreeNode<T>,
  matchFunc: (value: T, node: TreeNode<T>) => boolean,
  {
    iteratorType = "iteration",
    iteratorOrder = "pre-order"
  }: {
    iteratorType?: IterationType;
    iteratorOrder?: "in-order" | "pre-order" | "post-order";
  } = {}
) => {
  let target: TreeNode<T>;

  let iteratorFn: (tree: TreeNode<T>, cb: TreeNodeIteratorCallback<T>, type: IterationType) => void;

  switch (iteratorOrder) {
    case "in-order":
      iteratorFn = inOrderIterator;
      break;
    case "post-order":
      iteratorFn = postOrderIterator;
      break;
    case "pre-order":
      iteratorFn = preOrderIterator;
      break;
  }

  iteratorFn(
    tree,
    (val, node) => {
      if (matchFunc(val, node) === true) {
        target = node;
        return true;
      }
    },
    iteratorType
  );

  return target;
};
