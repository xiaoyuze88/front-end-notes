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

class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

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

  console.log("sum", sum);

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

const l1 = genList([9, 9, 9, 9, 9, 9, 9]);
const l2 = genList([9, 9, 9, 9]);

function iterator(listNode: ListNode) {
  let current = listNode;

  while (current) {
    console.log("val", current.val);
    current = current.next;
  }
}

// console.log('l1', l1);
// console.log('l2', l2);

const resp = addTwoNumbers(l1, l2);

iterator(resp);
