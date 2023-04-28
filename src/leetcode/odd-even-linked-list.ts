// 给定单链表的头节点 head ，将所有索引为奇数的节点和索引为偶数的节点分别组合在一起，然后返回重新排序的列表。

// 第一个节点的索引被认为是 奇数 ， 第二个节点的索引为 偶数 ，以此类推。

// 请注意，偶数组和奇数组内部的相对顺序应该与输入时保持一致。

// 你必须在 O(1) 的额外空间复杂度和 O(n) 的时间复杂度下解决这个问题。

//

// 示例 1:

// 输入: head = [1,2,3,4,5]
// 输出: [1,3,5,2,4]
// 示例 2:

// 输入: head = [2,1,3,5,6,4,7]
// 输出: [2,3,6,7,1,5,4]
//

// 提示:

// n ==  链表中的节点数
// 0 <= n <= 104
// -106 <= Node.val <= 106

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/odd-even-linked-list
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// 链表嘛，先分别将奇偶连起来，再把他们俩连起来就完了
function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head?.next) return head;

  const evenHead: ListNode = head.next;

  let odd = head;
  let even = head.next;

  // 根据测试，发现当 !even || !even.next 时会退出循环
  while (even && even.next) {
    // 交替赋值
    odd.next = even.next;
    odd = odd.next;
    // 交替赋值
    even.next = odd.next;
    even = even.next;
  }

  // 连接起来
  odd.next = evenHead;

  return head;
}
