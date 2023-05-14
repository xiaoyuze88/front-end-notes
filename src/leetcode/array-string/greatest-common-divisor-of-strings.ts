// 对于字符串 s 和 t，只有在 s = t + ... + t（t 自身连接 1 次或多次）时，我们才认定 “t 能除尽 s”。

// 给定两个字符串 str1 和 str2 。返回 最长字符串 x，要求满足 x 能除尽 str1 且 X 能除尽 str2 。

//

// 示例 1：

// 输入：str1 = "ABCABC", str2 = "ABC"
// 输出："ABC"
// 示例 2：

// 输入：str1 = "ABABAB", str2 = "ABAB"
// 输出："AB"
// 示例 3：

// 输入：str1 = "LEET", str2 = "CODE"
// 输出：""
//

// 提示：

// 1 <= str1.length, str2.length <= 1000
// str1 和 str2 由大写英文字母组成

// 重点是gcd算法，算出gcd后可直接判断
// function gcdOfStrings(str1: string, str2: string): string {
//   function isMatch(str: string, substring: string): boolean {
//     const len = str.length / substring.length;

//     return (
//       str ===
//       [...Array(len)].reduce((prev) => {
//         return prev + substring;
//       }, "")
//     );
//   }

//   function gcd(a: number, b: number) {
//     let bigger = Math.max(a, b);
//     let smaller = Math.min(a, b);

//     let temp: number;

//     while (smaller !== 0) {
//       temp = bigger;
//       bigger = smaller;
//       smaller = temp % smaller;
//     }

//     return bigger;
//   }

//   const len = gcd(str1.length, str2.length);

//   const result = str1.substring(0, len);

//   return isMatch(str1, result) && isMatch(str2, result) ? result : "";
// }

// function gcdOfStrings(str1: string, str2: string): string {}

function gcd(a: number, b: number) {
  const bigger = Math.max(a, b);
  const smaller = Math.min(a, b);

  if (smaller === 0) return bigger;

  return gcd(smaller, bigger % smaller);
}

console.log(gcd(27, 9));
console.log(gcd(32, 8));
// console.log(gcdOfStrings("ABAB", "AB"));
