import { ListNode, arrayToListNode, iteratorListNode } from "../utils";

// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

// 请你将两个数相加，并以相同形式返回一个表示和的链表。

// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

//

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
//

// 提示：

// 每个链表中的节点数在范围 [1, 100] 内
// 0 <= Node.val <= 9
// 题目数据保证列表表示的数字不含前导零

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/add-two-numbers
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

function addTwoNumbers1(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let currentIndex = 0;

  let currentL1 = l1;
  let currentL2 = l2;

  let sum = 0;

  while (currentL1 || currentL2) {
    sum += ((currentL1?.val || 0) + (currentL2?.val || 0)) * Math.pow(10, currentIndex);
    currentL1 = currentL1?.next;
    currentL2 = currentL2?.next;
    currentIndex++;
  }

  const sumStr = String(sum);

  return genList(sumStr.split(""), true);
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  let currentL1 = l1;
  let currentL2 = l2;

  let nextCarry = 0;

  let head: ListNode;
  let current: ListNode;

  while (currentL1 || currentL2) {
    const sum = (currentL1?.val || 0) + (currentL2?.val || 0) + nextCarry;

    nextCarry = sum >= 10 ? 1 : 0;

    const currentValue = sum >= 10 ? sum - 10 : sum;

    console.log("sum", {
      sum,
      nextCarry,
      currentValue
    });

    if (!head) {
      current = head = new ListNode(currentValue);
    } else {
      current.next = new ListNode(currentValue);
      current = current.next;
    }

    currentL1 = currentL1?.next;
    currentL2 = currentL2?.next;
  }

  if (nextCarry) {
    current.next = new ListNode(nextCarry);
  }

  return head;
}

const genList = (array, reverse?: boolean) => {
  let head: ListNode;
  let current: ListNode;

  if (reverse) {
    for (let i = array.length - 1; i >= 0; i--) {
      console.log(i, array[i]);

      if (i === array.length - 1) {
        current = head = new ListNode(+array[i]);
      } else {
        current.next = new ListNode(+array[i]);
        current = current.next;
      }
    }
  } else {
    for (let i = 0, l = array.length; i < l; i++) {
      console.log(i, array[i]);

      if (i === 0) {
        current = head = new ListNode(+array[i]);
      } else {
        current.next = new ListNode(+array[i]);
        current = current.next;
      }
    }
  }

  return head;
};

const listNode1 = arrayToListNode([9, 9, 9, 9, 9, 9, 9]);
const listNode2 = arrayToListNode([9, 9, 9, 9]);

const resp = addTwoNumbers(listNode1, listNode2);

iteratorListNode(resp, (val) => console.log(val));
