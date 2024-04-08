## 构建

reconciler 负责核心协调，具体渲染需要依赖具体renderer的实现。编译阶段是把 reconciler 打进各 renderer 中，renderer 需要实现 reconciler 需要的各种接口

react - api层，暴露如 ReactComponent 基类，hooks api，ReactElement的声明和 createElement api，其中触发更新依赖 renderer 注入的上下文

## 启动过程

调用 ReactDOM.render 后，会初始化三个对象：

1. ReactDomRoot,含有 render/unmount 方法

2. FiberRoot,保持一些全局对象，只有一个

3. HostRootFiber,整个Fiber树的根，可能会有两颗，current & workInProgress

它们三个相互关联：

ReactDomRoot._internalRoot = FiberRoot
FiberRoot.current = HostRootFiber
HostRootFiber.stateNode = FiberRoot
container[InternalKey] = FiberRoot.current = HostRootFiber
container._rateRootContainer = ReactDomRoot

初始化完成后，调用unbatchedUpdates来更新上下文为 Unbatched，然后调用 updateContainer,

updateContainer 应该为全量更新 container 中的节点，里面会获取当前fiber 的lane，获取parentComponent的context，创建 Update对象，然后启动核心逻辑 scheduleUpdateOnFiber。

scheduleUpdateOnFiber是唯一接收更新的函数

1. 首先传入需要执行更新的 Fiber 对象
2. 根据Fiber对象和传入的lane，依次更新当前 Fiber 及其所有父节点、及各父节点的子节点的 lane 为设置的lane，最后Fiber树种一直往上找到 HostRootFiber，再根据 HostRootFiber.stateNode 找到 FiberRoot，并返回
3. 调用核心入口 performSyncWorkOnRoot，传入 FiberRoot

performSyncWorkOnRoot

1. 根据 FiberRoot 获取当前 lane
2. 调用 renderRootSync(核心构建Fiber树的逻辑)

renderRootSync

1. prepareFreshStack 准备一个干净的栈（根据FiberRoot 初始化第一个 workInProgress，即 root.current.alternative）
2. workLoopSync 遍历 workInProgress（dfs+回溯）

workInProgress 中对每个 workInProgress 执行 performUnitOfWork

performUnitOfWork
1. 对每个 workInProgress 执行 beginWork，拿到 workInProgress.child
2. 如果 next 不为空，则继续执行 beginWork，否则 执行 completeWork 回溯
3. 

beginWork
1. 根据ReactElement创建fiber节点，设置好 return/sibling
2. 设置 fiber.flag，标记为增删改状态
3. 设置 fiber.stateNode，如ClassComponent，stateNode=new Class，hostComponent，stateNode=dom

for HostRoot:
1. 计算初始状态，处理 updateQueue 链
2. 调用 reconcileChildren，生成 child 节点的 Fiber 对象，关联好 workInProgress.child和child.return
3. 返回 workInProgress.next

for ClassComponent:
1. 计算初始状态，处理 updateQueue 链
2. 实例化 class 实例，挂在 fiber.stateNode
3. 执行 render 之前的生命周期
4. 调用 render 方法
5. 调用 reconcileChildren
6. 返回 workInProgress.child

for HostComponent:

for FunctionComponent:
1. 执行函数前，先给 ReactCurrentDispatcher.current 赋上下文
2. 执行函数，同一函数中的 hooks 都指向同一个上下文，依次执行hooks，将effect链串起来
3. 获取下级 reactElement

completeWork
1. 大部分tag类型都不处理，碰到hostComponent的话需要实例化dom，并将dom指向 fiber.stateNode，同时将真实子节点的dom节点（fiber树和dom树非一一对应）append 到当前 dom 内
2. 检查当前fiber的flag是否标记为需要操作，NoFlag/PerformedWork 都代表无需操作，大于它即代表这个Fiber需要操作mutation，此时需要将当前 Fiber 挂在 return 节点的 effect 链上，顺序是从下层到上层，这样后续的动作就仅需要遍历这个 effect 链即可知道哪些节点需要执行操作

最终，得到一颗完整的 alternate fiber 树，HostRoot 上挂载了整棵树中所有副作用队列，越下层的副作用越靠前，同时dom树也已拼好

commitRoot
beforeRender:
1. 进行一些渲染前的初始化动作
2. 再次更新副作用队列（主要针对根节点上的副作用）

render：
commitBeforeMutationEffects
处理带有 Snapshot和passive标记的节点

Snapshot：
带有Snapshot标记的只有ClassComponent和HostRoot
1. 其中ClassComponent会调用 getSnapshotBeforeUpdate 生命周期，此时props/state已经更新，但是dom未渲染，会传入 prevProps/prevState，里面可以跟 this.props/this.state 做对比
2. 而HostRoot会调用 clearContainer清空容器节点

Passive：
针对使用了Hooks的函数，会通过scheduler注册一个任务来处理effects（如 useEffect）

2. commitMutationEffects
处理队列中带有 Placement、Update/Deletion等标记的节点
Placement => appendChild/appendBefore(对于mount阶段，其实就是直接将整颗新的dom树渲染到容器内)
Update => commitWork => commitUpdate => update props/attributes to fiber/dom
Deletion => removeChild

执行完dom操作后，切换 hostRoot.current = finishedWork，然后执行 commitLayoutEffects

commitLayoutEffects
碰到带有 Update|Callback flag 的fiber，执行 commitLayoutEffectOnFiber


commitLayoutEffectOnFiber
ClassComponent：
1. 执行 componentDidMount/componentDidUpdate
2. commitUpdateQueue 处理回调，如 this.setState({}, callback)

FunctionComponent:
执行commitHookEffectListMount

commitHookEffectListMount：
执行fiber.updateQueue上的 HookLayout/HookHasEffect，执行初始化回调，拿到 destroy 函数 挂在在 effect.destroy 上

HostRoot：
commitUpdateQueue 处理回调，如 this.setState({}, callback)

HostComponent:
commitMount，设置 focus 等原生状态

到这里，渲染完成，开始执行一些清理工作：
1. 清理副作用队列，断开链表
2. 检查更新
ensureRootIsScheduled，检查常规（异步）任务，有则发起异步调度
flushSyncCallbackQueue，检查同步任务，如果有则主动调用 flushSyncCallbackQueue，无需等待调用，直接再次进入 fiber loop