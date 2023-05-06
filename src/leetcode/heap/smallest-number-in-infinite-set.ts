// 现有一个包含所有正整数的集合 [1, 2, 3, 4, 5, ...] 。

// 实现 SmallestInfiniteSet 类：

// SmallestInfiniteSet() 初始化 SmallestInfiniteSet 对象以包含 所有 正整数。
// int popSmallest() 移除 并返回该无限集中的最小整数。
// void addBack(int num) 如果正整数 num 不 存在于无限集中，则将一个 num 添加 到该无限集中。
//

// 示例：

// 输入
// ["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]
// [[], [2], [], [], [], [1], [], [], []]
// 输出
// [null, null, 1, 2, 3, null, 1, 4, 5]

// 解释
// SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
// smallestInfiniteSet.addBack(2);    // 2 已经在集合中，所以不做任何变更。
// smallestInfiniteSet.popSmallest(); // 返回 1 ，因为 1 是最小的整数，并将其从集合中移除。
// smallestInfiniteSet.popSmallest(); // 返回 2 ，并将其从集合中移除。
// smallestInfiniteSet.popSmallest(); // 返回 3 ，并将其从集合中移除。
// smallestInfiniteSet.addBack(1);    // 将 1 添加到该集合中。
// smallestInfiniteSet.popSmallest(); // 返回 1 ，因为 1 在上一步中被添加到集合中，
//                                    // 且 1 是最小的整数，并将其从集合中移除。
// smallestInfiniteSet.popSmallest(); // 返回 4 ，并将其从集合中移除。
// smallestInfiniteSet.popSmallest(); // 返回 5 ，并将其从集合中移除。
//

// 提示：

// 1 <= num <= 1000
// 最多调用 popSmallest 和 addBack 方法 共计 1000 次

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/smallest-number-in-infinite-set
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 小顶堆
/**
class SmallestInfiniteSet {
  numSet = new Set<number>();
  store: number[] = [];

  static buildMinHeap(nums: number[]) {
    for (let i = Math.floor((nums.length - 1) / 2); i >= 1; i--) {
      SmallestInfiniteSet.heapify(nums, nums.length - 1, i);
    }
  }

  static swap(data: number[], sourceIndex: number, targetIndex: number) {
    const temp = data[sourceIndex];
    data[sourceIndex] = data[targetIndex];
    data[targetIndex] = temp;
  }

  // 从下往上
  static heapify(data: number[], size: number, index: number) {
    while (index <= size) {
      const leftIndex = index * 2;
      const rightIndex = index * 2 + 1;

      let nextIndex = index;

      if (leftIndex <= size && data[leftIndex] < data[index]) {
        nextIndex = leftIndex;
      }

      if (rightIndex <= size && data[rightIndex] < data[index]) {
        nextIndex = rightIndex;
      }

      if (nextIndex === index) break;

      SmallestInfiniteSet.swap(data, nextIndex, index);
    }
  }

  get size() {
    return this.store.length - 1;
  }

  constructor(nums: number[] = []) {
    // 构建0
    nums.unshift(undefined);

    this.store = nums;

    for (let i = 1, l = this.size; i <= l; i++) {
      this.numSet.add(this.store[i]);
    }

    SmallestInfiniteSet.buildMinHeap(nums);
  }

  popSmallest(): number {
    // 调换收尾，最后一位即是最小值
    SmallestInfiniteSet.swap(this.store, 1, this.size);

    const smallest = this.store.pop();

    SmallestInfiniteSet.heapify(this.store, this.size, 1);

    this.numSet.delete(smallest);

    return smallest;
  }

  addBack(num: number): void {
    if (this.numSet.has(num)) return;

    // 插到队尾，然后整理一遍
    // this.store.push(num);
    this.store.push(num);
    this.numSet.add(num);

    SmallestInfiniteSet.heapify(this.store, this.size, 1);
  }
}
*/

class SmallestInfiniteSet {
  numSet = new Set<number>();
  store: number[] = [];

  get size() {
    return this.store.length - 1;
  }

  constructor(nums: number[] = [...Array(1000)].map((_, index) => index + 1)) {
    // 构建0
    nums.unshift(undefined);

    this.store = nums;

    for (let i = 1, l = this.size; i <= l; i++) {
      this.numSet.add(this.store[i]);
    }

    this.init();
  }

  // buildMinHeap
  private init() {
    // 从后往前，从上往下
    for (let i = Math.floor(this.size / 2); i >= 1; i--) {
      this.shiftDown(i);
    }
  }

  swap(sourceIndex: number, targetIndex: number) {
    const temp = this.store[sourceIndex];
    this.store[sourceIndex] = this.store[targetIndex];
    this.store[targetIndex] = temp;
  }

  shiftUp(index: number) {
    while (index >= 1) {
      const parentIndex = Math.floor(index / 2);

      if (this.store[parentIndex] > this.store[index]) {
        this.swap(parentIndex, index);
      }

      index = parentIndex;
    }
  }

  shiftDown(index: number, maxIndex: number = this.size) {
    while (index <= maxIndex) {
      const leftIndex = index * 2;
      const rightIndex = index * 2 + 1;

      let nextIndex = index;

      if (leftIndex <= maxIndex && this.store[leftIndex] < this.store[nextIndex]) {
        nextIndex = leftIndex;
      }

      if (rightIndex <= maxIndex && this.store[rightIndex] < this.store[nextIndex]) {
        nextIndex = rightIndex;
      }

      if (nextIndex === index) break;

      this.swap(nextIndex, index);
      index = nextIndex;
    }
  }

  popSmallest(): number {
    // 调换收尾，最后一位即是最小值
    this.swap(1, this.size);

    const smallest = this.store.pop();

    this.numSet.delete(smallest);

    this.shiftDown(1);

    return smallest;
  }

  addBack(num: number): void {
    if (this.numSet.has(num)) return;

    // 插到队尾，然后整理一遍
    this.store.push(num);
    this.numSet.add(num);

    this.shiftUp(this.size);
  }
}

/**
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * var obj = new SmallestInfiniteSet()
 * var param_1 = obj.popSmallest()
 * obj.addBack(num)
 */

const obj = new SmallestInfiniteSet([3, 2, 1, 5, 6, 4]);

// console.log(obj.popSmallest());

// obj.addBack(7);

console.log(obj.popSmallest());
console.log(obj.popSmallest());
console.log(obj.popSmallest());

console.log(obj.store);
obj.addBack(1);
console.log(obj.store);
// obj.popSmallest();
