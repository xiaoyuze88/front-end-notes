// interface Fiber {
//   memoizedState
// }

interface BaseFiber {
  tag: FiberTag;
  key: string;

  // 指向组件的type
  elementType: any;
  // 大部分场景都等于elementType，除了一些特殊场景，比如 hmr 时，会针对一些组件类型做一些特殊处理
  type: any;

  dependencies: any; // 该 fiber 节点所依赖的(contexts, events)等

  stateNode: any;

  return: Fiber;
  child: Fiber;
  sibling: Fiber;

  ref: unknown;

  index: number;

  // Fragment的pendingProps就是children，因为它没其他逻辑了
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

  // 直接记录有副作用的 fiber，需要进行何种操作根据 flags 判断
  nextEffect: Fiber;
  firstEffect: Fiber;
  lastEffect: Fiber;
}

interface FragmentFiber extends BaseFiber {
  // 直接为 children
  pendingProps: JSX.Element | JSX.Element[];
}

interface TextNodeFiber extends BaseFiber {
  // 直接为 textContent
  pendingProps: string;
}

type Fiber = FunctionFiber;

// manualDispatchChangeEvent/act
