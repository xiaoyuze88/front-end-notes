class UnionFind {
  matrix: number[][];
  parent: number[];
  rank: number[];

  constructor(matrix: number[] []) {
    this.matrix = matrix;

    for (let i = 0, l = matrix.length; i < l; i++) {
      this.parent[i] = i;
    }
  }

  find(i: number) {
    let index = i;

    while (index !== this.parent[index]) {
      // 路径压缩，找到parent的parent，将自己挂上去
      this.parent[index] = this.parent[this.parent[index]];
      index = this.parent[index];
    }

    return index;
  }

  union(i: number, j: number) {
    const rootI = this.find(i);
    const rootJ = this.find(j);

    if (rootI === rootJ) return;

    if (this.rank[rootI] > this.rank[rootJ]) {
      this.parent[rootJ] = rootI;
    } else {
      this.parent[rootI] = rootJ;
    }

    const sum = this.rank[rootI] + this.rank[rootJ];

    this.rank[rootI] = this.rank[rootJ] = sum;
  }

  start() {
    let count = this.matrix.length;

    for (let i = 0, l = this.matrix.length; i < l;) {
      for (let j = i + 1; j < l; j++) {
        if (this.matrix[i][j]) {
          this.union(i, j);
          count--;
        }
      }
    }

    // 两种方法得到最终分组数
    // const set = new Set();

    // this.parent.forEach((i) => {
    //   set.add(this.find(i));
    // });

    // return set.size;

    return count;
  }
}