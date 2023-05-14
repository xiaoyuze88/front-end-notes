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

  static resolve(data): Promise {}

  static reject(error): Promise {}

  static all(promises: Promise[]) {}

  static race(promises: Promise[]) {}

  private isResolved() {}

  constructor(callback: PromiseCallback<T>) {}

  // 异步调用
  then(
    onFulfilled?: (data?: T) => Promise | any,
    onRejected?: (error?: any) => Promise | any
  ): Promise {}

  catch(onRejected?: (error: Error) => Promise | T): Promise {}

  finally(callback: () => Promise | void): Promise {}
}
