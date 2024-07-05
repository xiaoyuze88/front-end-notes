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

type Callback = () => any | Promise<any>;

interface TrafficControlOptions {
  // 限频数量
  frequencyLimit?: number;
  // 限频间隔
  frequencyLimitDuration?: number;
  // 并发数限制
  concurrentLimit?: number;
}

type TrafficControlQueueStatus = 'pending' | 'resolved' | 'processing';

type TrafficControlQueueItem = {
  id: number;
  callback?: Callback;
  promiseObj: PromiseObj<any>;
  // 发起请求的时间，pending 时为 -1
  startTime: number;
  status: TrafficControlQueueStatus;
};

const NoMode = 0x000;
const FrequencyLimit = 0x001;
const ConcurrentLimit = 0x010;

class TrafficControl {
  options: TrafficControlOptions = {
    frequencyLimit: 0,
    frequencyLimitDuration: 0,
    concurrentLimit: 0,
  };

  queue: TrafficControlQueueItem[] = [];
  reqId: 0;
  controlStrategy: 0;

  constructor(options: TrafficControlOptions) {
    Object.assign(this.options, options);

    if (this.options.concurrentLimit > 0) {
      this.controlStrategy |= ConcurrentLimit;
    }

    if (this.options.frequencyLimit > 0 && this.options.frequencyLimitDuration > 0) {
      this.controlStrategy |= FrequencyLimit;
    }
  }

  private isFrequencyLimitMode() {
    return (this.controlStrategy & FrequencyLimit) === FrequencyLimit;
  }

  private isConcurrentLimitMode() {
    return (this.controlStrategy & ConcurrentLimit) === ConcurrentLimit;
  }

  // 考虑两个维度
  // 1. 当前未结束的请求数
  // 2. 第一个请求发起时间到现在的时间间隔
  // 两种实现不同，只考虑并发数的话，并不需要轮询，当达到并发数上限后，只有释放一个才能够执行下一个
  // 而限频不同，需要轮询。需要判断从现在往前到限频时间这段时间内总共发起的请求数是否达到上限，如果是的话才允许发起下一个
  private shouldBlock(): boolean {
    if ((this.controlStrategy & FrequencyLimit) === FrequencyLimit) {

    }

    if ((this.controlStrategy & ConcurrentLimit) === ConcurrentLimit) {

    }

    return false;
  }

  // 拿出下一个任务执行
  private poll() {
    if (this.shouldBlock()) {
      return;
    }

    // 从前往后找
    for (let i = 0, l = this.queue.length; i < l; i++) {

    }
  }

  private getId() {
    return this.reqId++;
  }

  private onFinish(id: number) {

  }

  private startPolling() {
    if (this.isFrequencyLimitMode()) {
      
    }
  }

  private enqueue(fn: Callback) {
    const id = this.getId();
    const promiseObj = genPromise<void>();

    let queueItem: TrafficControlQueueItem;


    if (this.shouldBlock()) {
      queueItem = {
        id,
        startTime: -1,
        status: 'pending',
        callback: fn,
        promiseObj,
      }

      this.startPolling();
    } else {
      queueItem = {
        id,
        startTime: Date.now(),
        status: 'processing',
        promiseObj,
      }

      const promise = fn();

      promise.then((value) => {
        promiseObj.resolve(value);
      }, (err) => {
        promiseObj.reject(err);
      }).finally(() => {
        this.onFinish(id);
      });
    }

    this.queue.push(queueItem);

    return queueItem.promiseObj.promise;
  }

  process(fn: Callback) {
    return this.enqueue(fn);
  }
}

