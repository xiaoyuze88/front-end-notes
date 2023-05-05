// 1. 堆排序
// 最佳实现方法是:
// 在取最小的10个数的时候,用10亿个数的前十个建一个最大堆(不是写错了, 就是最大,同样取最大10个数的适合,建一个最小堆), 最大堆的堆顶肯定是这十个数 里面最大的一个了(也是最被嫌弃,最有可能被淘汰的一个)
// 然后用接下来的10亿个数,每次和这个最大堆堆顶进行对比, 比这个数还大的,就直接 抛弃, 比这个数小的话,就替代老的堆顶, 然后运行一次维护heap的操作,保持这个 最大堆的属性
// 最后剩下来的最大堆就说我们想要的前10个最小的.(前10个最大的反过来实现即可)

function swap(data: number[], indexA: number, indexB: number) {
  const temp = data[indexA];
  data[indexA] = data[indexB];
  data[indexB] = temp;
}

// 1. 插入式
export function buildHeap_insert(data: number[], type: "maxHeap" | "minHeap"): number[] {
  const temp = [];

  function adjustHeap(data: number[], targetIndex: number) {
    let currentIndex = targetIndex;

    while (currentIndex !== 0) {
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

  for (let i = 0, l = data.length; i < l; i++) {
    temp.push(data[i]);
    adjustHeap(temp, temp.length - 1);
  }

  return temp;
}

// 原地建堆 - 从前往后，从下到上
export function buildHeap_locallyFromFront(data: number[], type: "maxHeap" | "minHeap"): number[] {
  function adjustHeap(data: number[], targetIndex: number) {
    let currentIndex = targetIndex;

    while (currentIndex !== 0) {
      // 跟 parent 比，如果比 parent 大就交换
      const parentIndex = Math.floor(currentIndex / 2);

      if (
        (type === "maxHeap" && data[parentIndex] < data[currentIndex]) ||
        (type === "minHeap" && data[parentIndex] > data[currentIndex])
      ) {
        swap(data, currentIndex, parentIndex);
      }

      currentIndex = parentIndex;
    }
  }

  for (let i = 1, l = data.length; i < l; i++) {
    adjustHeap(data, i);
  }

  return data;
}

// 原地建堆 - 从后往前，从上到下
export function buildHeap_locallyFromEnd(data: number[], type: "maxHeap" | "minHeap"): number[] {
  function adjustHeap(data: number[], targetIndex: number) {
    let currentIndex = targetIndex;

    while (currentIndex < data.length) {
      // 跟两个儿子比，谁比老子大则跟老子交换
      const leftIndex = currentIndex * 2 + 1;
      const rightIndex = currentIndex * 2;

      let nextIndex = currentIndex;

      if (type === "maxHeap") {
        if (data[leftIndex] > data[currentIndex]) {
          swap(data, leftIndex, currentIndex);
          nextIndex = leftIndex;
        } else if (data[rightIndex] > data[currentIndex]) {
          swap(data, rightIndex, currentIndex);
          nextIndex = rightIndex;
        }
      } else {
        if (data[leftIndex] < data[currentIndex]) {
          swap(data, leftIndex, currentIndex);
          nextIndex = leftIndex;
        } else if (data[rightIndex] < data[currentIndex]) {
          swap(data, rightIndex, currentIndex);
          nextIndex = rightIndex;
        }
      }

      if (nextIndex === currentIndex) break;

      currentIndex = nextIndex;
    }
  }

  for (let i = data.length - 2; i >= 0; i--) {
    adjustHeap(data, i);
  }

  return data;
}

console.log(buildHeap_locallyFromEnd([3, 2, 3, 1, 2, 4, 5, 5, 6], "maxHeap"));
