// Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。

// 请你实现 Trie 类：

// Trie() 初始化前缀树对象。
// void insert(String word) 向前缀树中插入字符串 word 。
// boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
// boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。
//

// 示例：

// 输入
// ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
// [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
// 输出
// [null, null, true, false, true, null, true]

// 解释
// Trie trie = new Trie();
// trie.insert("apple");
// trie.search("apple");   // 返回 True
// trie.search("app");     // 返回 False
// trie.startsWith("app"); // 返回 True
// trie.insert("app");
// trie.search("app");     // 返回 True
//

// 提示：

// 1 <= word.length, prefix.length <= 2000
// word 和 prefix 仅由小写英文字母组成
// insert、search 和 startsWith 调用次数 总计 不超过 3 * 104 次

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/implement-trie-prefix-tree
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// A-Z => 65-90
// const alphabetCharCode_uppercase = [...Array(26)].map((_, index) => 65 + index) as LetterCharLowercase;

type IncrementalRange<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : IncrementalRange<N, [...Acc, Acc["length"]]>;

type IntRange<From extends number, To extends number> = Exclude<
  IncrementalRange<To>,
  IncrementalRange<From>
>;

type LetterCharLowercase = IntRange<97, 122>;

// a-z => 97-122
const alphabetCharCode_lowercase = [...Array(26)].map(
  (_, index) => 97 + index
) as LetterCharLowercase[];

class Trie {
  root = new TrieNode();

  get total() {
    return this.root.prefix;
  }

  insert(word: string): void {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      currentNode = currentNode.append(word[i], i === word.length - 1);
    }
  }

  private searchNode(word: string): TrieNode {
    if (!this.total) return null;

    let currentNode = this.root;
    let i = 0;

    while (currentNode && i < word.length) {
      currentNode = currentNode.find(word[i]);
      i++;
    }

    if (!currentNode) return null;

    return currentNode;
  }

  search(word: string): boolean {
    const lastMatchedNode = this.searchNode(word);

    if (!lastMatchedNode) return false;

    return lastMatchedNode.end > 0;
  }

  startsWith(prefix: string): boolean {
    const lastMatchedNode = this.searchNode(prefix);

    return !!lastMatchedNode;
  }
}

class TrieNode {
  children: Partial<{
    [key: string]: TrieNode;
  }> = {};
  // 以它为前缀的数
  prefix = 0;
  // 以它结尾的数
  end = 0;

  append(char: string, isEnd: boolean): TrieNode {
    // 往后加了一个，所以以它为前缀的+1
    this.prefix++;

    if (!this.children[char]) {
      this.children[char] = new TrieNode();
    }

    const nextNode = this.children[char];

    if (isEnd) {
      // 当前节点是终点，标记end+1
      nextNode.end++;
    }

    return nextNode;
  }

  find(char: string) {
    return this.children[char];
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

const trie = new Trie();

["b", "abc", "abd", "bcd", "abcd", "efg", "hii"].forEach((word) => trie.insert(word));
// ["a", "ab", "abc"].forEach((word) => trie.insert(word));

console.log(trie.search("b"));
console.log(trie.search("bc"));
console.log(trie.search("bcd"));
console.log(trie.search("bcd"));
// debugger;
