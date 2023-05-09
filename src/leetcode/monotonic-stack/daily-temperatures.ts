// 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。

//

// 示例 1:

// 输入: temperatures = [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]
// 示例 2:

// 输入: temperatures = [30,40,50,60]
// 输出: [1,1,1,0]
// 示例 3:

// 输入: temperatures = [30,60,90]
// 输出: [1,1,0]
//

// 提示：

// 1 <= temperatures.length <= 105
// 30 <= temperatures[i] <= 100

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/daily-temperatures
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
// function dailyTemperatures(temperatures: number[]): number[] {
//   const stack: {
//     temperature: number;
//     index: number;
//   }[] = [];

//   const result = Array(temperatures.length).fill(0);

//   for (let i = temperatures.length - 1; i >= 0; i--) {
//     while (stack.length && stack[stack.length - 1].temperature <= temperatures[i]) {
//       stack.pop();
//     }

//     if (stack.length) {
//       result[i] = stack[stack.length - 1].index - i;
//     }

//     stack.push({
//       temperature: temperatures[i],
//       index: i
//     });
//   }

//   return result;
// }

function dailyTemperatures(temperatures: number[]): number[] {
  const stack: {
    temperature: number;
    index: number;
  }[] = [];

  const result = Array(temperatures.length).fill(0);

  for (let i = temperatures.length - 1; i >= 0; i--) {
    while (stack.length && stack[stack.length - 1].temperature < temperatures[i]) {
      stack.pop();
    }

    // 说明后面没有比我大的
    if (!stack.length) {
      result[i] = 0;
    } else {
      result[i] = stack[stack.length - 1].index - i;
    }

    stack.push({
      temperature: temperatures[i],
      index: i
    });
  }

  return result;
}

// const nums = [2, 1, 2, 4, 3];

// function getNextGreatestItem(nums: number[]) {
//   const results = [...nums];
//   const stack: {number}[] = [];

//   for (let i = nums.length - 1; i >= 0; i--) {
//     let distance = 0;

//     while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
//       stack.pop();
//       distance++;
//     }

//     if (stack.length) {
//       results[i] = distance + 1;
//     } else {
//       results[i] = 0;
//     }

//     // results[i] = stack.length === 0 ? 0 : stack[stack.length - 1];
//     stack.push(nums[i]);
//   }

//   return results;
// }

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
