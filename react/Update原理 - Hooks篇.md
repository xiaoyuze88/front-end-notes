# Update原理

## 可以触发Update的方法及其对应组件类型

* ReactDOM.render -- HostRoot
* this.setState -- ClassComponent
* this.forceUpdate -- ClassComponent
* useState -- FunctionComponent
* useReducer -- FunctionComponent
