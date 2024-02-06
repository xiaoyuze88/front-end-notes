// https://leetcode.cn/explore/interview/card/bytedance/242/string/1015/
// 字符串相乘
// 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。

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

class ListNode2<T = number> {
  val: T;
  next: ListNode2<T> | null;

  constructor(val?: T, next?: ListNode2<T> | null) {
    this.val = val === undefined ? null : val;
    this.next = next === undefined ? null : next;
  }
}

function string2Node(number: string) {
  let start: ListNode2;
  let current: ListNode2;

  for (let i = number.length - 1; i >= 0; i--) {
    if (!start) {
      start = new ListNode2(+number[i]);
      current = start;
    } else {
      const next = new ListNode2(+number[i]);
      current.next = next;
      current = next;
    }
  }

  return start;
}

// // 大数相加
// function add(number1: string, number2: string): string {
//   const n1 = string2Node(number1);
//   const n2 = string2Node(number2);

//   const sumResult = addNode(n1, n2);

//   const resultString = parseNumberStringFromListNode2(sumResult);

//   return resultString;
// }

// console.log("test", add("121932631112635260", "9"));

const iteratorListNode = <T = number>(
  ListNode2: ListNode2<T>,
  iteratorFn: (value: T) => any
) => {
  let current = ListNode2;

  while (current) {
    iteratorFn(current.val);
    current = current.next;
  }
};

const ListNodeToArray = <T = number>(ListNode2: ListNode2<T>): T[] => {
  const array: T[] = [];

  iteratorListNode(ListNode2, (val) => {
    array.push(val);
  });

  return array;
};

const parseNumberStringFromListNode2 = (
  ListNode2: ListNode2<number>
): string => {
  const array = ListNodeToArray(ListNode2);

  // 去掉前面补的0
  let number = array.reverse().join("");

  // 全是0，直接返回
  if (+number === 0) return "0";

  let firstNoneZeroIndex = -1;

  for (let i = 0, l = number.length; i < l; i++) {
    if (+number[i] != 0) {
      firstNoneZeroIndex = i;
      break;
    }
  }

  return number.substring(firstNoneZeroIndex);
};

// const test = (number: string) => {
//   // 全是0，直接返回
//   if (+number === 0) return "0";

//   let firstNoneZeroIndex = -1;

//   for (let i = 0, l = number.length; i < l; i++) {
//     if (+number[i] != 0) {
//       firstNoneZeroIndex = i;
//       break;
//     }
//   }

//   return number.substring(firstNoneZeroIndex);
// };

function addNode(node1: ListNode2, node2: ListNode2): ListNode2 {
  let carry = 0;

  let start: ListNode2;
  let current: ListNode2;

  const add = (n1: ListNode2, n2: ListNode2) => {
    let count = (n1?.val || 0) + (n2?.val || 0) + carry;

    if (count >= 10) {
      carry = 1;
      count -= 10;
    } else {
      carry = 0;
    }

    if (!start) {
      start = new ListNode2(count);
      current = start;
    } else {
      const next = new ListNode2(count);
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
    current.next = new ListNode2(1);
  }

  // console.log("result", printListNode2(start));

  return start;
}

function multiply(num1: string, num2: string) {
  const len_1 = num1.length;
  const len_2 = num2.length;

  let count = new ListNode2(0);

  for (let i1 = 0; i1 < len_1; i1++) {
    for (let i2 = 0; i2 < len_2; i2++) {
      const index1 = len_1 - i1 - 1;
      const index2 = len_2 - i2 - 1;

      let countNumber = String(+num2[index2] * +num1[index1]);

      let suffixCount = i1 + i2;

      const current = string2Node(
        countNumber + [...Array(suffixCount)].map(() => "0").join("")
      );

      // // let result =
      // //    * Math.pow(10, i1) * Math.pow(10, i2);

      // const current = string2Node(String(result));

      count = addNode(count, current);

      // console.log(
      //   "i,j",
      //   i1,
      //   i2,
      //   num1[index1],
      //   num2[index2],
      //   +num2[index2] * +num1[index1],
      //   suffixCount,
      //   parseNumberStringFromListNode2(current),
      //   parseNumberStringFromListNode2(count)
      // );
    }
  }

  return parseNumberStringFromListNode2(count);
}

// printResult(multiply, ["2", "3"], "6");
// printResult(multiply, ["123", "456"], "56088");
// printResult(multiply, ["123456789", "987654321"], "121932631112635269");
// printResult(multiply, ["10", "10"], "100");
// printResult(
//   multiply,
//   ["498828660196", "840477629533"],
//   "419254329864656431168468"
// );
