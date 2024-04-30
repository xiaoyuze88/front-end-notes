import { Component } from "react";

interface HostComponentFiber extends BaseFiber {
  stateNode: Element;
  // k,v,k,v 形式
  updateQueue: any[];
}

interface TextFiber extends BaseFiber {
  stateNode: Text;
}
