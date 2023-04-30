// 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
//

// 示例 1：

// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]
// 示例 2：

// 输入：head = [1,2]
// 输出：[2,1]
// 示例 3：

// 输入：head = []
// 输出：[]
//

// 提示：

// 链表中节点的数目范围是 [0, 5000]
// -5000 <= Node.val <= 5000
//

// 进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/reverse-linked-list
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

import { ListNode, arrayToListNode, printListNode } from "./ListNode";

// 迭代
function reverseList(head: ListNode | null): ListNode | null {
  let current: ListNode = head;
  let prev: ListNode = null;

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

// 迭代
function reverseListRecursion(head: ListNode | null): ListNode | null {
  const revertListNodeItem = (current: ListNode, prev: ListNode): ListNode | null => {
    if (!current) return prev;

    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;

    return revertListNodeItem(current, prev);
  };

  return revertListNodeItem(head, null);
}

const listNode = arrayToListNode([1, 2, 3, 4, 5]);
printListNode(reverseListRecursion(listNode));
