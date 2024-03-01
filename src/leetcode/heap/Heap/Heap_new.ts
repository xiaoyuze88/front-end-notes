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
    data.unshift(undefined);

    this.data = data;

    this.buildHeap();
  }

  // buildMinHeap
  private buildHeap() {
    // // 1. 从前到后，从下到上
    // for (let i = 1, l = this.data.length; i < l; i++) {
    //   this.shiftUp(i);
    // }

    // 2. 从后往前，至上到下
    for (let i = Math.floor(this.size / 2); i >= 1; i--) {
      this.shiftDown(i);
    }

    console.log('this.data', this.data);
  }

  // 往上对比，最小堆，如果父 > 子，则交换，到顶结束
  shiftUp(targetIndex: number) {
    while (targetIndex >= 1) {
      const parentIndex = Math.floor(targetIndex / 2);

      // 最大/小堆只需要处理这个比较函数
      if (this.data[parentIndex] > this.data[targetIndex]) {
        this.swap(parentIndex, targetIndex);
      }

      // 然后继续往上
      targetIndex = parentIndex;
    }
  }

  // 至上到下，最多只需要比较到最后一个非叶子节点，跟左右子节点比，如果子有任一比父小，则交换，然后继续往下，如果无需交换则结束（因为从后往前，能够保证下面的都是按顺序排好的，只有碰到任一节点无需交换了，那就可以结束了）
  shiftDown(targetIndex: number, maxIndex = Math.floor(this.size / 2)) {
    while (targetIndex <= maxIndex) {
      // 跟左右节点比，最小堆，如果父比子大，交换
      const leftNodeIndex = targetIndex * 2;
      const rightNodeIndex = targetIndex * 2 + 1;

      let smallestIndex = targetIndex;

      // 最大/小堆只需要处理这个比较函数
      if (this.data[leftNodeIndex] < this.data[smallestIndex]) smallestIndex = leftNodeIndex;
      if (this.data[rightNodeIndex] < this.data[smallestIndex]) smallestIndex  = rightNodeIndex;

      if (smallestIndex !== targetIndex) {
        this.swap(smallestIndex, targetIndex);
        targetIndex = smallestIndex;
      } else {
        break;
      }
    }
  }

  swap (srcIndex: number, targetIndex: number) {
    const temp = this.data[srcIndex];

    this.data[srcIndex] = this.data[targetIndex];
    this.data[targetIndex] = temp;
  }

  // 删除并返回堆顶元素
  poll(): number {
    // 1. 交换堆顶与队尾，并推出队尾
    // 2. 让此时的堆顶往下shift
    this.swap(1, this.size);

    const peak = this.data.pop();

    this.shiftDown(1);

    return peak;
  }

  // 添加一个元素
  offer(number: number): void {
    // 添加到队尾，然后 shiftUp
    this.data.push(number);
    this.shiftUp(this.data.length - 1);
    console.log('this.data', this.data);
  }

  // 返回堆顶
  peak(): number {
    return this.data[1];
  }

  // 堆排序，依次取出堆顶，最小堆从最小到最大取出，最大堆从最大到最小取出
  sort() {
    const result = [];

    for (let i = 1, l = this.data.length; i < l; i++) {
      result.push(this.poll());
    }

    return result;
  }
}

// new Heap('52341'.split('').map(s => +s));
const heap = new Heap('46859'.split('').map(s => +s));

heap.offer(7)

console.log('heap.sort()', heap.sort());


