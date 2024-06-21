import { Component } from "react";

// ClassComponent 和 HostFiberRoot 都使用这一套结构
interface ClassFiber<ClassComponent extends Component> extends BaseFiber {
  stateNode: ClassComponent;
  updateQueue: ClassUpdateQueue<any>;
  elementType: new (...args: any[]) => ClassComponent;
}

interface ClassUpdateQueue<State> {
  baseState: State;
  // baseUpdate是单向链表
  firstBaseUpdate: ClassUpdate<State>;
  lastBaseUpdate: ClassUpdate<State>;
  shared: {
    // 环形链表，指向队尾
    pending: ClassUpdate<State>;
  };
  effects: ClassUpdate<State>[]; // 带有 callback 的 Update 对象列表
}

enum UpdateTag {
  "UpdateState" = 0,
  "ReplaceState" = 1,
  "ForceUpdate" = 2,
  "CaptureUpdate" = 3,
}

interface ClassUpdate<State = any, Payload = any> {
  eventTime: number; // 发起update事件的时间(17.0.2中作为临时字段, 即将移出)
  lane: Lane;
  tag: UpdateTag;
  // 不同类型payload不同
  // RootFiber => { element: ReactNode };
  // ClassComponent => Partial<State> | (prevState: State) => Partial<State>;
  payload: Payload;
  callback: () => void; // commit 后执行的回调
  next: ClassUpdate;
}
