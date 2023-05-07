export const mergeSort = (array: number[]) => {
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

console.log(mergeSort([1, 23, 123, 5, 1, 2]));
