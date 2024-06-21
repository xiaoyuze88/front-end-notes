# context原理

## 创建 context 

createContext 创建了一个 context 对象，里面通过 _currentValue 维护了当前的 value 值，形如：

```
{
  $typeof: REACT_CONTEXT_TYPE,
  _currentValue: any;
  _currentValue2: any;
  Provider: ReactElement;
  Consumer: ReactElement;
}
```

context.Provider 是一个 ReactElement 对象，context.Provider={ $typeof=REACT_PROVIDER_TYPE, _context=context  }
context.Consumer = context

初次创建：

beginWork:

updateContextProvider:
1. 更新 value 的值
2. 推入堆栈（主要是处理同一个Provider多次使用的问题，每次碰到推入堆栈，completeWork 时推出堆栈，让对应层级能正确消费到对应的Provider）

消费：
三种消费方法：
1. MyContext.Consumer
2. MyClass.contextType = MyContext;
3. useContext

三种方式底层都是同样的消费方法：
1. prepareToReadContext
2. readContext

beginWork 对应fiber前，首先执行 prepareToReadContext：
1. 为当前fiber beginWork 前做好清理工作，包括 currentlyRenderingFiber、lastContextDependency，还有 fiber.dependencies.firstContext
2. 同时判断当前 fiber 上有无 dependencies，如果有的话，判断 dependencies.lanes 和 renderLanes是否有重合，有的话标记当前 wip 的 didReceiveUpdate 为true

然后每次消费 context时，执行 readContext:
1. 构建 contextItem 对象，包含 { context, observedBits, next }
2. 第一个，挂在 fiber.dependencies 上 = { lanes, firstContext: contextItem, responders: null }，是一个链表，同时记录最后一个节点在 lastContextDependency
3. 若已经有，则直接挂在 lastContextDependency.next 上，并更新 lastContextDependency 为最新的
4. 最后返回 context._currentValue


比较复杂的是如何更新 Context

1. 首先，如果 is(oldValue, newValue)，且 old.children === new.children，则直接走 bailoutOnAlreadyFinishedWork（查看 childLanes，如果没有，直接回溯，如果有，则 cloneChildFiber，并直接往下走）
2. 有变化的话，执行 propagateContextChange

propagateContextChange: 
1. 从Provider往下深度优先查找所有子元素，查看其是否挂载 dependencies，然后遍历 dependencies 链，尝试找到当前 Provider 的context
2. 若能够找到，对于 Class Component 需要手动 enqueue 一个 update，因为 class 组件有自己的生命周期和状态管理，所以需要手动触发一个 update，而对于 function component，因为每次都会重新执行render函数，直接更新值即可。
3. 更新目标组件的 lanes，让其有足有的优先级执行更新，同时调用 scheduleWorkOnParentPath，更新所有父节点的 childLanes