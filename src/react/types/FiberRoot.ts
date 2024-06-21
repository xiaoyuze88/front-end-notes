// 整个react应用的根，用来保持一些全局变量、状态
interface FiberRoot {
  // 实际类型为 RootTag 为数字，ReactRootTags.js，根据不同的 ReactDom api 创建应用决定，v17默认是 Legacy
  tag: "Legacy" | "Blocking" | "Concurrent";
  containerInfo: any;

  pendingChildren: any;

  // current HostRootFiber
  current: Fiber;

  finishedWork: Fiber;

  callbackNode: any;
  callbackPriority: any;

  // LaneMap<number>
  eventTimes: number[];
  // LaneMap<number>
  expirationTimes: number[];

  pendingLanes: Lanes;
  suspendedLanes: Lanes;
  expiredLanes: Lanes;
  finishedLanes: Lanes;
}

// 一颗 fiber 树的根，也是一个标准的 Fiber
interface HostRootFiber extends BaseFiber {
  // 根据 tag 决定，整棵树的所有子 fiber 都继承这个 mode
  // tag === ConcurrentRoot 时， mode = ConcurrentMode | BlockingMode | StrictMode
  // tag === BlockingRoot 时，mode = BlockingMode | StrictMode
  // tag === Legacy 时，mode=NoMode
  mode: FiberMode;
}
