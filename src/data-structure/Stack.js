// 先入后出
export class Stack {
  private _counter = 0;
  private _storage = {};

  push(item) {
    this._storage[this._counter] = item;
    this._counter++;
  }

  pop() {
    if (this._counter === 0) return undefined;

    const result = this._storage[this._counter - 1];
    delete this._storage[this._counter - 1];
    this._counter--;

    return result;
  }

  peak() {
    return this._storage[this._counter - 1];
  }

  get length() {
    return this._counter;
  }
}