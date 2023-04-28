// 给你一个下标从 0 开始、大小为 n x n 的整数矩阵 grid ，返回满足 Ri 行和 Cj 列相等的行列对 (Ri, Cj) 的数目。

// 如果行和列以相同的顺序包含相同的元素（即相等的数组），则认为二者是相等的。

//

// 示例 1：

// 输入：grid = [[3,2,1],[1,7,6],[2,7,7]]
// 输出：1
// 解释：存在一对相等行列对：
// - (第 2 行，第 1 列)：[2,7,7]
// 示例 2：

// 输入：grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
// 输出：3
// 解释：存在三对相等行列对：
// - (第 0 行，第 0 列)：[3,1,2,2]
// - (第 2 行, 第 2 列)：[2,4,2,2]
// - (第 3 行, 第 2 列)：[2,4,2,2]
//

// 提示：

// n == grid.length == grid[i].length
// 1 <= n <= 200
// 1 <= grid[i][j] <= 105

// 链接：https://leetcode.cn/problems/equal-row-and-column-pairs
function equalPairs(grid: number[][]): number {
  const mapColumn = {};
  const mapRow = {};

  const n = grid.length;

  for (let i = 0, l = n; i < l; i++) {
    let keyColumnArr = [];
    let keyRowArr = [];

    for (let j = 0, l_j = n; j < l_j; j++) {
      keyColumnArr.push(grid[j][i]);
      keyRowArr.push(grid[i][j]);
    }

    const keyColumn = keyColumnArr.join("|");
    const keyRow = keyRowArr.join("|");

    if (!mapColumn[keyColumn]) mapColumn[keyColumn] = 0;
    if (!mapRow[keyRow]) mapRow[keyRow] = 0;

    mapColumn[keyColumn]++;
    mapRow[keyRow]++;
  }

  let count = 0;

  Object.keys(mapColumn).forEach((key) => {
    if (mapRow[key] > 0 && mapColumn[key] > 0) {
      count += mapColumn[key] * mapRow[key];
    }
  });

  return count;
}

// console.log(
//   equalPairs([
//     [3, 2, 1],
//     [1, 7, 6],
//     [2, 7, 7]
//   ])
// );

// console.log(
//   equalPairs([
//     [3, 1, 2, 2],
//     [1, 4, 4, 5],
//     [2, 4, 2, 2],
//     [2, 4, 2, 2]
//   ])
// );

console.log(
  equalPairs([
    [13, 13],
    [13, 13]
  ])
);

console.log(
  equalPairs([
    [11, 1],
    [1, 11]
  ])
);
