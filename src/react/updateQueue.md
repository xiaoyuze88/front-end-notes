# updateQueue

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