// 给你一个下标从 0 开始的整数数组 costs ，其中 costs[i] 是雇佣第 i 位工人的代价。

import { printResult } from "../utils";
import { Heap } from "./Heap";

// 同时给你两个整数 k 和 candidates 。我们想根据以下规则恰好雇佣 k 位工人：

// 总共进行 k 轮雇佣，且每一轮恰好雇佣一位工人。
// 在每一轮雇佣中，从最前面 candidates 和最后面 candidates 人中选出代价最小的一位工人，如果有多位代价相同且最小的工人，选择下标更小的一位工人。
// 比方说，costs = [3,2,7,7,1,2] 且 candidates = 2 ，第一轮雇佣中，我们选择第 4 位工人，因为他的代价最小 [3,2,7,7,1,2] 。
// 第二轮雇佣，我们选择第 1 位工人，因为他们的代价与第 4 位工人一样都是最小代价，而且下标更小，[3,2,7,7,2] 。注意每一轮雇佣后，剩余工人的下标可能会发生变化。
// 如果剩余员工数目不足 candidates 人，那么下一轮雇佣他们中代价最小的一人，如果有多位代价相同且最小的工人，选择下标更小的一位工人。
// 一位工人只能被选择一次。
// 返回雇佣恰好 k 位工人的总代价。

//

// 示例 1：

// 输入：costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4
// 输出：11
// 解释：我们总共雇佣 3 位工人。总代价一开始为 0 。
// - 第一轮雇佣，我们从 [17,12,10,2,7,2,11,20,8] 中选择。最小代价是 2 ，有两位工人，我们选择下标更小的一位工人，即第 3 位工人。总代价是 0 + 2 = 2 。
// - 第二轮雇佣，我们从 [17,12,10,7,2,11,20,8] 中选择。最小代价是 2 ，下标为 4 ，总代价是 2 + 2 = 4 。
// - 第三轮雇佣，我们从 [17,12,10,7,11,20,8] 中选择，最小代价是 7 ，下标为 3 ，总代价是 4 + 7 = 11 。注意下标为 3 的工人同时在最前面和最后面 4 位工人中。
// 总雇佣代价是 11 。
// 示例 2：

// 输入：costs = [1,2,4,1], k = 3, candidates = 3
// 输出：4
// 解释：我们总共雇佣 3 位工人。总代价一开始为 0 。
// - 第一轮雇佣，我们从 [1,2,4,1] 中选择。最小代价为 1 ，有两位工人，我们选择下标更小的一位工人，即第 0 位工人，总代价是 0 + 1 = 1 。注意，下标为 1 和 2 的工人同时在最前面和最后面 3 位工人中。
// - 第二轮雇佣，我们从 [2,4,1] 中选择。最小代价为 1 ，下标为 2 ，总代价是 1 + 1 = 2 。
// - 第三轮雇佣，少于 3 位工人，我们从剩余工人 [2,4] 中选择。最小代价是 2 ，下标为 0 。总代价为 2 + 2 = 4 。
// 总雇佣代价是 4 。
//

// 提示：

// 1 <= costs.length <= 105
// 1 <= costs[i] <= 105
// 1 <= k, candidates <= costs.length

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/total-cost-to-hire-k-workers
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
function totalCost(costs: number[], k: number, candidates: number): number {
  // 从前 candidates 和后 candidates 个人中选一个最小的，如果相等则选下标小的
  // 即每次从前 candidates 中选出最小的，可用最小堆

  // 构建堆
  const minHeap1 = new Heap();
  const minHeap2 = new Heap();

  let currentLength = costs.length;

  // 平均分一下，避免被重复计算
  let leftIndex = 0;
  let rightIndex = currentLength - 1;

  // 一人一半
  let maxLeftIndex: number;
  let minRightIndex: number;

  // 奇数
  if (currentLength % 2) {
    maxLeftIndex = Math.floor(currentLength / 2);
    minRightIndex = Math.floor(currentLength / 2) + 1;
  }
  // 偶数
  else {
    maxLeftIndex = currentLength / 2 - 1;
    minRightIndex = currentLength / 2;
  }

  for (let i = 0, l = candidates; i < l; i++) {
    leftIndex = i;
    rightIndex = currentLength - i - 1;

    if (costs[leftIndex] && leftIndex <= maxLeftIndex) {
      minHeap1.offer(costs[leftIndex]);
    }
    if (costs[rightIndex] && rightIndex >= minRightIndex) {
      minHeap2.offer(costs[rightIndex]);
    }
  }

  let sum = 0;

  let totalK = k;

  while (k--) {
    if (minHeap1.size < candidates && costs[leftIndex] && leftIndex < rightIndex) {
      minHeap1.offer(costs[leftIndex]);
    }

    if (minHeap2.size < candidates && costs[rightIndex] && rightIndex > leftIndex) {
      minHeap2.offer(costs[rightIndex]);
    }

    const min1 = minHeap1.peak();
    const min2 = minHeap2.peak();

    if (!min1 && min2) {
      minHeap2.poll();
      rightIndex--;
      console.log(
        `right poll 1, round: ${totalK - k}, min2: ${min2}; rightIndex: ${rightIndex}; sum: ${sum}`
      );
      sum += min2;
      continue;
    } else if (!min2 && min1) {
      minHeap1.poll();
      leftIndex++;
      sum += min1;
      console.log(
        `left poll 1, round: ${totalK - k}, min1: ${min1}; leftIndex: ${leftIndex}; sum: ${sum}`
      );
      continue;
    } else if (!min1 && !min2) {
      break;
    }

    // 从1中取一个
    if (min1 <= min2) {
      minHeap1.poll();
      leftIndex++;
      sum += min1;
      console.log(
        `left poll 2, round: ${totalK - k}, min1: ${min1}; leftIndex: ${leftIndex}; sum: ${sum}`
      );
    } else {
      minHeap2.poll();
      rightIndex--;
      sum += min2;
      console.log(
        `right poll 2, round: ${totalK - k}, min2: ${min2}; rightIndex: ${rightIndex}; sum: ${sum}`
      );
    }
  }

  return sum;
}

printResult(totalCost, [[17, 12, 10, 2, 7, 2, 11, 20, 8], 3, 4], 11);
printResult(totalCost, [[1, 2, 4, 1], 3, 3], 4);

printResult(totalCost, [[57, 33, 26, 76, 14, 67, 24, 90, 72, 37, 30], 11, 2], 526);

printResult(
  totalCost,
  [
    [
      515,
      705,
      303,
      791,
      304,
      382,
      756,
      957,
      402,
      399,
      743,
      919,
      568,
      141,
      894,
      488,
      14,
      452,
      459,
      930,
      981,
      662,
      464,
      663,
      576,
      302,
      720,
      855,
      838,
      51,
      174,
      97,
      375,
      813,
      537,
      750,
      191,
      991,
      915,
      972,
      908,
      370,
      758,
      864,
      209,
      478,
      442,
      685,
      552,
      717,
      860,
      996,
      171,
      168,
      560,
      595,
      460,
      285,
      18,
      96,
      970,
      746,
      512,
      420,
      844,
      183,
      607,
      267,
      40,
      491,
      232,
      278,
      751,
      277,
      19,
      419,
      384,
      85,
      563,
      556,
      643,
      896,
      333,
      468
    ],
    57,
    15
  ],
  21090
);
