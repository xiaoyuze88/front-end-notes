import { TreeNode, TreeNodeIteratorCallback, testNodes } from "./TreeNode";
import {
  bfs_iteration,
  bfs_recursion,
  inOrderIterator_iteration,
  inOrderIterator_recursion,
  preOrderIterator_iteration,
  preOrderIterator_recursion,
  postOrderIterator_iteration,
  postOrderIterator_recursion
} from "./interface";
import isEqual from "lodash.isequal";

const expected = {
  tree1: {
    bfs: [3, 9, 20, 15, 17],
    preOrder: [3, 9, 20, 15, 17],
    inOrder: [9, 3, 15, 20, 17],
    postOrder: [9, 15, 17, 20, 3]
  },
  tree2: {
    bfs: [1, 2, 3, 4, 5],
    preOrder: [1, 2, 3, 4, 5],
    inOrder: [1, 3, 2, 5, 4],
    postOrder: [3, 5, 4, 2, 1]
  },
  treeFull: {
    bfs: [1, 2, 3, 4, 5, 6, 7],
    preOrder: [1, 2, 4, 5, 3, 6, 7],
    inOrder: [4, 2, 5, 1, 6, 3, 7],
    postOrder: [4, 5, 2, 6, 7, 3, 1]
  },
  treeFullDeep: {
    bfs: [1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "-", "/", "!", "$", "@"],
    preOrder: [1, 2, 4, 8, 9, 5, "+", "-", 3, 6, "/", "!", 7, "$", "@"],
    inOrder: [8, 4, 9, 2, "+", 5, "-", 1, "/", 6, "!", 3, "$", 7, "@"],
    postOrder: [8, 9, 4, "+", "-", 5, 2, "/", "!", 6, "$", "@", 7, 3, 1]
  }
};

function runTest(type: "bfs" | "preOrder" | "inOrder" | "postOrder") {
  const testFns: ((tree: TreeNode, cb: TreeNodeIteratorCallback) => void)[] = [];

  switch (type) {
    case "bfs":
      testFns.push(bfs_iteration, bfs_recursion);
      break;
    case "preOrder":
      // preOrderIterator_recursion
      testFns.push(preOrderIterator_iteration);
      break;
    case "inOrder":
      // inOrderIterator_recursion
      testFns.push(inOrderIterator_iteration);
      break;
    case "postOrder":
      // postOrderIterator_recursion
      testFns.push(postOrderIterator_iteration);
      break;
  }

  Object.keys(testNodes).forEach((key, index) => {
    testFns.forEach((fn) => {
      console.log(`running type: ${type}`);
      const resp = [];
      fn(testNodes[key], (value) => {
        // console.log(value);
        resp.push(value);
      });
      const expectedValue = expected[key][type];
      console.log(
        `test case ${index}: ${resp}, expected: ${expectedValue}, isMatch? ${isEqual(
          resp,
          expectedValue
        )}`
      );
    });
  });
}

runTest('postOrder');
