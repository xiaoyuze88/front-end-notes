// 排序链表
// https://leetcode.cn/explore/interview/card/bytedance/244/linked-list-and-tree/1040/
// 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

import { printResult } from "../../utils";
import {
  ListNode,
  arrayToListNode,
  listNodeToArray,
} from "../../linked-list/ListNode";
import isEqual from "lodash.isequal";

// 示例 1：

// 输入：head = [4,2,1,3]
// 输出：[1,2,3,4]
// 示例 2：

// 输入：head = [-1,5,3,4,0]
// 输出：[-1,0,3,4,5]
// 示例 3：

// 输入：head = []
// 输出：[]

// 提示：

// 链表中节点的数目在范围 [0, 5 * 104] 内
// -105 <= Node.val <= 105

// 进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？

// 1. 从上到下，通过快慢指针找中的办法，来进行递归mergeSort，时间复杂度 O(N*logN)，空间复杂度 O(logN)
// 2. 从下到上，通过遍历方法进行mergeSort，可达到空间复杂度 O(1)
function sortList1(head: ListNode | null): ListNode | null {
  const divide = (head: ListNode) => {
    let slow = head;
    let quick = head;

    while (quick) {
      if (!quick.next?.next) break;

      slow = slow.next;
      quick = quick.next?.next;
    }

    const right = slow.next;
    slow.next = null;

    // head.next = null;

    return { left: head, right };
  };

  const merge = (left: ListNode, right: ListNode) => {
    let result: ListNode = null;
    let current: ListNode = null;

    const update = (value: number) => {
      if (!result) {
        result = new ListNode(value);
        current = result;
      } else {
        current.next = new ListNode(value);
        current = current.next;
      }
    };

    // console.log("merging", { left, right });

    while (left && right) {
      // console.log("current", { left, right, result });

      if (left.val <= right.val) {
        update(left.val);
        left = left.next;
      } else {
        update(right.val);
        right = right.next;
      }
    }

    while (left) {
      update(left.val);
      left = left.next;
    }

    while (right) {
      update(right.val);
      right = right.next;
    }

    return result;
  };

  if (!head?.next) {
    // console.log("dead end", head);
    return head;
  }

  let { left, right } = divide(head);

  // console.log("divided", { left, right });

  left = sortList(left);
  right = sortList(right);

  const result = merge(left, right);

  // console.log("result", result);

  return result;
}

// 循环解法
function sortList(head: ListNode | null): ListNode | null {
  const merge = (left: ListNode, right: ListNode) => {
    let result: ListNode = null;
    let current: ListNode = null;

    const update = (value: number) => {
      if (!result) {
        result = new ListNode(value);
        current = result;
      } else {
        current.next = new ListNode(value);
        current = current.next;
      }
    };

    // console.log("merging", { left, right });

    while (left && right) {
      // console.log("current", { left, right, result });

      if (left.val <= right.val) {
        update(left.val);
        left = left.next;
      } else {
        update(right.val);
        right = right.next;
      }
    }

    while (left) {
      update(left.val);
      left = left.next;
    }

    while (right) {
      update(right.val);
      right = right.next;
    }

    return result;
  };

  if (!head) return head;

  let length = 0;

  let current = head;

  while (current) {
    current = current.next;
    length++;
  }

  for (let subLength = 1; subLength < length; subLength++) {
    // TODO
  }

  return null;
}

const test = (arr: number[], expected: number[]) => {
  printResult(
    sortList,
    [arrayToListNode(arr)],
    arrayToListNode(expected),
    (resp, expected) => {
      const res = listNodeToArray(resp);
      const exp = listNodeToArray(expected);

      console.log({ res, exp });

      return isEqual(res, exp);
    }
  );
};

test([4, 2, 1, 3], [1, 2, 3, 4]);
// test([], []);
// test([-1, 5, 3, 4, 0], [-1, 0, 3, 4, 5]);
