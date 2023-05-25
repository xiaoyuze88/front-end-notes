// 可以引⼊的库和版本相关请参考 “环境说明”
// 请通过输出方法打印代码运行结果，“运行”后在控制台查看输出信息
// function main（）入口函数请勿修改，以防执行失败

enum CompareResult {
  Unknown = 0,
  Larger = 1,
  Smaller = -1
}

// function sortDependencyTree(tree: Record<string, readonly string[]>): readonly string[] {
//   const result: string[] = [];

//   const dependencyMap: {
//     [key: string]: Set<string>;
//   } = {};
//   const allItems = new Set<string>();

//   Object.keys(tree).forEach((key) => {
//     const dependencies = tree[key];

//     allItems.add(key);

//     dependencies.forEach((deps) => {
//       if (!dependencyMap[deps]) dependencyMap[deps] = new Set<string>();

//       allItems.add(deps);
//       dependencyMap[deps].add(key);
//     });
//   });

//   console.log("tree", tree);
//   console.log("dependencyMap", dependencyMap);
//   // console.log(allItems);

//   const tryCompare = (src: string, target: string): CompareResult => {
//     console.log('try compare', src, target);
//     // 若 src 依赖 target，则认为 src < target
//     if (tree[src]?.includes(target)) {
//       return CompareResult.Smaller;
//     }

//     // 若 src 的被依赖列表中有 target，则认为 src > target
//     if (dependencyMap[src]?.has(target)) {
//       return CompareResult.Larger;
//     }

//     let result: CompareResult;

//     // 如果都没有，那么尝试查看 target 在两个map中有无记录
//     if (tree[target]) {
//       tree[target].some((nextTarget) => {
//         const res = tryCompare(src, nextTarget);

//         if (res === CompareResult.Larger) {
//           result = res;
//           return true;
//         }

//         // if (res !== CompareResult.Unknown) {
//         //   result = res;
//         //   return true;
//         // }

//         return false;
//       });

//       if (result) return result;
//     }

//     if (dependencyMap[target]) {
//       Array.from(dependencyMap[target]).some((nextTarget) => {
//         // 注意顺序
//         const res = tryCompare(src, nextTarget);

//         if (res === CompareResult.Larger) {
//           result = res;
//           return true;
//         }

//         // if (res !== CompareResult.Unknown) {
//         //   result = res;
//         //   return true;
//         // }

//         return false;
//       });

//       if (result) return result;
//     }

//     // 否则大小未知，可以不做替换
//     return CompareResult.Unknown;
//   };

//   return Array.from(allItems).sort((src, target) => {
//     console.log("comparing in sort", src, target);

//     const result = tryCompare(src, target);

//     console.log("compare in sort result", result);

//     return result === CompareResult.Larger ? 1 : -1;
//   });
// }

interface DependencyNode {
  value: string;
  next: DependencyNode[];
  prev: DependencyNode;
  visited: boolean;
}

function createNode(value: string, next: readonly string[] = [], prev?: DependencyNode) {
  return {
    value,
    next: next.map((val) => createNode(val)),
    prev
  };
}

function sortDependencyTree(tree: Record<string, readonly string[]>): readonly string[] {
  let root: DependencyNode;
  const tempList: DependencyNode[] = [];

  const visited = new Set<string>();

  function find(value: string) {
    const queue = [root];

    while (queue.length) {
      const current = queue.shift();

      if (current.value === value) return current;

      if (current.next?.length) {
        current.next.forEach((next) => queue.push(next));
      }
    }

    return null;
  }

  const stack = [];

  const dfs = (value: string, fn: (val: string) => any) => {
    if (tree[value]?.length) {
      tree[value].forEach((val) => {
        if (visited.has(val)) return;

        visited.add(val);
        fn(val);
        dfs(val, fn);
      });
    }
  };

  Object.keys(tree).forEach((key) => {
    if (!root) {
      root = createNode(key);
      visited.add(key);
      stack.push(root);
    }

    

    // while (stack.length) {}
  });
}

function main() {
  const tree = {
    A: ["B"],
    C: ["A", "D"],
    D: ["B"],
    B: ["F"]
  };
  const tree2 = {
    A: ["C", "D"],
    D: ["B"],
    B: ["E"],
    E: ["C", "F"]
  };
  const list = sortDependencyTree(tree);
  console.log("Result is: " + list.join(", "));
}

main();
