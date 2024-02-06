export class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;

  constructor(val?: T, next?: ListNode<T> | null) {
    this.val = val === undefined ? null : val;
    this.next = next === undefined ? null : next;
  }
}

export const arrayToListNode = <T = number>(
  array: T[],
  reverse?: boolean
): ListNode<T> | null => {
  if (!array.length) return null;

  let head = new ListNode<T>(array[0]);
  let current = head;

  if (!reverse) {
    for (let i = 1, l = array.length; i < l; i++) {
      current.next = new ListNode<T>(array[i]);
      current = current.next;
    }
  } else {
    for (let i = array.length - 1; i >= 0; i--) {
      if (i === array.length - 1) {
        current = head = new ListNode<T>(array[i]);
      } else {
        current.next = new ListNode<T>(array[i]);
        current = current.next;
      }
    }
  }

  return head;
};

export const listNodeToArray = <T = number>(listNode: ListNode<T>): T[] => {
  const array: T[] = [];

  iteratorListNode(listNode, (val) => {
    array.push(val);
  });

  return array;
};

export const parseNumberStringFromListNode = (
  listNode: ListNode<number>
): string => {
  const array = listNodeToArray(listNode);

  // 去掉前面补的0
  let number = array.reverse().join("");

  let firstNoneZeroIndex = -1;

  for (let i = 0, l = number.length; i < l; i++) {
    if (+number[i] != 0) {
      firstNoneZeroIndex = i;
      break;
    }
  }

  return number.substring(firstNoneZeroIndex);
};

export const printListNode = <T = number>(listNode: ListNode<T>): void => {
  iteratorListNode(listNode, (val) => console.log(val));
};

export const iteratorListNode = <T = number>(
  listNode: ListNode<T>,
  iteratorFn: (value: T) => any
) => {
  let current = listNode;

  while (current) {
    iteratorFn(current.val);
    current = current.next;
  }
};

// test
// const listNode = arrayToListNode([1, 2, 3, 4]);
// iteratorListNode(listNode, (val) => console.log(val));

// console.log(listNodeToArray(listNode));
