type React_ELEMENT_TYPE = any;

export interface ReactElement {
  // 一个固定的标识，用于区分是否合法的 ReactElement
  $$typeof: React_ELEMENT_TYPE;
  // 直接指向组件本身，如函数组件的函数本身、class组件的构造函数、hostComponent 的话就是字符串
  // Context.Consumer 就是一个对象 { $typeof: REACT_CONTEXT_TYPE, _currentValue: any }
  // Context.Provider: { $typeof: REACT_PROVIDER_TYPE, _context: context, }
  type: any;
  key: string | number;
  ref: any;
  props: any;
}
