# Scheduler

## 时间切片
浏览器一帧中可以执行js的时机：
task（宏任务） -> job（micro task）

## 

两个队列，以 min heap 的数据结构储存
timeQueue - 等待中的队列
taskQueue - 待执行的队列


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
