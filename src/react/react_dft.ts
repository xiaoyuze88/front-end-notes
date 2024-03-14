class ReactNode {
  name: string = "";
  children: ReactNode[] = [];
  visited = false;

  constructor(name: string, children?: ReactNode[]) {
    this.name = name;
    this.children = children || [];
  }

  addChild(node: ReactNode) {
    this.children.push(node);
  }
}

const react_dfs = (node: ReactNode) => {
  const stack: ReactNode[] = [node];

  while (stack.length) {
    const top = stack[stack.length - 1];

    if (top.visited) {
      const top = stack.pop();
      console.log("back trace", top);
    } else {
      console.log("searching", top);
      top.visited = true;
      if (top.children.length) {
        top.children.forEach((item) => stack.push(item));
      }
    }
  }
};

const genNode = (array: number[]): ReactNode => {
  const strings = array.map((n) => String(n));
  const head = new ReactNode(strings[0]);

  const queue = [head];

  let isLeft = true;

  for (let i = 1, l = array.length; i < l; i++) {
    const first = queue[0];
    const node = new ReactNode(strings[i]);
    first.addChild(node);
    queue.push(node);

    if (isLeft) {
      isLeft = false;
    } else {
      isLeft = true;
      queue.shift();
    }
  }

  return head;
};

// console.log(
//   "genNode([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])",

// );

const node = genNode([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

react_dfs(node);
