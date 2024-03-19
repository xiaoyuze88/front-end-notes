// 全 O(1) 的数据结构
// 请你设计一个用于存储字符串计数的数据结构，并能够返回计数最小和最大的字符串。

// 实现 AllOne 类：

// AllOne() 初始化数据结构的对象。
// inc(String key) 字符串 key 的计数增加 1 。如果数据结构中尚不存在 key ，那么插入计数为 1 的 key 。
// dec(String key) 字符串 key 的计数减少 1 。如果 key 的计数在减少后为 0 ，那么需要将这个 key 从数据结构中删除。测试用例保证：在减少计数前，key 存在于数据结构中。
// getMaxKey() 返回任意一个计数最大的字符串。如果没有元素存在，返回一个空字符串 "" 。
// getMinKey() 返回任意一个计数最小的字符串。如果没有元素存在，返回一个空字符串 "" 。
// 注意：每个函数都应当满足 O(1) 平均时间复杂度。

// 示例：

// 输入
// ["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]
// [[], ["hello"], ["hello"], [], [], ["leet"], [], []]
// 输出
// [null, null, null, "hello", "hello", null, "hello", "leet"]

// 解释
// AllOne allOne = new AllOne();
// allOne.inc("hello");
// allOne.inc("hello");
// allOne.getMaxKey(); // 返回 "hello"
// allOne.getMinKey(); // 返回 "hello"
// allOne.inc("leet");
// allOne.getMaxKey(); // 返回 "hello"
// allOne.getMinKey(); // 返回 "leet"

// 提示：

// 1 <= key.length <= 10
// key 由小写英文字母组成
// 测试用例保证：在每次调用 dec 时，数据结构中总存在 key
// 最多调用 inc、dec、getMaxKey 和 getMinKey 方法 5 * 104 次

// 同样 count 的字符串全记录在一个节点内，这样相同count的节点就不用多次查找
class OneNode {
  prev: OneNode;
  next: OneNode;

  count = 0;
  set = new Set<string>();

  constructor(count = 0) {
    this.count = count;
  }

  add(key: string) {
    this.set.add(key);
  }

  remove(key: string) {
    this.set.delete(key);
  }
}

class AllOne {
  map = new Map<string, OneNode>();

  // 双向链表，按 count 递减
  head: OneNode;
  tail: OneNode;

  constructor() {
    // dummy
    this.head = new OneNode(Number.MAX_SAFE_INTEGER);
    this.tail = new OneNode(0);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private removeNode(node: OneNode) {
    const prev = node.prev;
    const next = node.next;

    prev.next = next;
    next.prev = prev;
    node.prev = node.next = null;
  }

  private appendTo(src: OneNode, target: OneNode) {
    let prev = target.prev;

    prev.next = src;
    src.prev = prev;
    target.prev = src;
    src.next = target;
  }

  private insertAfter(src: OneNode, target: OneNode) {
    const next = target.next;

    if (next) {
      target.next = src;
      src.prev = target;
      src.next = next;
      next.prev = src;
    } else {
      target.next = src;
      src.prev = target;
    }
  }

  inc(key: string): void {
    let node = this.map.get(key);

    if (!node) {
      const tailPrev = this.tail.prev;

      // 看tail前面的是不是1，不是的话塞一个1
      if (tailPrev.count !== 1) {
        node = new OneNode(1);
        node.add(key);

        this.appendTo(node, this.tail);
        this.map.set(key, node);
      } else {
        // 是的话，往里面加这个key
        tailPrev.add(key);
        this.map.set(key, tailPrev);
      }
    } else {
      // 已经在队内，由于 count 要+1，所以肯定会从原来的节点中脱离
      // node.set.size为0后是否需要删除该节点？是的话会引入额外的复杂度，否的话会浪费空间
      node.remove(key);

      const needRemove = node.set.size === 0;

      const nextCount = node.count + 1;

      let prevNode: OneNode;

      // 找找左边有没有 count === nextCount 的节点，没有则创建一个加到左边去
      if (node.prev.count === nextCount) {
        prevNode = node.prev;
        prevNode.add(key);
      } else {
        prevNode = new OneNode(nextCount);
        prevNode.add(key);
        this.appendTo(prevNode, node);
      }

      this.map.set(key, prevNode);

      if (needRemove) {
        this.removeNode(node);
      }
    }
  }

  dec(key: string): void {
    const node = this.map.get(key);

    if (node) {
      console.log("dec", node);

      node.remove(key);

      const nextCount = node.count - 1;

      // key删光了，直接从node中移除这个key即可
      if (nextCount === 0) {
        this.map.delete(key);
      }
      // 还有，那要将其移到 count=nextCount的节点去
      else {
        // 找找右边有没有count==nextCount的节点，没有的话塞一个在右边
        if (node.next.count !== nextCount) {
          const nextNode = new OneNode(nextCount);
          nextNode.add(key);
          this.insertAfter(nextNode, node);
          this.map.set(key, nextNode);
        }
        // 有的话直接往里塞key
        else {
          node.next.add(key);
          this.map.set(key, node.next);
        }
      }

      // 如果这个节点没装东西了，删掉
      if (node.set.size === 0) {
        this.removeNode(node);
      }
    }
  }

  getMaxKey(): string {
    const largestNode = this.head.next;

    if (largestNode.set.size === 0) return "";

    return Array.from(largestNode.set.values())[0];
  }

  getMinKey(): string {
    const smallestNode = this.tail.prev;

    if (smallestNode.set.size === 0) return "";

    return Array.from(smallestNode.set.values())[0];
  }
}

const allOne = new AllOne();

allOne.inc("hello");
allOne.inc("hello");

// console.log("head", allOne.head, allOne.map);

allOne.inc("leet");

// console.log("head", allOne.head, allOne.tail, allOne.map);

allOne.dec("leet");
// allOne.dec("hello");

console.log("head", allOne.head, allOne.tail, allOne.map);
/**
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */
