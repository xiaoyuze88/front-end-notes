import { PromiseCallback } from "./Promise-template";

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

  static all(promises: Promise[]) {}

  static race(promises: Promise[]) {}

  private isResolved() {
    return this.state === "fulfilled" || this.state === "rejected";
  }

  constructor(callback: PromiseCallback<T>) {
    const onResolved = (data: T) => {
      if (this.isResolved()) return;

      this.state = "fulfilled";
      this.data = data;

      this.onFulfilledCallbacks.forEach((fn) => {
        fn(data);
      });
    };

    const onRejected = (error: any) => {
      if (this.isResolved()) return;

      this.state = 'rejected';
      this.error = error;

      this.onRejectedCallbacks.forEach((fn) => {
        fn(error);
      });
    };

    callback(onResolved, onRejected);
  }

  // 异步调用
  then(
    onFulfilled?: (data?: T) => Promise | any,
    onRejected?: (error?: any) => Promise | any
  ): Promise {
    if (!onFulfilled) {
      onFulfilled = (data?: T) => data;
    }

    if (!onRejected) {
      onRejected = (error?: any) => {
        throw error;
      };
    }

    let _resolve;
    let _reject;

    const handleResolve = (data: T) => {
      try {
        const resp = onFulfilled(data);

        if (resp instanceof Promise) {
          resp.then(_resolve, _reject);
        } else {
          _resolve(resp);
        }
      } catch (err) {
        _reject(err);
      }
    };

    const handleReject = (error: any) => {
      try {
        const resp = onRejected(error);

        if (resp instanceof Promise) {
          resp.then(_resolve, _reject);
        } else {
          _resolve(resp);
        }
      } catch (err) {
        _reject(err);
      }
    };

    if (this.state === "fulfilled") {
      queueMicrotask(() => handleResolve(this.data));
    } else if (this.state === "rejected") {
      queueMicrotask(() => handleReject(this.error));
    } else {
      this.onFulfilledCallbacks.push(handleResolve);
      this.onRejectedCallbacks.push(handleReject);
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
    return this.then(
      () => callback(),
      () => callback()
    );
  }
}
