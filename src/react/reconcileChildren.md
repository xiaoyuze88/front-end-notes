# reconcileChildren

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