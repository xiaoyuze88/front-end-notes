// import * as readline from 'readline';
// let rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout
// });
// rl.on('line',function(data){
//  console.log(data);
// })
console.log("Hello World!");
// .wxml

const jsx: Node = {
  type: "div",
  props: {
    id: "container",
    children: [
      "Hello,",
      {
        type: "a",
        props: {
          href: "xx.baidu.com",
          children: ["Word"]
        }
      }
    ]
  }
};

interface Node {
  type: string;
  props: {
    children: (Node | string)[];
    [key: string]: any;
  };
}

function render(node: Node): HTMLElement {
  if (!node) return null;

  const {
    type,
    props: { children, ...props }
  } = node;

  let element: HTMLElement;

  if (typeof type === "string") {
    element = document.createElement(type);

    Object.keys(props).forEach((key) => {
      const value = props[key];

      switch (key) {
        case "a":
        case "href":
        default:
          element.setAttribute(key, value);
          break;
      }
    });

    if (children.length) {
      children.forEach((childNode) => {
        if (typeof childNode === "string") {
          element.innerHTML += childNode;
        } else {
          const childElement = render(childNode);

          element.appendChild(childElement);
        }
      });
    }
  }

  return element;
}

console.log(render(jsx));
