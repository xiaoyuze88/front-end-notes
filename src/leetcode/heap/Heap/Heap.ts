export class Heap<T = number> {
  data: T[] = [];
  comparer: (current: T, next: T) => boolean;

  get size() {
    return this.data.length - 1;
  }

  constructor(
    // 以方向为上为基准
    // 最小堆，返回 current < next
    // 最大堆，返回 current > next
    // 默认为最小堆
    comparer: (current: T, next: T) => boolean = (current, next) => current < next,
    data: T[] = []
  ) {
    this.comparer = comparer;

    // 构建0
    data.unshift(undefined);

    this.data = data;

    this.buildHeap();
  }

  // buildMinHeap
  private buildHeap() {
    // 从后往前，从上往下
    for (let i = Math.floor(this.size / 2); i >= 1; i--) {
      this.shiftDown(i);
    }
  }

  private shouldSwap(current: number, next: number, direction: "up" | "down") {
    if (direction === "up") {
      return this.comparer(this.data[current], this.data[next]);
    } else {
      return !this.comparer(this.data[current], this.data[next]);
    }
  }

  swap(sourceIndex: number, targetIndex: number) {
    const temp = this.data[sourceIndex];
    this.data[sourceIndex] = this.data[targetIndex];
    this.data[targetIndex] = temp;
  }

  shiftUp(index: number) {
    while (index >= 1) {
      const parentIndex = Math.floor(index / 2);

      if (this.shouldSwap(index, parentIndex, "up")) {
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

      if (leftIndex <= maxIndex && this.shouldSwap(nextIndex, leftIndex, "down")) {
        nextIndex = leftIndex;
      }

      if (rightIndex <= maxIndex && this.shouldSwap(nextIndex, rightIndex, "down")) {
        nextIndex = rightIndex;
      }

      if (nextIndex === index) break;

      this.swap(nextIndex, index);
      index = nextIndex;
    }
  }

  // 删除并返回堆顶元素
  poll(): T {
    // 调换收尾，最后一位即是最小值
    this.swap(1, this.size);

    const smallest = this.data.pop();

    this.shiftDown(1);

    return smallest;
  }

  // 添加一个元素
  offer(num: T): void {
    // 插到队尾，然后整理一遍
    this.data.push(num);

    this.shiftUp(this.size);
  }

  // 返回当前最小值
  peak(): T {
    return this.data[1];
  }
}
