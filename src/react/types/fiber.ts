// interface Fiber {
//   memoizedState
// }

interface BaseFiber {
  tag: FiberTag;
  key: string;

  elementType: any;
  type: any;

  stateNode: any;

  return: Fiber;
  child: Fiber;
  sibling: Fiber;

  ref: unknown;

  index: number;

  pendingProps: any;
  memorizedProps: any;

  updateQueue: any;
  memoizedState: any;

  // 标志当前react是运行在哪种模式，比如 blocking, concurrent. NoMode 代表 legacy 模式
  mode: FiberMode;

  // 实际是二进制相加，通过比对二进制的位来判断
  // 标志当前 fiber 当前有哪些副作用，比如 Placement，Deletion，Passive
  flag: FiberFlag[];
  subtreeFlags: FiberFlag[];

  lanes: Lanes; // 当前fiber 的lanes集合
  childLanes: Lanes; // 所有子元素的 lanes 集合

  nextEffect: Fiber;
  firstEffect: Fiber;
  lastEffect: Fiber;
}

type Fiber = FunctionFiber;
