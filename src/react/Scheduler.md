# Scheduler

## 时间切片
浏览器一帧中可以执行js的时机：
task（宏任务） -> job（micro task）

## 

两个队列，以 min heap 的数据结构储存
timeQueue - 等待中的队列
taskQueue - 待执行的队列

入口函数：
1. runWithPriority => 将当前上下文的优先级设置为指定优先级，然后立刻执行回调
2. scheduleSyncCallback => 将任务推入syncQueue，然后 schedule 一个优先级为 Immediate 的任务，当触发时，依次取出 syncQueue 中的任务，通过 runWithPriority 以 Immediate 优先级来调用
3. scheduleCallback => 计划一个指定优先级的任务

scheduleCallback：
currentTime = getCurrentTime(performance.now / Date.now() - initTime)
startTime = currentTime + delay
timeout = priorityLevel => timeout number
expirationTime = startTime + timeout
task {
  id,
  callback,
  priorityLevel,
  startTime,
  expirationTime,
  sortIndex( timerQueue => startTime, taskQueue => expirationTime )
}
如果是 delay task，推入 timerQueue，如果当前 taskQueue 为空，且 timerQueue 只有这一个任务，则根据 delay 的时长触发一个 requestHostTimeout
如果不是 delay task，推入 taskQueue，若当前无任务在执行（!isHostCallbackScheduled && !isPerformingWork），则触发一个 requestHostCallback
这里的核心就是保证始终有且只有一个 timeout/callback in schedule

advanceTimers：
检查一遍 timerQueue，过期的推入 taskQueue

timeout触发之后会执行 handleTimeout：
1. advanceTimers
2. 如果当前无 callback in schedule，则尝试触发一个 callback
3. 如果taskQueue不为空，触发一个 callback
4. 否则取出下一个 timer,继续触发一个 timeout

scheduleCallback:
通过 MessageChanel 触发一个异步宏任务来执行 performWorkUntilDeadline

performWorkUntilDeadline:
1. 根据 currentTime 和 yieldInterval（默认5，可以通过手动设置帧率来控制） 计算得当前帧能够执行的时长
2. 执行回调（flushWork），如果返回 hasMoreWork，则继续通过 postMessage 触发下一个 performWorkUntilDeadline

flushWork:
1. 如果有正在计划的 timeout，取消掉，同一时间 hostCallback/hostTimeout 只需要触发一个(因为 hostCallback 计划后 handleTimeout 反正也不会执行)
2. 执行 workLoop

workLoop:
1. advanceTimers
2. 依次取出 taskQueue，遍历执行
3. 当堆顶的 task 未过期，或者到达 deadline，退出循环，若此时 taskQueue 仍有任务，返回 hasMoreWork
4. 若 taskQueue 已执行完，且 timerQueue 不为空，则取出第一个 timer 并继续计划 timeout，以保证 timerQueue/taskQueue 仍有任务时能够正确往下执行

root.callbackNode 是什么？

root.callbackNode 只会在 ensureRootIsScheduled 中被挂载，而 ensureRootIsScheduled 会根据 returnNextLanesPriority 优先级异步的触发一次 performSyncWorkOnRoot，以确保 root 上已没有剩余的任务需要执行。

如果下一个任务的优先级是 sync，则会调用 scheduleSyncCallback，否则会调用 scheduleCallback，而他们都会返回一个对象，称之为 callbackNode

scheduleSyncCallback 返回的是一个 fakeCallbackNode，为一个单例的空对象；
而 scheduleCallback 返回的是本次计划的 task 对象；

这个callbackNode并没有其他实际的作用，主要是用来判断当前计划的任务是否可以复用。
若callbackNode存在，且优先级与下一个待执行的优先级相同，那么这个callback所执向的task被执行时，会被赋予当前优先级，且会在 performWorkOnRoot 中挑选对应（与自己）的lanes来处理，所以无需重复再出发一个当前优先级的任务，可以复用。
反而，如果已经有旧任务，且优先级不同，那么需要先取消旧任务（设置task.callback = null）


StatefulHook:

fiber.memorizedState = Hook

Hook {
  memorizedState: State;
  baseState: State;
  baseQueue: HookUpdate;
  queue: {
    pending: HookUpdate;
    dispatch,
    lastRenderedReducer,
    lastRenderedState,
  };
  next: Hook;
}

HookUpdate {
  lane,
  action,
  eagerReducer,
  eagerState,
  next,
}

EffectHook

fiber.memorizedState = Hook
fiber.updateQueue.lastEffect = Effect;

Hook {
  memorizedState: Effect;
}

Effect {
  tag,
  create,
  destroy,
  deps,
  next,
}

MemoHook: 

fiber.memorizedState = Hook

Hook {
  memorizedState: [value, deps];
  next: Hook;
}

CallbackHook: 

fiber.memorizedState = Hook;
Hook {
  memorizedState: [callback, deps];
  next: Hook;
}
