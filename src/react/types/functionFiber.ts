interface FunctionFiber extends BaseFiber {
  tag: "function";
  memoizedState: Hook;
  updateQueue: {
    // 当有 useEffect/useLayoutEffect 等被动触发的副作用时，会将 HookEffect 链挂在 fiber.updateQueue.lastEffect 上，也是一个环形链
    lastEffect: HookEffect;
  };
}

type Hook = StatefulHook | EffectHook | CallbackHook;

interface BaseHook<State = unknown> {
  memoizedState: State; // 当前的 state
  baseState: State; // 基础状态 TODO: 干嘛的？
  baseQueue: unknown; // 基础状态队列，仅包含当前渲染优先下能够执行的队列
  queue: HookUpdateQueue; // 全量的更新队列，仅状态队列会有
  next: BaseHook; // 下一个hook的指针
}

/**
 * 状态 hook
 */
type StatefulHook<State = unknown> = BaseHook<State>;

interface HookUpdateQueue<State = unknown, Action = unknown> {
  pending: HookUpdate;
  dispatch: (action: Action) => void;
  lastRenderedReducer: Reducer<State, Action>; // 函数当前调用时拿到的最新的 reducer
  lastRenderedState: State; // 上一次渲染结束后的 state 值，这里如果当队列为空（TODO: 通过lane判断，这里还需要挖掘具体原理）时会提前执行一遍 lastRenderedReducer，并通过 Object.is 与 lastRenderedState 比较，如果相同则直接跳过本次 dispatch，不会触发 scheduleUpdateOnFiber
}

interface HookUpdate<State = unknown, Action = unknown> {
  lane: Lane;
  action: Action;
  eagerReducer: Reducer<State, Action>; // 在队列为空时提前通过 lastRenderedReducer 计算过的 reducer，会挂在 eagerReducer 上，否则将为空
  eagerState: State; // 同上，在队列为空时提前通过 lastRenderedReducer 的状态会被挂在 eagerState 上。在更新阶段，如果判断上一次计算过的 eagerReducer 和当前调用的 reducer 相等（===），则会直接取 eagerState 作为 newState，而不用重复计算
  next: HookUpdate;
  priority?: number; // TODO: ?
}

type Reducer<State = unknown, Action = unknown> = (
  state: State,
  action: Action
) => State;

/**
 * 副作用 hook
 *
 * 核心对比逻辑：areHookInputsEqual（useEffect/useCallback/useMemo）
 * 1. 仅 nextDeps 非 null 才会进入比较
 * 2. 当发现 prevDeps 为null，dev阶段会告警
 * 3. 当发现 deps 长度不一致，dev阶段会告警
 * 4. 依次比较 prev vs next，通过 Object.is 对比各依赖
 */
type HookEffectFlag = "NoFlag" | "HasEffect" | "Layout" | "Passive";

// effect hook 的 memoizedState 即是 HookEffect 对象，同时会将 effect 链挂在 fiber.updateQueue 上
type EffectHook = BaseHook<HookEffect>;

interface HookEffect {
  tag: HookEffectFlag[];
  create: () => (() => void) | void;
  destroy: () => void;
  deps: any[];
  next: HookEffect;
}

/**
 * callback hook
 *
 * callback/memo effect都比较简单，mount 时将值挂在 memoizedState 上，update时判断deps是否变化，没变的话直接返回旧值，忽略新值，有变化则更新 state 并返回新值
 *
 */
type CallbackHook<Callback = any, Deps = any[]> = BaseHook<[Callback, Deps]>;

/**
 * memo hook
 */
type MemoHook<Value = any, Deps = any[]> = BaseHook<[Value, Deps]>;
