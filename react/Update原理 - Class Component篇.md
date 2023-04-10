# Update原理

## 可以触发Update的方法及其对应组件类型

* ReactDOM.render -- HostRoot
* this.setState -- ClassComponent
* this.forceUpdate -- ClassComponent
* useState -- FunctionComponent
* useReducer -- FunctionComponent

## ClassComponent 和 HostRoot 公用数据结构和更新策略

```
// create by createUpdate
const update: Update<mixed> = {
  lane,
  tag: UpdateState,
  // ClassComponent => this.setState(payload)
  // HostComponent => ReactDOM.render(payload)
  payload: null,
  // this.setState(callback)
  callback: null,
  // 与其他 Update 行成链表(fiber.updateQueue)
  next: null,
};
```

一个Fiber最多存在两个UpdateQueue
1. current.updateQueue
2. workInProgress.updateQueue

## updateQueue
共有三种类型
1. HostComponent => [propKey1, propValue1, propKey2, propValue2, ...]
2. ClassComponent 和 HostRoot => 
```
// create by initializeUpdateQueue
const queue: UpdateQueue<State> = {
  // current state
  baseState: fiber.memoizedState,
  // firstBaseUpdate/lastBaseUpdate 是本次更新之前就存在的 Update（由于低优先级被跳过了导致）
  // 链表头
  firstBaseUpdate: null,
  // 链表尾
  lastBaseUpdate: null,
  // 触发更新后，产生的 Update 被保存在 shared.pending 中行成单向环状链表
  // 当 Update 计算 state 时这个环会被剪开并连接在 lastBaseUpdate 后
  shared: {
    pending: null,
    lanes: NoLanes,
    hiddenCallbacks: null,
  },
  callbacks: null,
};
```

## pending 详解(连接逻辑在enqueueUpdate)

示例：u1/u2/u3/u4依次插入
单向链表环规则总结：
1. 每次 pending 总是指向最后一个插入的
2. 每次插入后，该插入的 next 指向原来的队头

### u1插入
pending => u1 -> u1

### u2插入
pending => u2 -> u1 -> u2

### u3插入
pending => u3 -> u1 -> u2 -> u3

### u4插入
pending => u4 -> u1 -> u2 -> u3 -> u4

所以，将pending切断插到 lastBaseUpdate 后，即使 把 u4 -> u1 这一段剪掉，然后将 u1 设为 lastBaseUpdate.next (逻辑在processUpdateQueue)

## 示例：

1. 一个 fiber 刚经历了 Commit 阶段，上面有两个低优先级 Update，他们即是下一次更新的 baseUpdate
2. 触发两次 Update，会被挂在 shared.pending 上
3. 更新调度完成后，进入 render 阶段（低优先级可能会被跳过）
4. 遍历 updateQueue 得到最新的 state，生成新的 JSX.Element，通过 diff 算法产生 effectTag，在 commit 阶段展示在页面上
5. 渲染完成后 workInProgress fiber tree 变为 current fiber tree，更新结束

## TODO

type ConcurrentQueue = [fiber1, queue1, update1, lane1]

concurrentQueues = [...ConcurrentQueue1, ...ConcurrentQueue2, ...];

FiberRootNode.current = RootFiber
RootFiber.stateNode = FiberRootNode

## markStarvedLanesAsExpired