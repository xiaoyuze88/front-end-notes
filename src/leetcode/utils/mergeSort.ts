/* eslint-disable import/prefer-default-export */
export const mergeSort2 = (array: number[]) => {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);
  let leftArray = array.slice(0, mid);
  let rightArray = array.slice(mid);

  leftArray = mergeSort(leftArray);
  rightArray = mergeSort(rightArray);

  let leftIndex = 0;
  let rightIndex = 0;

  const newArray = [];

  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    if (leftArray[leftIndex] < rightArray[rightIndex]) {
      newArray.push(leftArray[leftIndex]);
      leftIndex++;
    } else {
      newArray.push(rightArray[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < leftArray.length) {
    newArray.push(leftArray[leftIndex++]);
  }

  while (rightIndex < rightArray.length) {
    newArray.push(rightArray[rightIndex++]);
  }

  return newArray;
};

// 分治
// 1. 拆到最小颗粒
// 2. 两个指针分别执行left、right，依次遍历，小的推入
// 3. 然后一层一层退出堆栈，每层都保证 left/right 都是已经排好序的
export const mergeSort = (array: number[]) => {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);

  // 1. 拆到最小颗粒
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));

  let leftIndex = 0;
  let rightIndex = 0;

  
  const result = [];

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
};

console.log(mergeSort([1, 23, 123, 5, 1, 2]));
