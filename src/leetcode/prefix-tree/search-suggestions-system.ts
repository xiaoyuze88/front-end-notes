import isEqual from "lodash.isequal";
import { printResult } from "../utils";

// 给你一个产品数组 products 和一个字符串 searchWord ，products  数组中每个产品都是一个字符串。

// 请你设计一个推荐系统，在依次输入单词 searchWord 的每一个字母后，推荐 products 数组中前缀与 searchWord 相同的最多三个产品。如果前缀相同的可推荐产品超过三个，请按字典序返回最小的三个。

// 请你以二维列表的形式，返回在输入 searchWord 每个字母后相应的推荐产品的列表。

//

// 示例 1：

// 输入：products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
// 输出：[
// ["mobile","moneypot","monitor"],
// ["mobile","moneypot","monitor"],
// ["mouse","mousepad"],
// ["mouse","mousepad"],
// ["mouse","mousepad"]
// ]
// 解释：按字典序排序后的产品列表是 ["mobile","moneypot","monitor","mouse","mousepad"]
// 输入 m 和 mo，由于所有产品的前缀都相同，所以系统返回字典序最小的三个产品 ["mobile","moneypot","monitor"]
// 输入 mou， mous 和 mouse 后系统都返回 ["mouse","mousepad"]
// 示例 2：

// 输入：products = ["havana"], searchWord = "havana"
// 输出：[["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
// 示例 3：

// 输入：products = ["bags","baggage","banner","box","cloths"], searchWord = "bags"
// 输出：[["baggage","bags","banner"],["baggage","bags","banner"],["baggage","bags"],["bags"]]
// 示例 4：

// 输入：products = ["havana"], searchWord = "tatiana"
// 输出：[[],[],[],[],[],[],[]]
//

// 提示：

// 1 <= products.length <= 1000
// 1 <= Σ products[i].length <= 2 * 10^4
// products[i] 中所有的字符都是小写英文字母。
// 1 <= searchWord.length <= 1000
// searchWord 中所有字符都是小写英文字母。

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/search-suggestions-system
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function suggestedProducts(products: string[], searchWord: string): string[][] {
  const root = new TrieRoot();

  const result: string[][] = [];

  products.forEach((product) => root.insert(product));

  for (let i = 1, l = searchWord.length; i <= l; i++) {
    const heap = new AlphabetOrderHeap();

    const prefix = searchWord.slice(0, i);

    root.searchPrefix(prefix, (word) => {
      heap.offer(word);
    });

    result.push(heap.findTop(3));
  }

  return result;
}

class TrieRoot {
  count = 0;
  root = new TrieNode();

  insert(word: string) {
    let currentNode = this.root;
    let i = 0;
    this.count++;

    while (currentNode && i < word.length) {
      currentNode = currentNode.append(word.charAt(i), i === word.length - 1);
      i++;
    }
  }

  searchNode(word: string): TrieNode | null {
    if (!this.count) return null;

    let currentNode = this.root;
    let i = 0;

    while (currentNode && i < word.length) {
      currentNode = currentNode.find(word.charAt(i));
      i++;
    }

    return currentNode;
  }

  searchPrefix(prefix: string, onSearch?: (word: string) => void): string[] {
    const destinationNode = this.searchNode(prefix);

    const results: Set<string> = new Set<string>();

    const iterator = (
      node: TrieNode,
      result: string,
      results: Set<string>,
      onSearch?: (word: string) => void
    ) => {
      // 以我结尾的，可以推入结果
      if (node.end > 0) {
        results.add(result);
        if (typeof onSearch === "function") {
          onSearch(result);
        }
      }

      if (node.prefix > 0) {
        Object.keys(node.children).forEach((char) => {
          const childNode = node.children[char];

          iterator(childNode, result + char, results, onSearch);
        });
      }
    };

    if (destinationNode) {
      iterator(destinationNode, prefix, results, onSearch);
    }

    return Array.from(results);
  }
}

class TrieNode {
  prefix = 0;
  end = 0;
  children: {
    [key: string]: TrieNode;
  } = {};

  append(char: string, isEnd?: boolean) {
    if (!this.children[char]) this.children[char] = new TrieNode();

    this.prefix++;

    const childNode = this.children[char];

    if (isEnd) {
      childNode.end++;
    }

    return childNode;
  }

  find(char: string) {
    return this.children[char];
  }
}

class Heap<T = number> {
  data: T[] = [];
  compareFn: (a: T, b: T, direction: "up" | "down") => boolean;

  get size() {
    return this.data.length - 1;
  }

  constructor({
    data = [],
    compareFn
  }: {
    data?: T[];
    // 根据方向，返回是否需要交换 current 和 target
    // 比如最小堆，方向朝上，说明 target 是 current 的 parent，那么若 current > target 应该返回 false, 不需要交换; 方向朝下，若 current > target，那么应该返回 true，需要交换
    compareFn: (current: T, target: T, direction: "up" | "down") => boolean;
  }) {
    data = [...data];

    if (data.length === 0 || typeof data[0] !== "undefined") {
      data.unshift(undefined as any);
    }

    this.data = data;
    this.compareFn = compareFn;

    this.buildHeap();
  }

  private buildHeap() {
    // 后往前,上往下
    for (let i = Math.floor(this.size / 2); i >= 1; i--) {
      this.shiftDown(i);
    }
  }

  private swap(current: number, target: number) {
    const temp = this.data[target];
    this.data[target] = this.data[current];
    this.data[current] = temp;
  }

  private shiftUp(index: number) {
    while (index >= 1) {
      const parentIndex = Math.floor(index / 2);

      if (parentIndex >= 1 && this.compareFn(this.data[index], this.data[parentIndex], "up")) {
        this.swap(index, parentIndex);
      }

      index = parentIndex;
    }
  }

  private shiftDown(index: number, maxSize: number = this.size) {
    while (index <= maxSize) {
      const leftIndex = index * 2;
      const rightIndex = index * 2 + 1;

      let nextIndex = index;

      if (
        leftIndex <= maxSize &&
        this.compareFn(this.data[nextIndex], this.data[leftIndex], "down")
      ) {
        nextIndex = leftIndex;
      }

      if (
        rightIndex <= maxSize &&
        this.compareFn(this.data[nextIndex], this.data[rightIndex], "down")
      ) {
        nextIndex = rightIndex;
      }

      if (nextIndex === index) break;

      this.swap(index, nextIndex);
      index = nextIndex;
    }
  }

  public offer(data: T) {
    this.data.push(data);

    this.shiftUp(this.size);
  }

  public peak(): T {
    return this.data[1];
  }

  // 删除并返回堆顶
  public poll(): T | undefined {
    if (!this.size) return;

    this.swap(1, this.size);

    const top = this.data.pop();

    this.shiftDown(1);

    return top;
  }

  // 找出堆顶的若干个元素（最大堆：最大的n个元素，最小堆，最小的n个元素）
  public findTop(n: number) {
    const results: T[] = [];

    for (let i = 1; i <= n; i++) {
      const top = this.poll();

      if (!top) break;

      results.push(top);
    }

    // 塞回去
    results.forEach((item) => {
      this.offer(item);
    });

    return results;
  }
}

// 返回 s <= p
function compareByAlphabet(s: string, p: string) {
  const minLen = Math.min(s.length, p.length);

  let charCodeS: number;
  let charCodeP: number;

  for (let i = 0, l = minLen; i < l; i++) {
    charCodeS = s.charCodeAt(i);
    charCodeP = p.charCodeAt(i);

    if (charCodeS > charCodeP) {
      return false;
    } else if (charCodeS < charCodeP) {
      return true;
    }
  }

  // 到这里说明前面都相等，如果 s.length > p.length，那么返回 false, p 更小
  if (s.length > p.length) return false;

  return true;
}

class AlphabetOrderHeap extends Heap<string> {
  constructor(data?: string[]) {
    super({
      data,
      compareFn: (current, target, direction) => {
        // current <= target ? true : false
        const isSmaller = compareByAlphabet(current, target);

        // 朝上，current <= target 不符合预期，需要调整
        return direction === "up" ? isSmaller : !isSmaller;
      }
    });
  }
}

const arr = ["mobile", "mouse", "moneypot", "monitor", "mousepad"];

const heap = new Heap({
  data: arr,
  compareFn(current, target, direction) {
    // current <= target ? true : false
    const isSmaller = compareByAlphabet(current, target);

    // 朝上，current <= target 不符合预期，需要调整
    return direction === "up" ? isSmaller : !isSmaller;
  }
});

// console.log(heap.poll());
// console.log(heap.poll());
// console.log(heap.poll());
// console.log(heap);

// // console.log(compareByAlphabet("mouse", "mou"));

// console.log(
//   [...arr].sort()
//   // [...arr].sort((a, b) => (compareByAlphabet(a, b) ? -1 : 1))
// );

printResult(
  suggestedProducts,
  [["mobile", "mouse", "moneypot", "monitor", "mousepad"], "mouse"],
  [
    ["mobile", "moneypot", "monitor"],
    ["mobile", "moneypot", "monitor"],
    ["mouse", "mousepad"],
    ["mouse", "mousepad"],
    ["mouse", "mousepad"]
  ]
);
