# 本质是比较 JSX.Element 和 current Fiber，生成 workInProgress Fiber

# 优化措施：执行diff比较的三个前置条件
1. 只比较同级元素，如果一个元素跨级了，则不会被复用
2. 只会对比相同类型的元素，如果一个div变成了p，则会销毁div及其所有child，然后重新生成一个p
3. 如果有相同的 key，则会直接复用

节点diff分两大类，单节点（object/number/string）和多节点（array）

# 单节点 diff(reconcileSingleElement)

1. 判断是否存在 child current Fiber，不存在则创建 child Fiber
2. 如果存在，首先比较 key
3. 然后比较 type，相同则返回复用的fiber
4. 不同则删除标记原 fiber 为删除，然后创建新 Fiber

# 多节点diff(reconcileChildrenArray)

比较的case：
1. 属性变化
2. 节点增加/减少
3. 节点位置变化