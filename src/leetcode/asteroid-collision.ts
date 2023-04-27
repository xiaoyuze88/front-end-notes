// 给定一个整数数组 asteroids，表示在同一行的行星。

// 对于数组中的每一个元素，其绝对值表示行星的大小，正负表示行星的移动方向（正表示向右移动，负表示向左移动）。每一颗行星以相同的速度移动。

// 找出碰撞后剩下的所有行星。碰撞规则：两个行星相互碰撞，较小的行星会爆炸。如果两颗行星大小相同，则两颗行星都会爆炸。两颗移动方向相同的行星，永远不会发生碰撞。

//

// 示例 1：

// 输入：asteroids = [5,10,-5]
// 输出：[5,10]
// 解释：10 和 -5 碰撞后只剩下 10 。 5 和 10 永远不会发生碰撞。
// 示例 2：

// 输入：asteroids = [8,-8]
// 输出：[]
// 解释：8 和 -8 碰撞后，两者都发生爆炸。
// 示例 3：

// 输入：asteroids = [10,2,-5]
// 输出：[10]
// 解释：2 和 -5 发生碰撞后剩下 -5 。10 和 -5 发生碰撞后剩下 10 。
//

// 提示：

// 2 <= asteroids.length <= 104
// -1000 <= asteroids[i] <= 1000
// asteroids[i] != 0

function asteroidCollision(asteroids: number[]): number[] {
  const stack = [];

  for (let i = 0, l = asteroids.length; i < l; i++) {
    const currentItem = asteroids[i];

    let isActive = true;

    // 每遍历到每个元素，都需要跟栈中所有元素做比较
    while (stack.length) {
      const lastItem = stack[stack.length - 1];

      // 1. 最近一个元素相反
      // 2. 左正右负
      // 满足条件则需要销毁，否则退出
      if (lastItem && lastItem * currentItem < 0 && isPositive(lastItem)) {
        const compareResp = compareAbs(lastItem, currentItem);

        // lastItem > currentItem，没事发生，后一个不需要推入
        if (compareResp === 1) {
          isActive = false;
          // 已经死了，不需要继续遍历下去了
          break;
        }
        // lastItem < currentItem，推出最后一个，推入当前
        else if (compareResp === -1) {
          stack.pop();
        }
        // lastItem == currentItem，推出最后一个，不推入当前
        else {
          stack.pop();
          isActive = false;
          break;
        }
      } else {
        break;
      }
    }

    // 比较完还活着，则推入
    if (isActive) {
      stack.push(currentItem);
    }
  }

  return stack;
}

function compareAbs(a: number, b: number): 0 | 1 | -1 {
  const absA = Math.abs(a);
  const absB = Math.abs(b);

  if (absA === absB) return 0;
  if (absA > absB) return 1;
  if (absA < absB) return -1;
}

function isPositive(num: number): boolean {
  return num * -1 < 0;
}

console.log(asteroidCollision([5, 10, -5]));

console.log(asteroidCollision([8, -8]));

console.log(asteroidCollision([10, 2, -5]));

console.log(asteroidCollision([-2, -1, 1, 2]));

// function asteroidCollision(asteroids: number[]): number[] {
//   let lastItem;
//   let absLastItem;
//   let absCurrentItem;

//   let current = asteroids;
//   let negativeCount = 0;
//   let positiveCount = 0;

//   do {
//     const stack = [];
//     negativeCount = 0;
//     positiveCount = 0;

//     for (let i = 0, l = current.length; i < l; i++) {
//       if (current[i] > 0) positiveCount++;
//       else negativeCount++;

//       lastItem = stack[stack.length - 1];

//       if (lastItem) {
//         const isLastItemPositive = stack[stack.length - 1] * 1 > 0;
//         const isCurrentItemPositive = !isLastItemPositive;

//         // 相反且左正右负，必有一亡
//         if (lastItem * current[i] < 0 && isLastItemPositive) {
//           absLastItem = Math.abs(stack[stack.length - 1]);
//           absCurrentItem = Math.abs(current[i]);

//           // 它们俩相反

//           // 当前大，干掉前面一个，推入当前
//           if (absLastItem < absCurrentItem) {
//             stack.pop();
//             stack.push(current[i]);

//             // 前面一个被干掉，且 isLastItemPositive，说明正数-1
//             if (isLastItemPositive) {
//               positiveCount--;
//             } else {
//               negativeCount--;
//             }
//           }
//           // 一样大，干掉前面一个
//           else if (absLastItem === absCurrentItem) {
//             stack.pop();
//             positiveCount--;
//             negativeCount--;
//           }
//           // 前面的大，啥都不干
//           else {
//             // 前面的大，说明后面的数被减掉了
//             if (isCurrentItemPositive) {
//               positiveCount--;
//             } else {
//               negativeCount--;
//             }
//           }

//           continue;
//         }
//       }

//       stack.push(current[i]);
//     }

//     current = stack;
//   } while (positiveCount > 0 && negativeCount > 0);

//   return current;
// }
