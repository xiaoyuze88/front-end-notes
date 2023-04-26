// 给你一个字符串 s ，仅反转字符串中的所有元音字母，并返回结果字符串。

// 元音字母包括 'a'、'e'、'i'、'o'、'u'，且可能以大小写两种形式出现不止一次。

//

// 示例 1：

// 输入：s = "hello"
// 输出："holle"
// 示例 2：

// 输入：s = "leetcode"
// 输出："leotcede"
//

// 提示：

// 1 <= s.length <= 3 * 105
// s 由 可打印的 ASCII 字符组成
// 双指针，两头往中间遍历，各自碰到元音字母则交互
// i >= j 退出
function reverseVowels(s) {
  const arr = Array.from(s);
  let i = 0;
  let j = s.length - 1;

  while (i < j) {
    while (i < j && !isVowels(arr[i])) {
      i++;
    }

    while (i < j && !isVowels(arr[j])) {
      j--;
    }

    if (i < j) {
      revert(arr, i, j);
      i++;
      j--;
    }
  }

  return arr.join('');
}

function isVowels(s) {
  return "aeiou".indexOf(s.toLowerCase()) > -1;
}

function revert(arr, i, j) {
  let temp = arr[j];

  arr[j] = arr[i];
  arr[i] = temp;
}

const printResult = (s: string, expected: string) => {
  // console.log("result", str);

  // lengthOfLongestSubstringDP(str);
  // return;

  console.log(s, reverseVowels(s), "expected: ", expected, reverseVowels(s) === expected);
};

printResult("hello", "holle");
// printResult("leetcode", "leotcede");
// printResult("", "");
