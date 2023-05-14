export type PromiseCallback<T = any> = (
  resolve: (data?: T) => void,
  reject: (error?: any) => void
) => void;

export class Promise<T = any> {
  private state: "fulfilled" | "rejected" | "pending" = "pending";
  private data: T;
  private error: Error;
  private onFulfilledCallbacks: ((data?: T) => void)[] = [];
  private onRejectedCallbacks: ((error: Error) => void)[] = [];

  static resolve(data): Promise {
    return new Promise((resolve) => resolve(data));
  }

  static reject(error): Promise {
    return new Promise((_, reject) => reject(error));
  }

  static all(promises: Promise[]) {
    return new Promise((resolve, reject) => {
      let fulfilledCount = 0;

      const promiseResults = Array(promises.length).fill(undefined);

      const onFulfilled = (index, data) => {
        fulfilledCount++;
        promiseResults[index] = data;

        if (fulfilledCount === promises.length) {
          resolve(promiseResults);
        }
      };

      const onRejected = (error) => {
        reject(error);
      };

      promises.forEach((promise, index) => {
        promise.then((data) => {
          onFulfilled(index, data);
        }, reject);
      });
    });
  }

  static race(promises: Promise[]) {
    return new Promise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject);
      });
    });
  }

  private isResolved() {
    return this.state === "fulfilled" || this.state === "rejected";
  }

  constructor(callback: PromiseCallback<T>) {
    const resolve = (data?: T) => {
      if (this.isResolved()) return;

      this.data = data;
      this.state = "fulfilled";
      this.onFulfilledCallbacks.forEach((callback) => {
        setTimeout(() => {
          callback(this.data);
        }, 0);
      });
    };

    const reject = (error?: Error) => {
      if (this.isResolved()) return;

      this.error = error;
      this.state = "rejected";
      this.onRejectedCallbacks.forEach((callback) => {
        setTimeout(() => {
          callback(this.error);
        }, 0);
      });
    };

    // 同步调用
    callback(resolve, reject);
  }

  // 异步调用
  then(
    onFulfilled?: (data?: T) => Promise | any,
    onRejected?: (error?: any) => Promise | any
  ): Promise {
    // 透传
    if (typeof onFulfilled !== "function") {
      onFulfilled = (data) => data;
    }

    if (typeof onRejected !== "function") {
      onRejected = (error) => {
        throw error;
      };
    }

    let _resolve: Parameters<PromiseCallback>[0];
    let _reject: Parameters<PromiseCallback>[1];

    const handleFulfilled = (data?: T) => {
      try {
        const response = onFulfilled(data);

        if (response instanceof Promise) {
          response.then(_resolve).catch(_reject);
        } else {
          _resolve(response);
        }
      } catch (err) {
        _reject(err);
      }
    };

    const handleRejection = (error?: any) => {
      try {
        const response = onRejected(error);

        if (response instanceof Promise) {
          response.then(_resolve, _reject);
        } else {
          _resolve(response);
        }
      } catch (err) {
        _reject(err);
      }
    };

    switch (this.state) {
      case "pending":
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejection);
        break;
      case "fulfilled":
        setTimeout(() => {
          handleFulfilled(this.data);
        }, 0);
      case "rejected":
        setTimeout(() => {
          handleRejection(this.error);
        }, 0);
        break;
    }

    return new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
  }

  catch(onRejected?: (error: Error) => Promise | T): Promise {
    return this.then(null, onRejected);
  }

  finally(callback: () => Promise | void): Promise {
    const handler: any = () => callback();

    return this.then(handler, handler);
  }
}
