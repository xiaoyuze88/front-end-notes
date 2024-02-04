export interface PromiseObj<T> {
  promise: Promise<T>;
  resolve: (value?: T) => any;
  reject: (reason?: any) => any;
}

export function genPromise<T = any>(): PromiseObj<T> {
  let resolve;
  let reject;

  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  return { promise, resolve, reject };
}

interface TrafficControlOptions {
  limitCount?: number; // count
  limitDuration?: number; // ms
}

class TrafficControl {
  options: TrafficControlOptions;
  processingQueue: {
    startTime?: number;
    promiseObj?: PromiseObj<void>;
    fn?: () => Promise<void>;
  }[] = [];

  pendingQueue = [];

  constructor({ limitCount = 20, limitDuration = 1000 }: TrafficControlOptions = {}) {
    Object.assign(this.options, {
      limitCount,
      limitDuration
    });
  }

  polling() {
    if (this.pendingQueue.length) {
      this.tryProcess();

      setTimeout(() => {
        this.polling();
      }, 50);
    }
  }

  // 从后往前找，判断时间间隔1分钟内的请求数有无超出限制
  shouldBlock() {
    const now = Date.now();

    let count = 0;

    for (let i = this.processingQueue.length; i >= 0; i--) {
      if (now - this.processingQueue[i].startTime > this.options.limitDuration) {
        break;
      }

      count++;
    }

    if (count >= this.options.limitCount) {
      return true;
    }

    return false;
  }

  tryProcess() {
    const nextTask = this.pendingQueue[0];

    if (!this.shouldBlock()) {
      this.pendingQueue.shift();

      const processingItem = { startTime: Date.now() };

      this.processingQueue.push(processingItem);

      nextTask.fn().then(
        (resp) => nextTask.promiseObj.resolve(resp),
        (err) => {
          nextTask.promiseObj.reject(err);
        }
      );
    }
  }

  resolve(processingItem) {
    const index = this.processingQueue.findIndex((item) => item === processingItem);

    this.processingQueue.splice(index, 1);

    const nextTask = this.pendingQueue[0];

    if (!this.shouldBlock()) {
      this.pendingQueue.shift();

      this.process(nextTask.fn).then(
        (resp) => nextTask.promiseObj.resolve(resp),
        (err) => nextTask.promiseObj.reject(err)
      );
    }
  }

  async process(fn) {
    const promise = fn();

    const processingItem = { startTime: Date.now() };

    this.processingQueue.push(processingItem);

    try {
      const resp = await promise;

      return resp;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      this.resolve(processingItem);
    }
  }

  async add(fn) {
    // 跟第一个请求的时间比较
    if (this.shouldBlock()) {
      const promiseObj = genPromise();
      this.pendingQueue.push({
        fn,
        promiseObj
      });

      this.polling();

      return promiseObj.promise;
    }

    return this.process(fn);
  }
}

export const requestTrafficControl = new TrafficControl();
