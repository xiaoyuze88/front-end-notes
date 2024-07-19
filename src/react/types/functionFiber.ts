interface FunctionFiber extends BaseFiber {
  tag: "function";
  memoizedState: Hook;
  updateQueue: {
    // 当有 useEffect/useLayoutEffect 等被动触发的副作用时，会将 HookEffect 链挂在 fiber.updateQueue.lastEffect 上，也是一个环形链
    lastEffect: HookEffect;
  };
  elementType: (props: any) => JSX.Element;
}

type Hook = StatefulHook | EffectHook | CallbackHook | MemoHook;

interface BaseHook<State = unknown> {
  memoizedState: State; // 当前的 state
  next: Hook; // 下一个hook的指针
}

/**
 * 状态 hook
 */
interface StatefulHook<State = unknown> extends BaseHook<State> {
  // @notice 实际上这几个属性是所有hook都有，但是只有 stateful 会用到，为了避免误解这样实现

  // queue 是一个固定的对象，会在该 hook mount 阶段初始化，里面包含着更新队列的维护，dispatcher，还有用于性能优化的 lastRenderedReducer/lastRenderedState
  queue: HookUpdateQueue;

  // 计算 baseQueue 时的基础状态，如果上一次渲染有不够权限执行的任务，那么该 state 为第一个 baseQueue hook 的前一个状态
  // 如果没有不够权限执行的任务，那么 baseState 即上次渲染的结果状态
  baseState: State;
  baseQueue: HookUpdate; // 待处理的任务，指向队尾，环形链表
}

// dispatch 后
// 1. 会创建一个 update 对象，其中 lane 根据当前 fiber 通过 requestUpdateLane 获取，创建后会直接挂在 queue.pending 上
// 2. 然后判断 bind 时 的 fiber 和 currentRenderingFiber 直接的关系来判断当前是否是 渲染中触发的更新，如果是的话，打上标记，然后返回
// 3. 如果不是，判断当前 fiber 及其 alternate 是否为 NoLane，如果是的话表示当前没有别的任务待处理（empty queue），那么可以通过当前 action 和最新的 reducer 计算出 eagerState，对比 lastState 和 eagerState，如果相同，则直接返回，无需触发更新
// 4. 如果上面分支都没触发，最后会触发一次更新 scheduleUpdateOnFiber

// update:
// 当当前组件渲染时，再执行到这个 hook 时，会执行 updateReducer 函数，里面会根据当前已经挂载的 queue.pending 链来下一步的状态：
// 1. 如果 queue.pending 不为空，则将 queue.pending 链整个挂到 hook.baseQueue 上，同时清空 pending
// 2. 执行 baseQueue 处理，依次取出 baseQueue 中的 update，这里分为够权限执行和不够权限执行两种情况
// 2.1 不够权限执行，如果是第一个不够权限的 update，则记录它前一个 state 为新的 baseState(需要保证后续再次执行时仍然能保证状态正确)，将不够权限的update挂在新的 baseQueue 上，最后 markSkippedUpdateLanes
// 2.2 足够权限执行的，如果新的 baseQueue 不为空，则就算够权限也还需继续挂在 baseQueue 后，以后面后续渲染时能复现快照；然后看是否有 eagerReducer，如果和当前 reducer 一致，则可以直接取 eagerState，无需再次计算 reducer，否则计算 reducer。
// 2.3 最后判断新 state 是否有变化，有的话标记 wip received update
// 最后更新hook状态

interface HookUpdateQueue<State = unknown, Action = unknown> {
  // Update循环链在这里，指向最后一个
  pending: HookUpdate;

  // 在 mount 阶段生成的一个固定的 dispatcher，生成时会bind currentRenderingFiber 和 hook.queue 对象
  // 可以通过固定引用的 hook.queue 上获取到最新的 reducer 和 state
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
// render 完后，effect 并不执行执行，而是推入 updateQueue，待 commit 阶段统一执行
type EffectHook = BaseHook<HookEffect>;

// 跟 effect 有关的 flag 有两种，一种会挂上 fiber.flags 上，包含了 UpdateEffect（useEffect/useLayout都会设置，除非 deps 没变化），还有 PassiveEffect，useEffect 特有，effect 会被挂在 updateQueue 上，并在 commit 阶段执行，执行时机有一定区别，会根据挂载的 flags 来执行不同的行为及策略

// 还有一种是挂在 effect.tag 上，包括 HookPassive（标志着是 useEffect）、HookLayout（标志 useLayout）、HookHasEffect（标志着该effect本次有被触发，没有则代表 deps 无变化无需处理）

// TODO: 这里再细看下 commit 阶段

interface HookEffect {
  tag: HookEffectFlag[];
  create: () => (() => void) | void;
  destroy: () => void;
  deps: any[];
  next: HookEffect; // 会用单向链表的形式挂在 fiber.updateQueue 上，并在commit阶段执行
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
