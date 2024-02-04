interface Dependencies {
  [key: string]: string[];
}

// 1. 生成 adj，方向是被依赖项指向原始项，如： A 依赖 B，则 B => A，同时记录所有项的合集
// 2. 遍历所有项，找到没有指向任何节点的项（度为0，说明当前该项没有被任何项依赖），推入队列，同时推入结果数组、并从合集中删除该项
// 3. 迭代队列，从 dependencies 中找到当前项的所有依赖项，根据依赖项依次从 adj 中将指向当前项的边删除，然后执行2。如果执行完2后发现当前adj中没有度为0的项，说明可能依赖中有环，抛出异常
// 4. 队列迭代完，返回结果数组
function sortDependencies(dependencies: Dependencies): string[] {
  // B => A
  const adj: {
    [key: string]: string[];
  } = {};

  const allItems = new Set<string>();

  Object.keys(dependencies).forEach((key) => {
    allItems.add(key);

    const arr = dependencies[key];

    arr.forEach((item) => {
      allItems.add(item);

      if (!adj[item]) adj[item] = [];

      adj[item].push(key);
    });
  });

  const result: string[] = [];
  const queue: string[] = [];

  const findNoneBeDependentOn = () => {
    let found = false;

    for (const key of allItems) {
      // 没有被依赖的项
      if (!adj[key]?.length) {
        found = true;
        // 没被依赖的入栈
        queue.push(key);
        // 同时推入结果
        result.push(key);
        // 推入的删掉，标明该字段已被推入
        allItems.delete(key);
      }
    }

    // 如果某一个round没发现match，说明有循环引用
    if (!found) {
      throw "循环依赖";
    }
  };

  console.log(adj, allItems);

  findNoneBeDependentOn();

  while (queue.length) {
    const current = queue.shift();

    console.log("current", current, queue);

    const arr = dependencies[current];

    if (arr) {
      arr.forEach((key) => {
        // 所有依赖项入度-1
        const index = adj[key].findIndex((k) => k === current);

        adj[key].splice(index, 1);
      });

      findNoneBeDependentOn();

      console.log("adj", adj);
    }
  }

  return [];
}

console.log(
  sortDependencies({
    A: ["B", "C", "E"],
    B: ["C", "D", "A"],
    E: ["F", "C"]
    // D: ["A"]
  })
);
