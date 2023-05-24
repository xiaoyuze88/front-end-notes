interface Dependencies {
  [key: string]: string[];
}

function sortDependencies(dependencies: Dependencies): string[] {
  // B => A
  const adj = {};

  const allItems = new Set<string>();
  const visited = new Set<string>();

  Object.keys(dependencies).forEach((key) => {
    allItems.add(key);

    const arr = dependencies[key];

    arr.forEach((item) => {
      allItems.add(item);

      if (!adj[item]) adj[item] = [];

      adj[item].push(key);
    });
  });

  const length = allItems.size;

  const result = [];
  const queue = [];

  // 先找到没有被依赖的项
  for (const key of allItems) {
    // 没有被依赖的项
    if (!adj[key]) {
      queue.push(key);
      result.push(key);
      allItems.delete(key);
      visited.add(key);
    }
  }

  // 如果都有被依赖，说明有循环引用
  if (!result.length) throw "循环依赖";

  while (queue.length) {
    const current = queue.shift();

    

  }

  console.log(adj, allItems, result);

  return [];
}

console.log(
  sortDependencies({
    A: ["B", "C", "E"],
    B: ["C", "D"],
    E: ["F", "C"]
    // D: ["A"]
  })
);
