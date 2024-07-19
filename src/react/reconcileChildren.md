# reconcileChildren

reconcileChildren 主要是通过 ReactElement(JSX) => workInProgress Fiber
beginWork 主要是比较 current fiber vs workInProgress fiber，无 current 就创建，有 current 就做对比，最后 mark effects

1. 根据有无 currentChild 来决定执行 mountChildFibers/reconcileChildFibers，他们的差异是是否追踪副作用（shouldTrackSideEffects），mount无需track

mountChildFibers/reconcileChildFibers
1. 首先判断是否是无key的Fragment，如果是的话忽略它直接去处理它的children
2. 根据 child 的ReactElement的形式，决定用什么策略处理

一共有四种情况：
1. 标准ReactElement，都为 Object
2. 如果为 string/number，说明是一个 textNode 节点
3. 如果是数组，走 reconcileChildrenArray，会对数组形式的组件有一些性能优化
4. 也支持 iterator function 形式的children，场景较少，可以先忽略

## ReactElement

### 普通的ReactElement，reconcileSingleElement
核心就是比较旧的childFiber和新渲染出来的ReactElement， old fiber vs new ReactElement
有两种策略，分别是针对 Fragment 和其他类型

如果有 currentChild，那么需要先进行比较：

遍历child及其所有 sibling:

首先判断 key 是否一致

Fragment：
它的逻辑比较简单，不需要做什么diff，直接把children透传即可
1. 因为新的Element是进到了 singleElement，说明新的肯定是单元素，所以如果 currentChild 有sibling，可以直接删掉其他的
2. 直接复用 fiber(useFiber) => createWip（有 alternative 就克隆一个干净的fiber，没有就创建一个新的），传入 pendingProps = element.props.children（注意：FragmentFiber 的pendingProps 直接就是 children），然后直接返回

其他类型：
1. 判断类型是否一致（fiber.elementType === element.type），如果一致，同上，删掉所有 currentChild.sibling
2. 类型一致，则直接复用 fiber，pendingProps 更新为 element.props，然后直接返回

如果 key/type 有任一不匹配，直接删掉

区别：如果key一致，类型不一致，执行的是 deleteRemainingChildren，删除所有 child 及对应 sibling；如果key不一致则是直接删除 currentChild 本身
why?
因为这里是 reconcileSingleElement，所以本身children就只应该有一个元素，不应该有 sibling
1. 由于key一致，说明该位置元素还是同一个位置，但是需要重新渲染。此时自身需要删除，且不应该有 sibling，所以执行 deleteRemainingChildren 将自身和 sibling 全部删除，同时break
2. 而 key 不一致时，说明不在同一个位置，可以直接将自身删掉，同时继续遍历 sibling

无法复用，创建新 fiber

### TODO: REACT_PORTAL_TYPE,reconcileSinglePortal

### string/number，reconcileSingleTextNode
1. number统一按string来处理
2. 如果有 currentChild，由于无 key，直接比较 type，如果一致，deleteRemainingChildren(sibling) 删掉其他，然后复用 fiber并返回
3. 如果无法无用，删掉当前 currentChild 并重新创建 fiber from text，其中 pendingProps= textContent

### array，reconcileChildrenArray
1. 第一次遍历，从0开始遍历，尝试查找最长公共前序列
1.1 当 key 一致，认为位置没变，如果type不一致则按新的 type 创建新 fiber，type一致则复用（如果 child 是数组，则包一个 Fragment）。如果 newFiber 为新创建的（无 alternate，还需要标记 oldFiber Deletion）
1.2 若key不一致，直接退出循环
1.3 如果无法复用，且需要 trackSideEffects，则 oldFiber 标记 Deletion
1.4 调用 placeChild，更新 lastPlacedIndex
1.5 更新指针

2. 第一次结束后，如果就链表已经遍历完，说明剩下的 newChildren 都是新的

3. 到这里说明 oldFiber 和 newChildren 都还有剩，先将 oldFiber 映射起来，然后遍历 newChildren，尝试复用
3.1 这里的策略是尽量保持原顺序不变，即后往前移不需要移动，前往后移需要移动

deleteChild：（TODO: 这里并没有实际执行删除动作，只是标记了副作用，具体在哪里执行删除的待确认）
1. 将待删除的 fiber 挂在父节点的 lastEffect 后
2. 清除待删除 fiber 的 nextEffect
3. 标记 fiber flags = Deletion

placeChild:
1. 更新 newFiber.index

## 单节点：
* 比较nextChildren和旧的fiber，如果无旧fiber，则创建一个新Fiber，关联 return,标记 flag=placement
* 如果有旧fiber,比较 key + element.type，都匹配则根据旧 fiber 克隆一个新 fiber，其中 stateNode 复用（class instance or DOM）
* 如果不匹配则标记 flag=DELETE，同时在 return 上记录该动作的 effect（因为不匹配后会重新创建新 fiber，那么此时旧 fiber 将不会再进入 completeWork 中，所以需要在此时提前标记 effect，从而让后续阶段有时机去执行删除动作），标记后将重新创建一个新 fiber
* 因为newChildren是单节点，所以如果oldFiber还有sibling，全部删除

## 多节点：
* 比较 firstChild(fiber) 和 newChildren(ReactElement)
* 第一次循环，找到最长公共前缀（比较 key，不一致不满足公共前缀;一致的话，比较 type，一致返回 useFiber(currentFiber, element.props)，不一致根据 element 创建新 Fiber），如果是新 Fiber，需要给旧 fiber标记 delete
* 如果此时newChildren已经遍历完，且 oldFiber 还没完，则需要删除剩下的 oldFiber
* 如果oldFiber完了，newChildren还有，则剩余全部插入
* 如果newChildren，oldFiber都还有，那么先将 oldFiber 以 key/index 为key映射起来，然后依次尝试从映射中查找可复用的 fiber，如果能复用，则通过 useFiber update 出来，否则 create by element
* 剩下未能复用的old fiber映射，依次删除