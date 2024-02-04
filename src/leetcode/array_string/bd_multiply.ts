// https://leetcode.cn/explore/interview/card/bytedance/242/string/1015/
// 字符串相乘
// 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

import {
  ListNode,
  iteratorListNode,
  printListNode,
} from "../linked-list/ListNode";
import { printResult } from "../utils";

// 注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。

// 示例 1:

// 输入: num1 = "2", num2 = "3"
// 输出: "6"
// 示例 2:

// 输入: num1 = "123", num2 = "456"
// 输出: "56088"

// 提示：

// 1 <= num1.length, num2.length <= 200
// num1 和 num2 只能由数字组成。
// num1 和 num2 都不包含任何前导零，除了数字0本身。

function fillString(
  n1: string,
  n2: string
): {
  n1: string;
  n2: string;
} {
  if (n1.length > n2.length) {
    n2 = [...Array(n1.length - n2.length)].map(() => 0).join("") + n2;
  } else if (n1.length < n2.length) {
    n1 = [...Array(n2.length - n1.length)].map(() => 0).join("") + n1;
  }

  return { n1, n2 };
}

function string2Node(number: string) {
  let start: ListNode;
  let current: ListNode;

  for (let i = number.length - 1; i >= 0; i--) {
    // console.log("number", number[i]);

    if (!start) {
      start = new ListNode(+number[i]);
      current = start;
    } else {
      const next = new ListNode(+number[i]);
      current.next = next;
      current = next;
    }
  }

  return start;
}

function addNode(node1: ListNode, node2: ListNode): ListNode {
  console.log("node1", printListNode(node1));
  console.log("node2", printListNode(node2));

  let carry = 0;

  let start: ListNode;
  let current: ListNode;

  const add = (n1: ListNode, n2: ListNode) => {
    let count = (n1?.val || 0) + (n2?.val || 0) + carry;

    if (count >= 10) {
      carry = 1;
      count -= 10;
    } else {
      carry = 0;
    }

    if (!start) {
      start = new ListNode(count);
      current = start;
    } else {
      const next = new ListNode(count);
      current.next = next;
      current = next;
    }
  };

  while (node1?.next || node2?.next) {
    add(node1, node2);

    node1 = node1?.next;
    node2 = node2?.next;
  }

  add(node1, node2);

  if (carry) {
    current.next = new ListNode(1);
  }

  console.log("result", printListNode(start));

  return start;
}

// 大数相加
// function add(number1: string, number2: string): string {
//   const { n1, n2 } = fillString(number1, number2);

//   const maxLen = Math.max(n1.length, n2.length);

//   let carry = 0;
//   let firstNode: ListNode;

//   let currentNode: ListNode;

//   for (let i = 0; i < maxLen; i++) {
//     const realIndex = maxLen - i - 1;

//     let count = (+n1[realIndex] || 0) + (+n2[realIndex] || 0) + carry;
//     console.log(
//       "realIndex",
//       realIndex,
//       n1[realIndex] || 0,
//       n2[realIndex] || 0,
//       carry,
//       count
//     );

//     if (count > 10) {
//       carry = 1;
//       count -= 10;
//     } else {
//       carry = 0;
//     }

//     if (!firstNode) {
//       firstNode = new ListNode(count);
//       currentNode = firstNode;
//     } else {
//       const current = new ListNode(count);
//       currentNode.setNext(current);
//       currentNode = current;
//     }
//   }

//   console.log(firstNode);
//   let current = firstNode;

//   while (current.next) {
//     console.log(current.value);
//     current = current.next;
//   }

//   return "fuck";

//   // iteratorListNode(firstNode);
// }

// add("121932631112635260", "9");

function multiply(num1: string, num2: string) {
  const len_1 = num1.length;
  const len_2 = num2.length;

  let count = new ListNode(0);

  for (let i1 = 0; i1 < len_1; i1++) {
    for (let i2 = 0; i2 < len_2; i2++) {
      const index1 = len_1 - i1 - 1;
      const index2 = len_2 - i2 - 1;

      let result =
        +num2[index2] *
        +num1[index1] *
        Math.pow(10, index2) *
        Math.pow(10, index1);

      // console.log(
      //   "i,j",
      //   index1,
      //   index2,
      //   num1[index1],
      //   num2[index2],
      //   +num2[index2] * +num1[index1],
      //   Math.pow(10, index1),
      //   Math.pow(10, index2),
      //   result,
      //   count
      // );

      const current = string2Node(String(result));

      count = addNode(count, current);

      // count += result;

      // console.log("current count", count);
    }
  }

  console.log("count", printListNode(count));

  return "";
  // return String(count);
}

// printResult(multiply, ["2", "3"], "6");
// printResult(multiply, ["123", "456"], "56088");
// printResult(multiply, ["123456789", "987654321"], "121932631112635269");
printResult(multiply, ["10", "10"], "100");
