// 如果可以使用以下操作从一个字符串得到另一个字符串，则认为两个字符串 接近 ：

// 操作 1：交换任意两个 现有 字符。
// 例如，abcde -> aecdb

// 操作 2：将一个 现有 字符的每次出现转换为另一个 现有 字符，并对另一个字符执行相同的操作。
// 例如，aacabb -> bbcbaa（所有 a 转化为 b ，而所有的 b 转换为 a ）
// 你可以根据需要对任意一个字符串多次使用这两种操作。

// 给你两个字符串，word1 和 word2 。如果 word1 和 word2 接近 ，就返回 true ；否则，返回 false 。

// 示例 1：

// 输入：word1 = "abc", word2 = "bca"
// 输出：true
// 解释：2 次操作从 word1 获得 word2 。
// 执行操作 1："abc" -> "acb"
// 执行操作 1："acb" -> "bca"
// 示例 2：

// 输入：word1 = "a", word2 = "aa"
// 输出：false
// 解释：不管执行多少次操作，都无法从 word1 得到 word2 ，反之亦然。
// 示例 3：

// 输入：word1 = "cabbba", word2 = "abbccc"
// 输出：true
// 解释：3 次操作从 word1 获得 word2 。
// 执行操作 1："cabbba" -> "caabbb"
// 执行操作 2："caabbb" -> "baaccc"
// 执行操作 2："baaccc" -> "abbccc"
// 示例 4：

// 输入：word1 = "cabbba", word2 = "aabbss"
// 输出：false
// 解释：不管执行多少次操作，都无法从 word1 得到 word2 ，反之亦然。
//

// 提示：

// 1 <= word1.length, word2.length <= 10^5
// word1 和 word2 仅包含小写英文字母

// 1. 字符种类完全一样
// 2. 字符的结构完全一样，比如 'aabbcc' vs 'ccaabb'
function closeStrings(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) return false;

  const map1 = {};
  const map2 = {};

  for (let i = 0, l = word1.length; i < l; i++) {
    if (!map1[word1[i]]) map1[word1[i]] = 0;
    if (!map2[word2[i]]) map2[word2[i]] = 0;

    map1[word1[i]]++;
    map2[word2[i]]++;
  }

  const keys1 = Object.keys(map1);
  const keys2 = Object.keys(map2);

  // const count1 = [];
  // const count2 = [];
  const count1Map = {};
  const count2Map = {};

  if (keys1.length !== keys2.length) return false;

  for (let i = 0, l = keys1.length; i < l; i++) {
    if (!(keys1[i] in map2)) return false;
    if (!(keys2[i] in map1)) return false;

    // count1.push(map1[keys1[i]]);
    // count2.push(map2[keys2[i]]);
    if (!count1Map[map1[keys1[i]]]) count1Map[map1[keys1[i]]] = 0;
    if (!count2Map[map2[keys2[i]]]) count2Map[map2[keys2[i]]] = 0;

    count1Map[map1[keys1[i]]]++;
    count2Map[map2[keys2[i]]]++;
  }

  return isEqual(count1Map, count2Map);

  // count1.sort();
  // count2.sort();

  // return count1.every((c1, index) => {
  //   return c1 === count2[index];
  // });
}

function isEqual(obj1, obj2, compareFunc = (a, b) => a === b) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let i = 0, l = keys1.length; i < l; i++) {
    if (!compareFunc(obj1[keys1[i]], obj2[keys1[i]])) return false;
    if (!compareFunc(obj1[keys2[i]], obj2[keys2[i]])) return false;
  }

  return true;
}

console.log(closeStrings("abc", "bca"));
console.log(closeStrings("a", "aa"));
console.log(closeStrings("cabbba", "aabbss"));
