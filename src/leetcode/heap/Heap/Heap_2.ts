/**
 * 堆定义：
 * 1. 完全二叉树
 * 2. 堆高度为 O(logN)，所以入堆，出堆复杂度都为 logN
 * 
 * 建堆复杂度：
 * 1. 依次插入，复杂度 O(nlogN)
 * 2. 列表建堆，复杂度 O(n)
 * 
 * 堆排序复杂度：
 * 建堆 O(n)，从堆中提取最大元素的复杂度为 O(logN)，共 n-1 轮，总复杂度为 O(nLogN)
 */
export class Heap {
  data: number[] = [];

  get size() {
    return this.data.length - 1;
  }

  constructor(
    data: number[] = []
  ) {
    // 构建0，这样的话
    // 1. 父节点可以直接 Math.floor(i/2)
    // 2. 左子节点为 2i, 右节点为 2i + 1
    this.data = [undefined, ...data];

    this.buildHeap();
  }

  // 从前往后，从下到上
  buildHeap() {
    for (let i = 1, l = this.data.length; i < l; i++) {
      this.swiftUp(i);
    }
  }

  swap(p, n) {
    const prev = this.data[p];

    this.data[p] = this.data[n];
    this.data[n] = prev;
  }

  // 只要parent比它大就交换，一直往上比较到顶
  swiftUp(index: number) {
    while (index >= 1) {
      const parentIndex = Math.floor(index / 2);

      if (this.data[parentIndex] > this.data[index]) {
        this.swap(parentIndex, index);
      }

      index = parentIndex;
    }
  }

  // 往下比主要是经历了移动后，此时其余元素都已排好序，所以遇到第一个无需交换的即可结束
  swiftDown(index: number) {
    while (index < this.data.length - 1) {
      const left = index * 2;
      const right = index * 2 + 1;

      

    }
  }
}

// new Heap('52341'.split('').map(s => +s));
const heap = new Heap('46859'.split('').map(s => +s));

heap.offer(7)

console.log('heap.sort()', heap.sort());


