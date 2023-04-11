// 先入先出
export class Queue<T> {
  _storage: T[] = [];

  // 推入队尾
  enqueue(item: T) {
    this._storage.push(item);
  }

  // 出列
  dequeue() {
    return this._storage.shift();
  }

  //  获取第一个元素
  front() {
    return this._storage[0];
  }

  isEmpty() {
    return this._storage.length === 0;
  }

  size() {
    return this._storage.length;
  }
}

interface PriorityQueueItem <T>{
  value: T;
  priority: number;
}

// 优先队列，每个元素有优先级
export class PriorityQueue <T>{
  _storage: PriorityQueueItem<T>[] = [];

  enqueue(item: PriorityQueueItem<T>) {
    if (this._storage.length === 0) this._storage.push(item);

    let added = false;

    // 已经排好序，直接遍历一次找到比它低的然后插在前面即可
    for (let i = 0, l = this._storage.length; i < l; i++) {
      if (this._storage[i].priority < item.priority) {
        added = true;
        this._storage.splice(i, 0, item);
        break;
      }
    }

    // 找不到比他小的，说明他最小
    if (!added) {
      this._storage.push(item);
    }
  }

  // 出列
  dequeue() {
    return this._storage.shift();
  }

  //  获取第一个元素
  front() {
    return this._storage[0];
  }

  isEmpty() {
    return this._storage.length === 0;
  }

  size() {
    return this._storage.length;
  }
}