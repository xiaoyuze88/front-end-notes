// 合并 K 个升序链表
// https://leetcode.cn/explore/interview/card/bytedance/244/linked-list-and-tree/1025/
// 给你一个链表数组，每个链表都已经按升序排列。

import {
  ListNode,
  arrayToListNode,
  listNodeToArray,
} from "../../linked-list/ListNode";
import { printResult } from "../../utils";
import isEqual from "lodash.isequal";

// 请你将所有链表合并到一个升序链表中，返回合并后的链表。

// 示例 1：

// 输入：lists = [[1,4,5],[1,3,4],[2,6]]
// 输出：[1,1,2,3,4,4,5,6]
// 解释：链表数组如下：
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 将它们合并到一个有序链表中得到。
// 1->1->2->3->4->4->5->6
// 示例 2：

// 输入：lists = []
// 输出：[]
// 示例 3：

// 输入：lists = [[]]
// 输出：[]

// 提示：

// k == lists.length
// 0 <= k <= 10^4
// 0 <= lists[i].length <= 500
// -10^4 <= lists[i][j] <= 10^4
// lists[i] 按 升序 排列
// lists[i].length 的总和不超过 10^4

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists.length) return null;

  let head: ListNode = null;
  let current: ListNode = null;

  // 用完了就丢掉，最后数组会为空
  while (lists.length) {
    let min = Number.MAX_SAFE_INTEGER;
    let minIndex = -1;

    const emptyIndexList = [];

    for (let i = lists.length - 1; i >= 0; i--) {
      const node = lists[i];

      // 空的，mark下，最后统一踢掉
      if (!node) {
        emptyIndexList.push(i);
      } else {
        if (node.val < min) {
          min = node.val;
          minIndex = i;
        }
      }
    }

    // console.log("min", { min, minIndex });

    if (minIndex > -1) {
      // 一圈下来，找到最小的，推入，然后刷新
      if (!current) {
        head = new ListNode(min);
        current = head;
      } else {
        current.next = new ListNode(min);
        current = current.next;
      }

      console.log("head", head);

      if (lists[minIndex].next) {
        lists[minIndex] = lists[minIndex].next;
      } else {
        emptyIndexList.push(minIndex);
      }
    }

    if (emptyIndexList.length) {
      // console.log("emptyIndexList", emptyIndexList);
      emptyIndexList
        .sort((a, b) => (a > b ? -1 : 1))
        .forEach((index) => {
          lists.splice(index, 1);
        });

      // console.log("after splice", lists);
    }
  }

  return head;
}

const test = (lists: Array<number[]>, expected: number[]) => {
  printResult(
    mergeKLists,
    [lists.map((list) => arrayToListNode(list))],
    arrayToListNode(expected),
    (resp, expected) => {
      const r = listNodeToArray(resp);
      const exp = listNodeToArray(expected);

      console.log("resp", r);
      console.log("expected", exp);

      return isEqual(r, exp);
    }
  );
};

// test(
//   [
//     [1, 4, 5],
//     [1, 3, 4],
//     [2, 6],
//   ],
//   [1, 1, 2, 3, 4, 4, 5, 6]
// );

test([], []);
test([[]], []);
