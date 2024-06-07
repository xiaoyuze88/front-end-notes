# 事件系统

v17 开始事件开始不再代理到 document 上，而是代理到 root element 上，好处是当页面上有多个 react 系统或者包含非 react 系统时，彼此直接事件不会冲突，而且还为 concurrent mode 做了支持，当频繁打断和重渲染时，能够更好的控制其中流程

大部分事件都是直接代理到 root 上，除了部分不适合代理的事件（比如无法冒泡的事件，如 focus/blur，或者代理可能导致不正确的行为，如 mouseenter/mouseleave）

## DOM二级事件模型
1. 捕获阶段：先从 window => document => html => body => ... element
2. 冒泡阶段：反过来

一些特殊事件不会冒泡，如：scroll/resize/mouseenter/mouseleave/focus/blue 等，仅支持捕获

* event.stopPropagation 的作用是阻止传播，如果是捕获就禁止向下捕获，冒泡就禁止向上冒泡。
* event.stopImmediatePropagation 的作用是禁用其他绑定在该元素上的同一事件，并且绑定在当前handler之后的 handler 执行
* event.preventDefault 的作用是阻止浏览器的默认行为，如 a+href 的跳转，form+submit 的提交，input+keypress 等

## 合成事件
合成事件构造函数是由事件基类和各种类型的事件Interface合并而成，各Interface中会针对不同特殊事件属性的兼容性做一些抹平动作（normalize）

todo: 
setBatchingImplementation,batching implement?
listenToNonDelegatedEvent?
Discrete event queue?

## 原理

创建 FiberRoot 时，通过 listenToAllSupportedEvents 注册事件到 container 上

listenToAllSupportedEvents：
1. 在 container dom 上打标记，确保事件只注册一次
2. 遍历所有事件，依次 listenToNativeEvent 进行绑定，需要根据事件是否支持冒泡决定是注册冒泡监听还是捕获

listenToNativeEvent：
1. 会在 root dom 上挂一个 Set，用于记录某个事件是否已注册handler
2. 调用 addTrappedEventListener 监听事件

addTrappedEventListener：
1. 核心是 createEventListenerWrapperWithPriority 创建 handler，会根据不同事件优先级来进行不同的包装

特定的事件有自己的固定的优先级，分为：
1. 离散事件 Discrete，优先级最高，如 click，keydown，input等（TODO: 看看batch）
2. userBlock，第二，如 drag,scroll 等，会用 UserBlockingPriority 注册回调来执行
3. continuous 最低，如 animation,load 等，直接执行 dispatch
根据优先级不同，包装上有所不同（TODO）

最终都会调用 dispatchEvent 方法

dispatchEvent => attemptToDispatchEvent

attemptToDispatchEvent: 
1. 根据 nativeEvent 找到触发的 target dom
2. 根据 target dom 找到最近的 fiber
3. 根据找到的fiber，找到最近一个mounted的父fiber，用来判断该fiber是否已经渲染到页面中
4. dispatchEventForPluginEventSystem

dispatchEventForPluginEventSystem，真正分发事件的函数: 
1. 比较触发事件的fiber的container和当前fiber树的container，如果一致则可以出发，如果不一致，则尝试往上找看能不能找到一致的容器。如果找得到则触发事件，反正说明触发事件的元素不在当前fiber树内，不能触发
2. 触发事件，设置上下文为 EventContext，然后调用 dispatchEventsForPlugins

dispatchEventsForPlugins: 
1. 通过 extractEvents 收集事件 listeners
2. processDispatchQueue，根据 bubble/capture 来按指定顺序执行 listener

extractEvents：
1. SimpleEventPlugin.extractEvents 收集事件监听器
2. 根据事件系统 flag 决定是否需要针对一些事件做polyfill

SimpleEventPlugin.extractEvents：
1. 根据事件类型匹配对应合成事件的构造函数
2. accumulateSinglePhaseListeners，收集 listener

accumulateSinglePhaseListeners: 
1. 根据捕获/冒泡，拼出对应的事件监听器属性的名称（e.g: onClick/onClickCapture）
2. 从当前 fiber => root，依次找到对应的 listener
2.1 首先，真正的事件都是绑定在 HostComponent 上的，其他自定义组件的 onClick 都只是一个普通的prop而已，只有 HostComponent 上的 onClick 才会真正注册成事件listener
2.2 然后从对应 HostComponent fiber的 stateNode 找到对应的 dom，并通过 dom[internalPropKey] 找到当前 dom 对应组件的最新的 props，并尝试从中取出对应事件handler名称的属性
2.3 如果能够找到对应的属性，则推入 listeners queue

补充：
为什么这里不直接取 fiber.memorizedProps? 因为我们没办法直接知道当前 fiber 是 workInProgress 还是 current，渲染时我们可以通过比较 currentlyRenderingFiber 来判断，但是事件触发阶段这个属性不可靠，所以我们需要通过 dom[internalPropKey] 来获取它所对应的 react 组件的最新props，在 completeWork 中我们可以确保每次将 HostComponent 渲染后都将最新的 props 挂在 internalPropKey 上

processDispatchQueue：
根据 capture/bubble，以顺序/逆序执行事件回调。