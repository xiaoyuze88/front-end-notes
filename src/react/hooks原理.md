# hooks 原理

renderWithHooks 在 beginWork 阶段执行，那里面的 queue 在什么阶段处理的？

设置 nextEffect 指针为 root.finishedWork.firstEffect

mountEffect => fiber.flag => UpdateEffect | PassiveEffect, effect.tag => HookPassive | HookHasEffect
updateEffect => fiber.flag => UpdateEffect | PassiveEffect, effect.tag => HookPassive | 如果 deps 有变化，打上 HookHasEffect，否则只有 HookPassive

mountLayoutEffect => fiber.flag => UpdateEffect, effect.tag => HookLayout | HookHasEffect
updateLayoutEffect => fiber.flag => UpdateEffect, effect.tag => HookLayout | 如果 deps 有变化，打上 HookHasEffect，否则只有 HookLayout

遍历 nextEffect（不改变指针），依次执行 commitBeforeMutationEffects
* commitBeforeMutationEffects => 如果节点有 Passive flag，那么注册一个回调来批量执行 flushPassiveEffects

遍历 nextEffect（不改变指针），依次执行 commitMutationEffects
* commitMutationEffects:

Placement: => commitPlacement
实际执行 insert/append dom 动作（TODO: 不是在complete阶段已经拼好了吗？这里是不是指的是操作塞进容器？）

Update: => commitWork
从 updateQueue 中取出 effect 链，依次执行 HookLayout|HookHasEffect（LayoutEffect） 的 effect 的 destroy 方法

Deletion: => commitDeletion => unmountHostComponents，核心是要执行所有子元素的 effect 的 unmount 回调（从上到下），同时要实际执行 dom 元素移除动作
1. HostComponent/HostText:
如果父容器是一个 HostComponent，那么可以直接将其从dom中移除，估无需再往下遍历去找 HostComponent了，所以这里
执行 commitNestedUnmounts ，依次对自己和所有子组件的执行 commitUnmount，执行完后直接退出循环

2. 其他组件，直接执行 commitUnmount，然后遍历所有子组件，因为如果子组件中含有 HostComponent 的话要走 remove 逻辑

commitUnmount: 
从 updateQueue 中取出 effect 链，依次执行：
1. 对于 HookPassive，推入 pendingPassiveHookEffectUnmount，待后续统一执行
2. 对于其他(LayoutEffect)，当场执行 destroy

遍历 root.firstEffect 链，依次对 flag 为 Update/Callback 的 effect 执行 commitLayoutEffectOnFiber(alias commitLifeCycles)
* commitLayoutEffect 

commitLayoutEffectOnFiber => 

for FunctionComponent: 

1. 执行 commitHookEffectListMount

commitHookEffectListMount
从 fiber.updateQueue 中取出 effect 链，依次执行 HookLayout | HookHasEffect (useLayoutEffect) 的 create 方法，并挂载 destroy 方法

2. 执行 schedulePassiveEffects
从 fiber.updateQueue 取出 effect 链，依次取出 HookPassive | HookHasEffect (useEffect) 的 effect，分别推入 pendingPassiveHookEffectUnmount，以及 pendingPassiveHookEffectMount

执行完后，如果上面遍历过程中有 PassiveEffect，则给 pendingPassiveEffectsLanes、pendingPassiveEffectsRenderPriority 赋值

当一次完整渲染结束后，schedule 注册的回调执行 flushPassiveEffectsImpl

1. 遍历 pendingPassiveHookEffectsUnmount，依次执行 destroy
2. 遍历 pendingPassiveHookEffectsMount，依次执行 create，并挂载 destroy

自此一个完整渲染执行完毕，如果 effect 中又触发了下一次 Update，则继续下一次循环