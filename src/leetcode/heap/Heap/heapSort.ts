import { swapHeap } from "./buildHeap";

export function heapSort(data: number[]): number[] {
  data.unshift(undefined);

  buildHeap(data);

  let validHeapSize = data.length - 1;

  for (let i = data.length - 1; i > 1; i--) {
    swapHeap(data, 1, i);
    validHeapSize--;
    heapify(data, validHeapSize, 1);
  }

  data.splice(0, 1);

  return data;
}

function heapify(data: number[], size: number, index: number) {
  let currentIndex = index;

  while (currentIndex <= size) {
    const leftIndex = currentIndex * 2;
    const rightIndex = currentIndex * 2 + 1;

    let nextIndex = currentIndex;

    if (leftIndex <= size && data[leftIndex] > data[nextIndex]) {
      nextIndex = leftIndex;
    }

    if (rightIndex <= size && data[rightIndex] > data[nextIndex]) {
      nextIndex = rightIndex;
    }

    if (nextIndex === currentIndex) {
      break;
    }

    swapHeap(data, nextIndex, currentIndex);
    currentIndex = nextIndex;
  }
}

function buildHeap(data: number[]) {
  const size = data.length - 1;

  for (let i = Math.floor(size / 2); i >= 1; i--) {
    heapify(data, size, i);
  }
}

heapSort([3, 2, 3, 1, 2, 4, 5, 5, 6]);
