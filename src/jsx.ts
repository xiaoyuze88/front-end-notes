type JSXChild = string | JSX;

interface JSX {
  type: "string";
  props: {
    children?: JSXChild | JSXChild[];
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
      [
        {
          type: "span",
          props: {
            children: "1"
          }
        },
        {
          type: "span",
          props: {
            children: "2"
          }
        }
      ],
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

function createElement(jsx: JSX): HTMLElement {
  const element = document.createElement(jsx.type);

  const { children, ...props } = jsx.props || {};

  Object.keys(props).forEach((key) => {
    const value = props[key];

    element.setAttribute(key, value);
  });

  return element;
}

function render(jsx: JSX): HTMLElement {
  // const node = createNode(jsx);

  const root = createElement(jsx);

  


  return root;
}

function dfs() {

}

function backtrace() {

}

