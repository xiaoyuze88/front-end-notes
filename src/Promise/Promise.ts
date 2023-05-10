export type PromiseCallback<T = any> = (
  resolve: (data?: T) => void,
  reject: (error?: any) => void
) => void;

export class Promise<T = any> {
  private state: "fulfilled" | "rejected" | "pending" = "pending";
  private data: T;
  private error: Error;
  private thenCallbacks: ((data?: T) => void)[] = [];
  private catchCallbacks: ((error: Error) => void)[] = [];

  static resolve(data): Promise {
    return new Promise((resolve) => resolve(data));
  }

  static reject(error): Promise {
    return new Promise((_, reject) => reject(error));
  }

  private isResolved() {
    return this.state === "fulfilled" || this.state === "rejected";
  }

  constructor(callback: PromiseCallback<T>) {
    const resolve = (data?: T) => {
      if (this.isResolved()) return;

      this.data = data;
      this.state = "fulfilled";
      this.thenCallbacks.forEach((callback) => {
        setTimeout(() => {
          callback(this.data);
        }, 0);
      });
    };

    const reject = (error?: Error) => {
      if (this.isResolved()) return;

      this.error = error;
      this.state = "rejected";
      this.catchCallbacks.forEach((callback) => {
        setTimeout(() => {
          callback(this.error);
        }, 0);
      });
    };

    // 同步调用
    callback(resolve, reject);
  }

  // 异步调用
  then(callback: (data?: T) => Promise | T): Promise {
    let _resolve: Parameters<PromiseCallback>[0];
    let _reject: Parameters<PromiseCallback>[1];

    const cb = (data?: T) => {
      try {
        const response = callback(data);

        if (response instanceof Promise) {
          response.then(_resolve).catch(_reject);
        } else {
          _resolve(response);
        }
      } catch (err) {
        _reject(err);
      }
    };

    switch (this.state) {
      case "pending":
        this.thenCallbacks.push(cb);
        break;
      case "fulfilled":
        setTimeout(() => {
          cb(this.data);
        }, 0);
        break;
    }

    return new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
  }

  catch(callback: (error: Error) => Promise | T): Promise {
    let _resolve: Parameters<PromiseCallback>[0];
    let _reject: Parameters<PromiseCallback>[1];

    const cb = (error) => {
      try {
        const response = callback(error);

        if (response instanceof Promise) {
          response.then(_resolve).catch(_reject);
        } else {
          _resolve(response);
        }
      } catch (err) {
        _reject(err);
      }
    };

    switch (this.state) {
      case "pending":
        this.catchCallbacks.push(cb);
        break;
      case "rejected":
        setTimeout(() => {
          callback(this.error);
        }, 0);
        break;
    }

    return new Promise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
  }

  // finally(callback: () => Proimse | void): Proimse {

  // }
}
