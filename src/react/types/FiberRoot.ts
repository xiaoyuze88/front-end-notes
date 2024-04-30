interface FiberRoot {
  // 实际类型为 RootTag 为数字，ReactRootTags.js
  tag: "Legacy" | "Blocking" | "Concurrent";
  containerInfo: any;

  pendingChildren: any;

  // current HostRootFiber
  current: Fiber;

  finishedWork: Fiber;

  callbackNode: any;
  callbackPriority: any;
  eventTimes: any;
  expirationTimes: AudioContextLatencyCategory;

  pendingLanes: Lanes;
  suspendedLanes: Lanes;
  expiredLanes: Lanes;
  finishedLanes: Lanes;
}
