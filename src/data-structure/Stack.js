// 先入后出
export class Stack<T = number> {
  store: T[] = [];

  get length() {
    return this.store.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  peak() {
    return this.store[this.store.length - 1];
  }

  pop() {
    return this.store.pop();
  }

  push(item: T) {
    this.store.push(item);
  }
}
