interface JSX {
  type: "string";
  props: {
    children?: string | (string | JSX)[];
    [key: string]: any;
  };
}

interface JsxNode {
  type: string;
  props: Omit<JSX["props"], "children">;
  sibling?: Node;
  next?: Node;
  return?: Node;
  element?: HTMLElement;
}

const jsx = {
  type: "div",
  props: {
    children: [
      "Hello, this is my ",
      {
        type: "a",
        props: {
          children: "Homepage",
          href: "https://baidu.com"
        }
      }
    ]
  }
};

function createNode(jsx: JSX): JsxNode {
  const {
    type,
    props: { children, ...props }
  } = jsx;

  return {
    type,
    props,
    sibling: null,
    next: null,
    return: null,
    element: null
  };
}

function render(jsx: JSX) {
  const node = createNode(jsx);

  
}

function doRender() {
  
}