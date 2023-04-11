# 首屏
ReactDOM.render(<App />) -> fiberRoot -> current -> rootFiber -> alternate -> rootFiber -> child

## mount
workLoop() -> performUnitOfWork(workInProgress) -> beginWork(workInProgress.alternate(只有 fiberRoot 有 alternate，既有 current，没有表示需要 mount), workInProgress)

-> switch (fiber.tag) -> updateComponent(current, workInProgress) -> reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, lanes)

-> mountChildFibers(workInProgress, currentFirstChild(null), newChildren, lanes) -> createChildReconciler(workInProgress, currentFirstChild(null), newChildren, lanes)
 
-> switch (newChild.$$typeof) -> reconcileElement(workInProgress, currentFirstChild(null), newChildren, lanes) -> createFiberFromElement(newChild.props.children, workInProgress.mode, lanes)

-> createFiberFromTypeAndProps(type, key, props, owner, mode, lanes) -> createFiber(fiberTag, props, key, mode) -> child Fiber

=> 回到 reconcileChildren, workInProgress.child = childFiber => 返回 updateComponent，返回 workInProgress.child => 返回 beginWork，返回 updateComponent 的结果，即 workInProgress.child

=> 返回 performUnitOfWork，拿到 beginWork 的结果，并赋值给下一个 next workInProgress