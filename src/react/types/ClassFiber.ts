import { Component } from "react";

// ClassComponent 和 HostFiberRoot 都使用这一套结构
interface ClassFiber<ClassComponent extends Component> extends BaseFiber {
  stateNode: ClassComponent;
  updateQueue: ClassUpdateQueue<any>;
  elementType: new (...args: any[]) => ClassComponent;
}

interface ClassUpdateQueue<State> {
  baseState: State;
  firstBaseUpdate: ClassUpdate;
  lastBaseUpdate: ClassUpdate;
  shared: {
    pending: ClassUpdate;
  };
  effects: ClassUpdate[]; // 带有 callback 的 Update 对象列表
}

enum UpdateTag {
  "UpdateState" = 0,
  "ReplaceState" = 1,
  "ForceUpdate" = 2,
  "CaptureUpdate" = 3,
}

interface ClassUpdate<Payload = any> {
  eventTime: number; // 发起update事件的时间(17.0.2中作为临时字段, 即将移出)
  lane: Lane;
  tag: UpdateTag;
  payload: Payload; // 不同类型payload不同
  callback: () => void; // commit 后执行的回调
  next: ClassUpdate;
}
