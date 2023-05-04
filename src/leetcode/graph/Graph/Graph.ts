export class Graph {
  // 顶点数，代表顶点为: 0,1,2,3...vertices-1,vertices
  vertices: number;
  edges: number = 0; // 边数
  adjacencyMatrix: number[][]; // 领接矩阵

  static iteratorDfs(array: number[][], cb: (number: number) => void) {
    if (!array.length) return;

    const countList = Array(array.length).fill(false);

    const iterator = (i: number) => {
      countList[i] = true;

      cb(i);

      array[i].forEach((key) => {
        if (!countList[key]) {
          iterator(key);
        }
      });
    };

    iterator(0);
  }

  static iteratorBfs(array: number[][], cb: (number: number) => void) {
    if (!array.length) return;

    const countList = Array(array.length).fill(false);
    const queue = [array[0]];

    countList[0] = true;

    cb(0);

    while (queue.length) {
      const current = queue.shift();

      current.forEach((key) => {
        if (!countList[key]) {
          countList[key] = true;
          cb(key);
          queue.push(array[key]);
        }
      });
    }
  }

  // 5
  constructor(v: number) {
    this.vertices = v;
    this.adjacencyMatrix = [...Array(v)].fill([]);
  }

  addEdge(v: number, w: number) {
    if (v >= this.vertices || w >= this.vertices) {
      throw new Error("Out of range");
    }

    this.adjacencyMatrix[v].push(w);
    this.adjacencyMatrix[w].push(v);
    this.edges++;
  }

  showGraph() {
    for (let i = 0; i < this.vertices; i++) {
      let str = i + "->";
      for (let j = 0; j < this.vertices; j++) {
        if (this.adjacencyMatrix[i][j] !== undefined) {
          str += this.adjacencyMatrix[i][j] + " ";
        }
      }
      console.log(str);
    }
  }
}

export const deepGraph = [
  [0, 1, 3, 4],
  [0, 2],
  [1, 5],
  [0, 4, 6],
  [3, 8],
  [2, 8],
  [3, 7],
  [6, 8],
  [7, 5, 4]
];
