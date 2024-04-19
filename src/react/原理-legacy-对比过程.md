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

beginWork
1. 如果 fiber 上的 lanes 不够高，则走 bailout，检查 childLanes 是否需要更新，如果不需要直接开始回溯，如果需要则 clone child fiber，然后继续往下走

* updateClassComponent
创建过程：
1. 实例化 class
2. 处理 updateQueue，拿到最新的 state 挂在 class 实例上，触发生命周期，更新 Flags
更新过程：
1. 触发生命周期
2. 处理 updateQueue，更新 flags，检查是否需要更新（优先检查 shouldComponentUpdate，然后判断是否 pure，如果 pure 则对 props/state 进行浅对比，即是对第一层对象进行===比较，否则都返回 true）

最后都执行 finishClassComponent：
1. 如果前面 shouldUpdate 为 false，直接走 bailout
2. 调用 render，拿到 nextChildren(JSXElement)，然后根据 nextChildren 执行 reconcileChildren
3. reconcileChildren，详见reconcileChildren.md

completeWork
绝大部分类型都不操作，HostComponent的话会diffProperties，然后找出需要施加的属性变更（产物是 updatePayload，是一个数组，两个为一组，key, props），并标记需要执行的动作，同时将对应动作的 effect 挂在父节点上