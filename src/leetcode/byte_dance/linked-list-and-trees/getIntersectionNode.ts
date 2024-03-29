// 相交链表
// https://leetcode.cn/explore/interview/card/bytedance/244/linked-list-and-tree/1024/
// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。

import {
  ListNode,
  arrayToListNode,
  iteratorListNode,
} from "../../linked-list/ListNode";

// 图示两个链表在节点 c1 开始相交：

// 题目数据 保证 整个链式结构中不存在环。

// 注意，函数返回结果后，链表必须 保持其原始结构 。

// 自定义评测：

// 评测系统 的输入如下（你设计的程序 不适用 此输入）：

// intersectVal - 相交的起始节点的值。如果不存在相交节点，这一值为 0
// listA - 第一个链表
// listB - 第二个链表
// skipA - 在 listA 中（从头节点开始）跳到交叉节点的节点数
// skipB - 在 listB 中（从头节点开始）跳到交叉节点的节点数
// 评测系统将根据这些输入创建链式数据结构，并将两个头节点 headA 和 headB 传递给你的程序。如果程序能够正确返回相交节点，那么你的解决方案将被 视作正确答案 。

// 示例 1：

// 输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
// 输出：Intersected at '8'
// 解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
// 从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。
// 在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
// — 请注意相交节点的值不为 1，因为在链表 A 和链表 B 之中值为 1 的节点 (A 中第二个节点和 B 中第三个节点) 是不同的节点。换句话说，它们在内存中指向两个不同的位置，而链表 A 和链表 B 中值为 8 的节点 (A 中第三个节点，B 中第四个节点) 在内存中指向相同的位置。

// 示例 2：

// 输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
// 输出：Intersected at '2'
// 解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
// 从各自的表头开始算起，链表 A 为 [1,9,1,2,4]，链表 B 为 [3,2,4]。
// 在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。
// 示例 3：

// 输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
// 输出：null
// 解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
// 由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
// 这两个链表不相交，因此返回 null 。

// 提示：

// listA 中节点数目为 m
// listB 中节点数目为 n
// 1 <= m, n <= 3 * 104
// 1 <= Node.val <= 105
// 0 <= skipA <= m
// 0 <= skipB <= n
// 如果 listA 和 listB 没有交点，intersectVal 为 0
// 如果 listA 和 listB 有交点，intersectVal == listA[skipA] == listB[skipB]

// 进阶：你能否设计一个时间复杂度 O(m + n) 、仅用 O(1) 内存的解决方案？

/**
 * 假设 A 到交叉点前有 a 步，交叉部分有 c 步，B到交叉点前有 b 步
 *
 * 如果两个指针同时走，走完A，将头指向 B，另一个走完B后，指向A，这么他们最终必将相交，因为 a + c + b = b + c + a
 *
 * 相交点即是所求节点，如果找不到，最后两个都将走到头
 */

function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
): ListNode | null {
  // 双指针
  // 如果两链表相交
  // 1. 长度相同，那么走一遍即可相遇
  // 2. 如果长度不相同，假设相交部分长度为c，A相交前长度为a，B长度为b
  //    那么当A走完，长度为 a + c, B走完长度为 b + c，A走完后，让指针指向B head，B走完后指针指向 A head，这样再次走到相交处，两个长度分别为：
  //    A: a + c + b
  //    B: b + c + a
  //    即步数相等，也就是如果相交，则走完A走B后（走完B走A）后，必定相交，返回相交处即可；如果不相交，则会走到头，返回null即可

  // let a = 0;
  // let b = 0;
  let aNode = headA;
  let bNode = headB;

  const doneMap = { a: false, b: false };

  while (aNode !== bNode) {
    // 保证每个只交叉一次
    if (!aNode.next) {
      if (!doneMap.a) {
        doneMap.a = true;
        aNode = headB;
      } else {
        return null;
      }
    } else {
      aNode = aNode.next;
    }

    // 保证每个只交叉一次
    if (!bNode.next) {
      if (!doneMap.b) {
        doneMap.b = true;
        bNode = headA;
      } else {
        return null;
      }
    } else {
      bNode = bNode.next;
    }
  }

  return aNode;
}

const genListNode = (
  A: number[],
  B: number[],
  posA: number,
  posB: number,
  intersectVal: number
) => {
  let headA: ListNode;
  let headB: ListNode;

  // 不相交
  if (intersectVal === 0) {
    headA = arrayToListNode(A);
    headB = arrayToListNode(B);
  } else {
    let intersectionNode: ListNode;

    let currentA: ListNode;

    for (let i = 0, l = A.length; i < l; i++) {
      if (!headA) {
        headA = new ListNode(A[i]);
        currentA = headA;
      } else {
        currentA.next = new ListNode(A[i]);
        currentA = currentA.next;
      }

      // 跳出点下一个即使入口
      if (i === posA + 1) {
        intersectionNode = currentA;
      }
    }

    let currentB: ListNode;

    for (let i = 0, l = B.length; i < l; i++) {
      if (!headB) {
        headB = new ListNode(B[i]);
        currentB = headB;
      } else {
        // 指向跳出点
        if (i === posB + 1) {
          currentB.next = intersectionNode;
          break;
        } else {
          currentB.next = new ListNode(B[i]);
          currentB = currentB.next;
        }
      }
    }

    // console.log('headA', headA);
    // iteratorListNode(headA, (v) => console.log(v));
    // console.log('headB', headB);
    // iteratorListNode(headB, (v) => console.log(v));
  }

  return { headA, headB };
};

const test = (
  A: number[],
  B: number[],
  posA: number,
  posB: number,
  intersectVal: number
) => {
  const { headA, headB } = genListNode(A, B, posA, posB, intersectVal);

  getIntersectionNode(headA, headB);
};

// intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
// test([4, 1, 8, 4, 5], [5, 6, 1, 8, 4, 5], 2, 3, 8);
test([2, 6, 4], [1, 5], 3, 2, 0);
