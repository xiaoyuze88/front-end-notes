import { Component } from "react";

interface ClassFiber<ClassComponent extends Component> extends BaseFiber {
  stateNode: ClassComponent;
  updateQueue: any;
}
