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

// 顺序合并，
function mergeKLists2(lists: Array<ListNode | null>): ListNode | null {
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

// 分治
// 第i次分出来 k/2^i 组，每组长度 2^i*n，约掉即 n * k，每次需要遍历所有项
// 共需要合并 logk 次，故复杂度 O(n*k*logk)
function mergeKLists1(lists: Array<ListNode | null>): ListNode | null {
  if (!lists.length) return null;

  if (lists.length === 1) return lists[0];

  const merge2Lists = (l1: ListNode, l2: ListNode) => {
    let head = new ListNode();

    let current = head;

    while (l1 && l2) {
      if (l1.val < l2.val) {
        current.next = l1;
        l1 = l1.next;
      } else {
        current.next = l2;
        l2 = l2.next;
      }

      current = current.next;
    }

    while (l1) {
      current.next = l1;
      l1 = l1.next;
      current = current.next;
    }

    while (l2) {
      current.next = l2;
      l2 = l2.next;
      current = current.next;
    }

    return head.next;
  };

  const mid = Math.floor(lists.length / 2);
  const left = mergeKLists1(lists.slice(0, mid));
  const right = mergeKLists1(lists.slice(mid));

  // console.log("left", left);
  // console.log("right", right);

  const result = merge2Lists(left, right);

  // console.log("after merge", result);

  return result;
}

// 最小堆，塞入ListNode（因为它本身是递增的）
// 共k个List，每次添加、删除复杂度 O(logn)，共 k*n 个元素，共 O(k*n*logn)

class HeapItem {
  node: ListNode;

  constructor(node: ListNode) {
    this.node = node;
  }
}

class Heap {
  data: HeapItem[] = [null];

  buildHeap(lists: Array<ListNode>) {
    // 前往后，下到上
    for (let i = 0, l = lists.length; i < l; i++) {
      this.add(lists[i]);
    }
  }

  add(node: ListNode) {
    this.data.push(new HeapItem(node));
    this.shiftUp(this.data.length - 1);
  }

  shiftUp(index: number) {
    while (index > 1) {
      const parent = Math.floor(index / 2);

      // console.log("this.data", this.data);
      // console.log("index", { index, parent });
      // console.log("nodes", {
      //   parent: this.data[parent],
      //   current: this.data[index],
      // });

      if (this.data[parent]?.node?.val > this.data[index]?.node?.val) {
        this.swap(parent, index);
        index = parent;
      } else {
        break;
      }
    }
  }

  shiftDown(index: number) {
    while (index < this.data.length) {
      const l = index * 2;
      const r = index * 2 + 1;

      let minIndex = index;

      // console.log("this.data", this.data);

      // console.log({
      //   index,
      //   l,
      //   r,
      //   lItem: this.data[l],
      //   rItem: this.data[r],
      //   currentItem: this.data[index],
      // });

      if (this.data[l]?.node.val < this.data[minIndex].node.val) {
        minIndex = l;
      }

      if (this.data[r]?.node.val < this.data[minIndex].node.val) {
        minIndex = r;
      }

      if (minIndex === index) {
        break;
      }

      this.swap(minIndex, index);
      index = minIndex;
    }
  }

  swap(a: number, b: number) {
    const temp = this.data[a];
    this.data[a] = this.data[b];
    this.data[b] = temp;
  }

  // 将堆顶的item推出
  pollItem(): HeapItem {
    const top = this.data[1];

    this.swap(1, this.data.length - 1);

    this.data.splice(this.data.length - 1, 1);

    this.shiftDown(1);

    return top;
  }

  // 将顶对应的节点指向下一个，然后让他shiftDown，如果为空了就把它删掉
  pollNode(): ListNode {
    const top = this.data[1];

    if (!top) return null;

    const currentNode = top.node;

    if (!currentNode?.next) {
      this.pollItem();
    } else {
      top.node = currentNode.next;
      // 因为已经将堆顶指向下一个节点，需要下沉更新位置
      this.shiftDown(1);
    }

    return currentNode;
  }

  top() {
    return this.data[1];
  }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const heap = new Heap();

  lists.forEach((node) => {
    if (node) {
      heap.add(node);
    }
  });

  const printCurrentHeap = () => {
    console.log(
      "heap",
      heap.data.map((item) => item?.node)
    );
  };

  printCurrentHeap();

  const head = new ListNode();

  let tail = head;

  while (heap.top()) {
    const topNode = heap.pollNode();

    // console.log("currentTop", topNode);
    // printCurrentHeap();

    tail.next = topNode;
    tail = tail.next;
  }

  return head.next;
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

// test([], []);
test([[], []], []);
