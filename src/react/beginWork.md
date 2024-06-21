# beginWork

## IndeterminateComponent 碰到函数时，因为无法确定是函数组件还是 function 形式写的原型链，初始化时都为 IndeterminateComponent
1. 如果 current 不为空，那么可能状态有不一致（因为渲染一次后就能判断类型了），这里需要将它当做 mount 来处理，解除 current/wip 直接联系，并且赋 Placement flag（因为当做 mount 处理）
2. 执行 prepareToReadContext，进行初始化，同时如果有 wip.dependencies 有依赖，检查其 lanes，如果和 renderLanes 有重合，则标记 wip didReceiveUpdate=true
3. 设置 ReactCurrentOwner.current为wip
4. 执行 renderWithHooks（重置 wip hooks 状态，切换 dispatcher，执行函数，判断是否有触发更新，有的话重新清理 hooks 链，递归重新执行函数，直到不再触发更新，最后清理堆栈，并返回新的 reactElement）
5. 判断是否是class组件（react不推荐，忽略，流程与mountClassComponent一致）
6. wip.tag 设置为 FunctionComponent
7. 执行reconcileChildren，根据函数返回的 ReactElement 生成 childFiber

## FunctionComponent
1. 首先判断 wip.elementType 与 wip.type 是否一致，如果一致的话，props 直接取 pendingProps，不一致的话重新调用 resolveDefaultProps，从 Component.defaultProps 取默认值（如果一致的话，defaultProps 已经初始化到 pendingProps 中了，不一致的场景如 memo/forwardRef，需要重新赋默认值， by gpt, TODO: 待确认）
2. 调用 updateFunctionComponent:
2.1 prepareToReadContext
2.2 调用 renderWithHooks（同 IndeterminateComponent.4）
2.3 如果在开发阶段，且为 StrictMode，则会再次调用 renderWithHooks
2.4 如果 didReceiveUpdate 为 false，则调用 bailoutHooks+bailoutOnAlreadyFinishedWork
2.5 否则，标记 PerformedWork，然后调用 reconcileChildren，开始构建 childFibers
2.6 返回 wip.child

bailoutHooks：
1. 直接复制 updateQueue (HookEffect list)到 wip
2. flags 上移除 Passive|UpdateEffect
3. fiber.lanes 上移除 renderLanes

bailoutOnAlreadyFinishedWork:
1. 将 dependencies 复制过来
2. 将 wip.lanes 挂到 wipRootSkippedLanes 上，标记这些lanes曾被跳过（TODO: 标记有啥用？只是某一个 fiber 的这些 lanes 被跳过，不代表所有fiber的这些lanes都需要被跳过吧？具体是干嘛的？）
3. 检查 childLanes，看 childLanes 是否含有当前 renderLanes，如果有的话说明孩子还需要处理，重新克隆一个干净无副作用的fiber，挂回到 wip 上（包括所有sibling），最后返回 wip.child
4. 如果childLanes也无需要处理的lanes了，则直接返回null，无需继续深度优先遍历，直接开始回溯

## ClassComponent
1. 同 FunctionComponent.1，拿到正确的 pendingProps（resolvedProps）
2. 调用 updateClassComponent
2.1 prepareToReadContext
2.2 查看 wip.stateNode 是否有 class 实例，如果没有，实例化 Class 组件
2.3 如果有 实例，但是无 current，执行 resumeMountClassInstance 复用实例
2.4 如果有实例且有 current，执行 updateClassInstance
2.5 更新完 wip 和 instance 后，执行 finishClassComponent，执行 render 和 reconcileChildren，返回 childFiber


### finishClassComponent
1. 如果 shouldUpdate 和 didCapture 都为 false，执行 bailoutOnAlreadyFinishedWork
2. 执行 render，拿到 children，然后执行 reconcileChildren，获取后续的 fiber

### updateClassInstance，在旧 fiber 上更新
跟 resumeMountClassInstance 差不多，但是会多了一些比较
1. 比较 current/wip.updateQueue，如果是同一个对象，说明两次渲染有冲突，以 current 为准，克隆一份 updateQueue 给 wip
2. 获取 resolvedProps，读最新的context，根据 wip.updateQueue 计算最新 state
3. 执行对应声明周期

### 复用 ClassComponent，resumeMountClassInstance：
1. 取 wip 上的memorizedProps最为 oldProps
2. 取 instance.context 为 oldContext，同时根据 ctor.contextType 读出新的 newContext
3. 如果 props 或 context 有变化，触发生命周期 componentWillReceiveProps
4. wip.memorizedState 作为 oldState，更新到 instance.state 上，然后根据 updateQueue 计算出最新的 state
5. 比较 state/props/context，都没变化的，返回 shouldUpdate=false（如果有 componentDidMount，还需要标记 flags|=Update）
6. 根据 shouldUpdate 触发对应声明周期
7. 更新最新的状态

### 实例化 ClassComponent，constructClassInstance：
1. 如果挂有 contextType，执行readContext，构建 contextItem，挂好 dependencies 链，然后返回 currentValue
2. 实例化构造函数，传入 props + context
3. 将新构建出来的实例上的state初始值赋给 wip.memorizedState
4. 执行 adoptClassInstance（挂载 updater，设置 stateNode=instance，关联 instance._reactInternals = Fiber）

#### 执行组件 mount 声明周期，mountClassInstance：
1. 将最新的值同步给实例（props、state=wip.memorizedState，refs）
2. 初始化 updateQueue（每种 fiber 的 updateQueue不一样，这里在第一次构建出将要出发 mount 前初始化 updateQueue）
3. 如果设置 contextType，重新读取 context value，挂载 instance.context
4. 执行 processUpdateQueue，处理更新
5. 如果有设置 getDerivedStateFromProps，在更新完 update 链后执行，执行完后更新最新的 state 到 fiber 和updateQueue上
6. 拿到最新的 state 后，调用 componentWillMount（如果有设置），调用后，重新执行 processUpdateQueue，以防又其他更新在其中被触发
7. 如果有设置 componentDidMount，标记 fiber.flags |= Update，让其在后面的阶段能在正确的时机执行回调


processUpdateQueue：
1. 将 shared.pending 解开，拼到 baseUpdate 链上
2. 遍历 baseUpdate 链，克隆出新的单向链表
2.1 依次判断是否足够优先级执行，不够的原样克隆，同时记录未执行的 lanes
2.2 足够优先级执行的，标记 update.lane 为 NoLane，其他原样克隆，同时执行 getStateFromUpdate，通过 update.payload 和最新的 state 计算出下一个state，同时如果有 callback，标记 fiber.flags |= Callback，同时记录 update 到 updateQueue.effects 上
2.3 每遍历一个 update，就重新检查一遍 shared.pending，以防在 update 过程中又触发了更新，有的话一样拼到 baseUpdate 后
2.4 完成遍历后，得到一个新的 baseUpdate 链，其中足够优先级的lane为NoLane，不够的统一记录到 newLanes 上，同时得到了最新的 state
3. 更新最新的 state 到updateQueue.baseState上，记录被跳过的 lanes（markSkippedUpdateLanes），同时更新剩余 lanes 和 newState 到 fiber 上

QnA：
1. 为什么更新完还要保留 baseUpdate queue？
因为如果还有不够优先级的任务，在下次执行时仍然希望该更新是按照最开始的顺序执行的，否则如果前后有依赖最后的结果会乱
2. TODO: 为什么 componentDidMount 要标记 Update？在后面阶段再判断不行吗？

getStateFromUpdate：
根据 update.tag （replace/capture/update/forceUpdate）来决定拿到payload后如何处理最新state

reconcileChildren:
详见 reconcileChildren.md，核心就是根据 ReactElement 生成/更新对应 fiber

## LazyComponent
1. 同 IndeterminateComponent，如果 current 不为空，当做 mount 处理
2. TODO...

