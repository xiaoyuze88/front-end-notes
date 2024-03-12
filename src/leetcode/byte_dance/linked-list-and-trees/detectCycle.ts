// 环形链表 II
// https://leetcode.cn/explore/interview/card/bytedance/244/linked-list-and-tree/1023/
// 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

// 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

// 不允许修改 链表。

// 示例 1：
// 输入：head = [3,2,0,-4], pos = 1
// 输出：返回索引为 1 的链表节点
// 解释：链表中有一个环，其尾部连接到第二个节点。

// 示例 2：
// 输入：head = [1,2], pos = 0
// 输出：返回索引为 0 的链表节点
// 解释：链表中有一个环，其尾部连接到第一个节点。
// 示例 3：
// 输入：head = [1], pos = -1
// 输出：返回 null
// 解释：链表中没有环。

// 提示：

// 链表中节点的数目范围在范围 [0, 104] 内
// -105 <= Node.val <= 105
// pos 的值为 -1 或者链表中的一个有效索引

// 进阶：你是否可以使用 O(1) 空间解决此题？

import { printResult } from "../../utils";
import {
  ListNode,
  arrayToListNode,
  iteratorListNode,
  listNodeToArray,
} from "../../linked-list/ListNode";
import isEqual from "lodash.isequal";

function detectCycle(head: ListNode | null): ListNode | null {
  if (!head) return null;

  let fast = 0;
  let slow = 0;
  let fastNode: ListNode = head;
  let slowNode: ListNode = head;

  // 假设进入环之前步数为a，环中元素为b
  // 快慢指针相遇时，f比s多走了n圈，所以有：
  // f = 2s;
  // f = s + nb;
  // 有：
  // s = nb;
  // f = 2nb; 与 a 无关
  while ((fastNode === slowNode && !fast && !slow) || fastNode !== slowNode) {
    fastNode = fastNode?.next?.next;
    fast += 2;
    slowNode = slowNode?.next;
    slow++;

    if (!fastNode || !slowNode) return null;

    // console.log("fastNode", fastNode);
    // console.log("slowNode", slowNode);
  }

  // console.log({ fast, slow, fastNode, slowNode });
  // 再构建一个慢指针，从头开始走，每当路过环口时步数为：k = a + nb; 结合 s = nb，有 k = a + s;
  // 也就是说当s再走a步后，可以正好与k相遇，此时得出的a即是所求值

  let k = 0;
  let kNode = head;

  while (slowNode !== kNode) {
    slowNode = slowNode.next;
    kNode = kNode.next;
    k++;
  }

  // console.log({ k, kNode });

  return kNode;
}

const test = (arr: number[], expected: number) => {
  printResult(
    detectCycle,
    [genCircleLink(arr, expected)],
    1 as any,
    ((resp: ListNode | null, expected: number) => {
      return resp?.val === expected;
      // const res = listNodeToArray(resp);
      // const exp = listNodeToArray(expected);

      // console.log({ res, exp });

      // return isEqual(res, exp);
    }) as any
  );
};

const genCircleLink = (array: number[], pos: number): ListNode => {
  if (!array.length) return null;

  const head = new ListNode(array[0]);
  let current = head;

  let circleEntry: ListNode = null;

  for (let i = 1, l = array.length; i < l; i++) {
    current.next = new ListNode(array[i]);
    current = current.next;

    if (i === pos) {
      circleEntry = current;
    }

    if (i === array.length - 1 && circleEntry) {
      current.next = circleEntry;
    }
  }

  return head;
};

// test([3, 2, 0, -4], 1);
test([-1, -7, 7, -4, 19, 6, -9, -5, -2, -5], 9);

// const list = genCircleLink([3, 2, 0, -4], 1);

// iteratorListNode(list, (val) => console.log(val));

// console.log(genCircleLink([3, 2, 0, -4], 1));
