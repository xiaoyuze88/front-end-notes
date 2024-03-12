// 合并两个有序链表
// https://leetcode.cn/explore/interview/card/bytedance/244/linked-list-and-tree/1048/
// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

import { printResult } from "../../utils";
import { ListNode, arrayToListNode, listNodeToArray } from "../../linked-list/ListNode";
import isEqual from 'lodash.isequal';
 

// 示例 1：


// 输入：l1 = [1,2,4], l2 = [1,3,4]
// 输出：[1,1,2,3,4,4]
// 示例 2：

// 输入：l1 = [], l2 = []
// 输出：[]
// 示例 3：

// 输入：l1 = [], l2 = [0]
// 输出：[0]
 

// 提示：

// 两个链表的节点数目范围是 [0, 50]
// -100 <= Node.val <= 100
// l1 和 l2 均按 非递减顺序 排列

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
   let listHead: ListNode = null;
   let currentNode: ListNode;

  const insert = (value: number) => {
    // 未初始化，给头赋值
    if (!listHead) {
      listHead = new ListNode(value);
      currentNode = listHead;
    } else {
      const nextNode = new ListNode(value);
      currentNode.next = nextNode;
      currentNode = nextNode;
    }
  }

  while (list1 || list2) {
    if (list1 && list2) {
      const v1 = list1.val;
      const v2 = list2.val;
  
      if (v1 <= v2) {
        insert(v1);
        list1 = list1.next;
      } else {
        insert(v2);
        list2 = list2.next;
      }
    } else if (list1) {
      insert(list1.val);
      list1 = list1.next;
    } else {
      insert(list2.val);
      list2 = list2.next;
    }
  }

  // console.log('list1', list1);
  // console.log('list2', list2);
  // console.log('newList', listHead);

  return listHead;
};

const test = (arr1: number[], arr2: number[], expected: number[]) => {
  printResult(mergeTwoLists, [arrayToListNode(arr1), arrayToListNode(arr2)], arrayToListNode(expected), (resp, expected) => {
    const res = listNodeToArray(resp);
    const exp = listNodeToArray(expected);
  
    console.log({ res, exp })
  
    return isEqual(res, exp);
  })
}

// test([1,2,4], [1,3,4], [1,1,2,3,4,4])
test([], [],  [])
