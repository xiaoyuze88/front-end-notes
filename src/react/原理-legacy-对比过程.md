## 对比

## update方式：
1. Class组件调用 setState
2. hooks 调用 dispatchAction
3. container 节点上调用 render

## Class - setState
beginWork 实例化 class 组件后，会调用 adoptClassInstance，将 classComponentUpdater 挂载在实例 instance.updater上，这是一个上下文无关的helper函数，调用 setState 后会调用里面的 enqueueSetState/enqueueReplaceState/enqueueForceUpdate 函数。

里面会创建一个Update对象，enqueueUpdate 到 fiber上，然后调用 scheduleUpdateOnFiber

todo: current.memoizedProps vs workInProgress.pendingProps 怎么生成的？什么时候会变？

## 核心入口 scheduleUpdateOnFiber

调用触发函数后，生成Update对象挂在当前 fiber 上，requestUpdateLane获取当前更新的优先级lane，执行 scheduleUpdateOnFiber

### scheduleUpdateOnFiber

1. markUpdateLaneFromFiberToRoot 

将当前更新的lane merge到当前fiber上，往上遍历父节点直到 HostRootFiber，并依次更新所有父节点（及其alternative）的 childLanes，最后返回 HostRoot

2. ensureRootIsScheduled
跟初次构建不同，初次是调用的 performSyncWorkOnRoot，而更新是走的 ensureRootIsScheduled

每次更新之前,结束任务之前都会调用，每个root只能有一个task同时在执行，如果当前已经有一个task在执行，需要比较他们之间的优先级，如果优先级相同，则不另起一个新task，如果不同，则需要取消旧的（移除root.callbackNode）

ensureRootIsScheduled 会根据下一个优先级去 scheduler 注册一个任务执行 performSyncWorkOnRoot

3. performSyncWorkOnRoot

