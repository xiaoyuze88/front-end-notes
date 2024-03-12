// 两数相加
// https://leetcode.cn/explore/interview/card/bytedance/244/linked-list-and-tree/1022/
// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

import { ListNode, arrayToListNode, listNodeToArray } from "../../linked-list/ListNode";
import { printResult } from "../../utils";
import isEqual from 'lodash.isequal';

// 请你将两个数相加，并以相同形式返回一个表示和的链表。

// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 示例 1：

// 输入：l1 = [2,4,3], l2 = [5,6,4]
// 输出：[7,0,8]
// 解释：342 + 465 = 807.
// 示例 2：

// 输入：l1 = [0], l2 = [0]
// 输出：[0]
// 示例 3：

// 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// 输出：[8,9,9,9,0,0,0,1]

// 提示：

// 每个链表中的节点数在范围 [1, 100] 内
// 0 <= Node.val <= 9
// 题目数据保证列表表示的数字不含前导零

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  if (!l1 && !l2) return null;

  let resultHead: ListNode;
  let currentNode: ListNode;

  let carry = 0;

  while (l1 || l2) {
    let sum = (l1?.val || 0) + (l2?.val || 0) + carry;

    if (sum >= 10) {
      sum -= 10;
      carry = 1;
    } else {
      carry = 0;
    }

    // console.log('sum', sum);
    // console.log('currentNode', currentNode);

    if (!currentNode) {
      resultHead = new ListNode(sum);
      currentNode = resultHead;
    } else {
      const next = new ListNode(sum);

      currentNode.next = next;
      currentNode = next;
    }

    l1 = l1?.next;
    l2 = l2?.next;
  }

  if (carry) {
    currentNode.next = new ListNode(1);
  }

  return resultHead;
};

const test = (arr1: number[], arr2: number[], expected: number[]) => {
  printResult(addTwoNumbers, [arrayToListNode(arr1), arrayToListNode(arr2)], arrayToListNode(expected), (resp, expected) => {
    const res = listNodeToArray(resp);
    const exp = listNodeToArray(expected);
  
    console.log({ res, exp })
  
    return isEqual(res, exp);
  })
}



// test([2,4,3], [5,6,4], [7,0,8]);
// test([0], [0], [0]);
test([9,9,9,9,9,9,9], [9,9,9,9], [8,9,9,9,0,0,0,1]);