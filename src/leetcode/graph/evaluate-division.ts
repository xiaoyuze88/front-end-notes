// 给你一个变量对数组 equations 和一个实数值数组 values 作为已知条件，其中 equations[i] = [Ai, Bi] 和 values[i] 共同表示等式 Ai / Bi = values[i] 。每个 Ai 或 Bi 是一个表示单个变量的字符串。

import { printResult } from "../utils";

// 另有一些以数组 queries 表示的问题，其中 queries[j] = [Cj, Dj] 表示第 j 个问题，请你根据已知条件找出 Cj / Dj = ? 的结果作为答案。

// 返回 所有问题的答案 。如果存在某个无法确定的答案，则用 -1.0 替代这个答案。如果问题中出现了给定的已知条件中没有出现的字符串，也需要用 -1.0 替代这个答案。

// 注意：输入总是有效的。你可以假设除法运算中不会出现除数为 0 的情况，且不存在任何矛盾的结果。

//

// 示例 1：

// 输入：equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
// 输出：[6.00000,0.50000,-1.00000,1.00000,-1.00000]
// 解释：
// 条件：a / b = 2.0, b / c = 3.0
// 问题：a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
// 结果：[6.0, 0.5, -1.0, 1.0, -1.0 ]
// 示例 2：

// 输入：equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
// 输出：[3.75000,0.40000,5.00000,0.20000]
// 示例 3：

// 输入：equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
// 输出：[0.50000,2.00000,-1.00000,-1.00000]
//

// 提示：

// 1 <= equations.length <= 20
// equations[i].length == 2
// 1 <= Ai.length, Bi.length <= 5
// values.length == equations.length
// 0.0 < values[i] <= 20.0
// 1 <= queries.length <= 20
// queries[i].length == 2
// 1 <= Cj.length, Dj.length <= 5
// Ai, Bi, Cj, Dj 由小写英文字母与数字组成

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/evaluate-division
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 带权并查集，并不好处理，因为并不是严格单向，可能会有节点有多个parents，增加了额外复杂度
function calcEquation_unionFind(
  equations: string[][],
  values: number[],
  queries: string[][]
): number[] {
  const parents = {};
  const weights = {};

  equations.forEach(([child, parent], index) => {
    // 赋初始值
    if (!parents[child]) parents[child] = child;
    if (!parents[parent]) parents[parent] = parent;

    const rate = values[index];

    parents[child] = parent;
    weights[child] = rate;
  });

  const find = (x: string): { key: string; weight: number } => {
    // 不存在
    if (!parents[x]) {
      return { key: null, weight: -1 };
    }

    if (parents[x] === x) {
      return { key: x, weight: 1 };
    }

    const { key, weight } = find(parents[x]);

    parents[x] = key;
    weights[x] = weights[x] * weight;

    return { key: parents[x], weight: weights[x] };
  };

  // console.log(find("a"));

  // ['a', 'c']
  return queries.map(([child, parent]) => {
    const { key: keyChild, weight } = find(child);
    const { key: keyParent, weight: weightParent } = find(parent);

    if (keyChild !== keyParent || weight === -1 || weightParent === -1) return -1;

    return weight / weightParent;
  });
}

function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  const ratesMap: {
    [start: string]: {
      [end: string]: number; // rate
    };
  } = {};
  const adjacencyMatrix: {
    [key: string]: string[];
  } = {};

  for (let i = 0, l = equations.length; i < l; i++) {
    const [start, end] = equations[i];
    const rate = values[i];

    if (!ratesMap[start]) ratesMap[start] = {};
    if (!ratesMap[end]) ratesMap[end] = {};

    ratesMap[start][end] = rate;
    ratesMap[end][start] = 1 / rate;

    if (!adjacencyMatrix[start]) adjacencyMatrix[start] = [];
    if (!adjacencyMatrix[end]) adjacencyMatrix[end] = [];

    adjacencyMatrix[start].push(end);
    adjacencyMatrix[end].push(start);
  }

  const calcBfs = (start: string, end: string) => {
    if (!adjacencyMatrix[start]?.length || !adjacencyMatrix[end]?.length) return -1;

    const visited = new Set<string>();

    const queue: {
      key: string;
      path: string[];
    }[] = [{ key: start, path: [start] }];

    let donePath = null;

    while (queue.length) {
      const { key, path } = queue.shift();

      if (key === end) {
        donePath = path;
        break;
      }

      visited.add(key);

      const currentEnds = adjacencyMatrix[key];

      currentEnds.forEach((key) => {
        if (!visited.has(key)) {
          queue.push({
            key,
            path: [...path, key]
          });
        }
      });
    }

    if (!donePath) return -1;

    let rate = 1;

    for (let i = 0, l = donePath.length - 1; i < l; i++) {
      rate *= ratesMap[donePath[i]][donePath[i + 1]];
    }

    return rate;
  };

  return queries.map(([start, end]) => {
    return calcBfs(start, end);
  });
}

printResult(
  calcEquation,
  [
    [
      ["a", "b"],
      ["b", "c"]
    ],
    [2.0, 3.0],
    [
      ["a", "c"],
      ["b", "a"],
      ["a", "e"],
      ["a", "a"],
      ["x", "x"]
    ]
  ],
  [6.0, 0.5, -1.0, 1.0, -1.0]
);

printResult(
  calcEquation,
  [
    [
      ["a", "b"],
      ["b", "c"]
    ],
    [2, 3],
    [
      ["a", "c"],
      ["b", "a"],
      ["a", "e"],
      ["a", "a"],
      ["x", "x"]
    ]
  ],
  [6.0, 0.5, -1.0, 1.0, -1.0]
);

printResult(
  calcEquation,
  [
    [
      ["a", "b"],
      ["c", "d"]
    ],
    [1.0, 1.0],
    [
      ["a", "c"],
      ["b", "d"],
      ["b", "a"],
      ["d", "c"]
    ]
  ],
  [-1.0, -1.0, 1.0, 1.0]
);

printResult(
  calcEquation,
  [
    [
      ["x1", "x2"],
      ["x2", "x3"],
      ["x1", "x4"],
      ["x2", "x5"]
    ],
    [3.0, 0.5, 3.4, 5.6],
    [
      ["x2", "x4"],
      ["x1", "x5"],
      ["x1", "x3"],
      ["x5", "x5"],
      ["x5", "x1"],
      ["x3", "x4"],
      ["x4", "x3"],
      ["x6", "x6"],
      ["x0", "x0"]
    ]
  ],
  [1.13333, 16.8, 1.5, 1.0, 0.05952, 2.26667, 0.44118, -1.0, -1.0]
);
