// 1. 堆排序
// 最佳实现方法是:
// 在取最小的10个数的时候,用10亿个数的前十个建一个最大堆(不是写错了, 就是最大,同样取最大10个数的适合,建一个最小堆), 最大堆的堆顶肯定是这十个数 里面最大的一个了(也是最被嫌弃,最有可能被淘汰的一个)
// 然后用接下来的10亿个数,每次和这个最大堆堆顶进行对比, 比这个数还大的,就直接 抛弃, 比这个数小的话,就替代老的堆顶, 然后运行一次维护heap的操作,保持这个 最大堆的属性
// 最后剩下来的最大堆就说我们想要的前10个最小的.(前10个最大的反过来实现即可)
export function buildHeap(
  data: number[],
  type: "maxHeap" | "minHeap",
  method: "insert" | "locallyFromStart" | "locallyFromEnd" = "locallyFromStart"
) {
  switch (method) {
    case "insert":
      return buildHeap_insert(data, type);
    case "locallyFromEnd":
      return buildHeap_locallyFromEnd(data, type);
    case "locallyFromStart":
    default:
      return buildHeap_locallyFromStart(data, type);
  }
}

// 1. 插入式
export function buildHeap_insert(data: number[], type: "maxHeap" | "minHeap"): number[] {
  const temp = [undefined];
  data = [undefined, ...data];

  function adjustHeap(data: number[], targetIndex: number) {
    let currentIndex = targetIndex;

    while (currentIndex >= 1) {
      // 跟 parent 比，如果比 parent 大就交换
      const parentIndex = Math.floor(currentIndex / 2);

      if (
        (type === "maxHeap" && data[parentIndex] < data[currentIndex]) ||
        (type === "minHeap" && data[parentIndex] > data[currentIndex])
      ) {
        const temp = data[currentIndex];
        data[currentIndex] = data[parentIndex];
        data[parentIndex] = temp;
      }

      currentIndex = parentIndex;
    }
  }

  for (let i = 1, l = data.length; i < l; i++) {
    temp.push(data[i]);
    adjustHeap(temp, temp.length - 1);
  }

  temp.splice(0, 1);

  return temp;
}

// 原地建堆 - 从前往后，从下到上
export function buildHeap_locallyFromStart(data: number[], type: "maxHeap" | "minHeap"): number[] {
  data = [undefined, ...data];

  function adjustHeap(data: number[], targetIndex: number) {
    let currentIndex = targetIndex;

    while (currentIndex >= 1) {
      // 跟 parent 比，如果比 parent 大就交换
      const parentIndex = Math.floor(currentIndex / 2);

      if (
        (type === "maxHeap" && data[parentIndex] < data[currentIndex]) ||
        (type === "minHeap" && data[parentIndex] > data[currentIndex])
      ) {
        swapHeap(data, currentIndex, parentIndex);
      }

      currentIndex = parentIndex;
    }
  }

  for (let i = 1, l = data.length; i < l; i++) {
    adjustHeap(data, i);
  }

  data.splice(0, 1);

  return data;
}

// 原地建堆 - 从后往前，从上到下
export function buildHeap_locallyFromEnd(data: number[], type: "maxHeap" | "minHeap"): number[] {
  data = [undefined, ...data];

  function adjustHeap(data: number[], targetIndex: number) {
    let currentIndex = targetIndex;

    while (currentIndex < data.length) {
      // 跟两个儿子比，谁最大谁跟老子交换
      const leftIndex = currentIndex * 2;
      const rightIndex = currentIndex * 2 + 1;

      let nextIndex = currentIndex;

      if (type === "maxHeap") {
        if (data[leftIndex] > data[currentIndex]) {
          

          // left最大
          if (data[leftIndex] > data[rightIndex]) {
            swapHeap(data, leftIndex, currentIndex);
            nextIndex = leftIndex;
          }
          // right 最大
          else {
            swapHeap(data, rightIndex, currentIndex);
            nextIndex = rightIndex;
          }
        } else if (data[rightIndex] > data[currentIndex]) {
          // right最大
          if (data[rightIndex] > data[leftIndex]) {
            swapHeap(data, rightIndex, currentIndex);
            nextIndex = rightIndex;
          }
          // left 最大
          else {
            swapHeap(data, leftIndex, currentIndex);
            nextIndex = leftIndex;
          }
        }
      } else {
        if (data[leftIndex] < data[currentIndex]) {
          // left最小
          if (data[leftIndex] < data[rightIndex]) {
            swapHeap(data, leftIndex, currentIndex);
            nextIndex = leftIndex;
          }
          // right 最小
          else {
            swapHeap(data, rightIndex, currentIndex);
            nextIndex = rightIndex;
          }
        } else if (data[rightIndex] < data[currentIndex]) {
          // right最小
          if (data[rightIndex] < data[leftIndex]) {
            swapHeap(data, rightIndex, currentIndex);
            nextIndex = rightIndex;
          }
          // left 最小
          else {
            swapHeap(data, leftIndex, currentIndex);
            nextIndex = leftIndex;
          }
        }
      }

      if (nextIndex === currentIndex) break;

      currentIndex = nextIndex;
    }
  }

  for (let i = Math.floor((data.length - 1) / 2); i >= 1; i--) {
    adjustHeap(data, i);
  }

  data.splice(0, 1);

  return data;
}

export function swapHeap(data: number[], indexA: number, indexB: number) {
  const temp = data[indexA];
  data[indexA] = data[indexB];
  data[indexB] = temp;
}

// console.log(buildHeap_insert([3, 2, 3, 1, 2, 4, 5, 5, 6], "maxHeap"));
// console.log(buildHeap_locallyFromFront([3, 2, 3, 1, 2, 4, 5, 5, 6], "maxHeap"));
// console.log(buildHeap_locallyFromFront([3, 2, 3, 1, 2, 4, 5, 5, 6], "maxHeap"));
// console.log(buildHeap_locallyFromEnd([3, 2, 3, 1, 2, 4, 5, 5, 6], "minHeap"));
