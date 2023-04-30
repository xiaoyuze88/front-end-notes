import { printResult } from "../utils";
import { ListNode, arrayToListNode } from "./ListNode";

// 给你一个链表的头节点 head 。删除 链表的 中间节点 ，并返回修改后的链表的头节点 head 。

// 长度为 n 链表的中间节点是从头数起第 ⌊n / 2⌋ 个节点（下标从 0 开始），其中 ⌊x⌋ 表示小于或等于 x 的最大整数。

// 对于 n = 1、2、3、4 和 5 的情况，中间节点的下标分别是 0、1、1、2 和 2 。
//

// 示例 1：

// 输入：head = [1,3,4,7,1,2,6]
// 输出：[1,3,4,1,2,6]
// 解释：
// 上图表示给出的链表。节点的下标分别标注在每个节点的下方。
// 由于 n = 7 ，值为 7 的节点 3 是中间节点，用红色标注。
// 返回结果为移除节点后的新链表。
// 示例 2：

// 输入：head = [1,2,3,4]
// 输出：[1,2,4]
// 解释：
// 上图表示给出的链表。
// 对于 n = 4 ，值为 3 的节点 2 是中间节点，用红色标注。
// 示例 3：

// 输入：head = [2,1]
// 输出：[2]
// 解释：
// 上图表示给出的链表。
// 对于 n = 2 ，值为 1 的节点 1 是中间节点，用红色标注。
// 值为 2 的节点 0 是移除节点 1 后剩下的唯一一个节点。
//

// 提示：

// 链表中节点的数目在范围 [1, 105] 内
// 1 <= Node.val <= 10^5

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/delete-the-middle-node-of-a-linked-list

// 链表 快慢指针
// 快指针每次移动2，慢指针每次移动1，则快指针遍历完时，慢指针指向中间
function deleteMiddle(head: ListNode | null): ListNode | null {
  // n = 1
  if (!head.next) return null;

  // n > 2
  let fast: ListNode = head;
  let slow: ListNode = head;

  while (fast.next) {
    if (fast.next?.next) {
      fast = fast.next.next;
    } else {
      fast = fast.next;
    }

    if (fast.next) {
      slow = slow.next;
    } else {
      // slow.next 就是中点，干掉他
      slow.next = slow.next.next;
    }
  }

  return head;
}

// const printResult = (arr: number[]) => {
//   let head = new ListNode(arr[0]);

//   let current = head;

//   for (let i = 1, l = arr.length; i < l; i++) {
//     current.next = new ListNode(arr[i]);
//     current = current.next;
//   }

//   const result = deleteMiddle(head);

//   current = result;

//   const resultArr = [];

//   while (current) {
//     resultArr.push(current.val);
//     current = current.next;
//   }

//   console.log(arr, resultArr);
// };

const listNode1 = arrayToListNode([1, 2, 3, 4]);
const listNode2 = arrayToListNode([2, 1]);

printResult(deleteMiddle, [listNode1], arrayToListNode([1, 3, 4, 1, 2, 6]));
printResult(deleteMiddle, [listNode2], arrayToListNode([2]));
