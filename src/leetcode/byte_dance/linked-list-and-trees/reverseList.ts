// 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
// https://leetcode.cn/explore/interview/card/bytedance/244/linked-list-and-tree/1038/

import { printResult } from "../../utils";
import { ListNode, arrayToListNode, listNodeToArray } from "../../linked-list/ListNode";
import isEqual from 'lodash.isequal';

 
// 示例 1：


// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]
// 示例 2：


// 输入：head = [1,2]
// 输出：[2,1]
// 示例 3：

// 输入：head = []
// 输出：[]
 

// 提示：

// 链表中节点的数目范围是 [0, 5000]
// -5000 <= Node.val <= 5000
 

// 进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？

function reverseList1(head: ListNode | null): ListNode | null {
  const reverseNode = (current: ListNode, prevNode: ListNode | null) => {
    const next = current.next;

    current.next = prevNode;

    return next;
  };

  let current = head;
  let prev: ListNode = null;

  while (current) {
    const next = reverseNode(current, prev);

    if (next) {
      prev = current;
      current = next;
      // console.log('current', current);
      // console.log('prev', prev);
    } else {
      // console.log('end', current);
      break;
    }
  }

  return current;
};

function reverseList(head: ListNode | null): ListNode | null {
  const reverseNode = (current: ListNode, prevNode: ListNode | null) => {
    if (!current.next) {
      current.next = prevNode;
      return current;
    }

    const next = current.next;

    current.next = prevNode;

    // console.log('prev', current)
    // console.log('next', next)

    return reverseNode(next, current);
  };

  if (!head) return null;

  return reverseNode(head, null);
};

const test = (arr: number[], expected: number[]) => {
  printResult(reverseList, [arrayToListNode(arr)], arrayToListNode(expected), (resp, expected) => {
    const res = listNodeToArray(resp);
    const exp = listNodeToArray(expected);
  
    console.log({ res, exp })
  
    return isEqual(res, exp);
  })
}


// test([1,2,3,4,5], [5,4,3,2,1]);
test([], []);