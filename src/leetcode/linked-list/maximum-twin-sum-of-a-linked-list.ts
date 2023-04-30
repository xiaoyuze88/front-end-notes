// 在一个大小为 n 且 n 为 偶数 的链表中，对于 0 <= i <= (n / 2) - 1 的 i ，第 i 个节点（下标从 0 开始）的孪生节点为第 (n-1-i) 个节点 。

// 比方说，n = 4 那么节点 0 是节点 3 的孪生节点，节点 1 是节点 2 的孪生节点。这是长度为 n = 4 的链表中所有的孪生节点。
// 孪生和 定义为一个节点和它孪生节点两者值之和。

// 给你一个长度为偶数的链表的头节点 head ，请你返回链表的 最大孪生和 。

//

// 示例 1：

// 输入：head = [5,4,2,1]
// 输出：6
// 解释：
// 节点 0 和节点 1 分别是节点 3 和 2 的孪生节点。孪生和都为 6 。
// 链表中没有其他孪生节点。
// 所以，链表的最大孪生和是 6 。
// 示例 2：

// 输入：head = [4,2,2,3]
// 输出：7
// 解释：
// 链表中的孪生节点为：
// - 节点 0 是节点 3 的孪生节点，孪生和为 4 + 3 = 7 。
// - 节点 1 是节点 2 的孪生节点，孪生和为 2 + 2 = 4 。
// 所以，最大孪生和为 max(7, 4) = 7 。
// 示例 3：

// 输入：head = [1,100000]
// 输出：100001
// 解释：
// 链表中只有一对孪生节点，孪生和为 1 + 100000 = 100001 。
//

// 提示：

// 链表的节点数目是 [2, 105] 中的 偶数 。
// 1 <= Node.val <= 105

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/maximum-twin-sum-of-a-linked-list
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

import { ListNode, arrayToListNode } from "./ListNode";

function pairSum(head: ListNode | null): number {
  // 1. 快慢指针，快指针到尾时，慢指针指向左半边的终点，慢指针.next 为右半边的起点
  // 2. 翻转左半边
  // 3. 依次遍历左半边+右半边，计算和

  let fast = head;
  let slow = head;
  let prev: ListNode = null;

  let rightHead: ListNode;
  let leftHead: ListNode;

  while (fast?.next) {
    fast = fast.next?.next;

    // 一边遍历一边反转慢指针指向的链表
    const slowNext = slow.next;
    slow.next = prev;
    prev = slow;

    // 继续
    if (fast?.next) {
      slow = slowNext;
    }
    // 到头了，slow.next 为右半边起点，slow为左半边起点
    else {
      leftHead = slow;
      rightHead = slowNext;
    }
  }

  let maxSum = 0;
  let leftCurrent: ListNode = leftHead;
  let rightCurrent: ListNode = rightHead;

  // 开始计算最大和
  // 它们两个肯定是对称的，判断一个即可
  while (leftCurrent) {
    maxSum = Math.max(leftCurrent.val + rightCurrent.val, maxSum);
    leftCurrent = leftCurrent.next;
    rightCurrent = rightCurrent.next;
  }

  return maxSum;
}

const listNode = arrayToListNode([1, 2, 3, 4]);

console.log(pairSum(listNode));
