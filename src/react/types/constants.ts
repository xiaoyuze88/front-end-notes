// ReactFiberLane.js
// 实际是二进制，未完整
type Lane = "NoLane" | "SyncLane" | "SyncBatchedLane";

// 实际是二进制集合
type Lanes = Lane[];

// ReactTypeOfMode.js
// 实际是二进制
type FiberMode =
  | "NoMode"
  | "Strict"
  | "Blocking"
  | "Concurrent"
  | "Profile"
  | "DebugTracing";

// react-reconciler/src/ReactWorkTags.js
// 实际是数字，这里类型并未填完整
type FiberTag =
  | "function"
  | "class"
  // Indeterminate，function初始化是这个类型，需要实际执行才知道
  | "indeterminate"
  | "hostRoot"
  | "HostPortal"
  | "HostComponent"
  | "HostText"
  | "Fragment"
  | "Mode"
  | "ContextConsumer"
  | "ContextProvider"
  | "ForwardRef";

// 实际是二进制
type FiberFlag =
  | "NoFlag"
  | "PerformedWork"
  | "Placement"
  | "Update"
  | "PlacementAndUpdate"
  | "Deletion"
  | "ContentReset"
  | "Callback"
  | "DidCapture"
  | "Ref"
  | "Snapshot"
  | "Passive";
