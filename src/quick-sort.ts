function quickSort<T = number>(array: T[]): T[] {
  if (array.length <= 1) return array;

  const compare = array[0];

  let left: T[] = [];
  let right: T[] = [];

  for (let i = 1, l = array.length; i < l; i++) {
    if (array[i] <= compare) left.push(array[i]);
    if (array[i] > compare) right.push(array[i]);
  }

  if (left.length) {
    left = quickSort(left);
  }

  if (right.length) {
    right = quickSort(right);
  }

  return [...left, compare, ...right];
}

function mergeSort(array) {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);

  let left = array.slice(0, mid);
  let right = array.slice(mid);

  left = mergeSort(left);
  right = mergeSort(right);

  let leftIndex = 0;
  let rightIndex = 0;

  const newArray = [];

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      newArray.push(left[leftIndex++]);
    } else {
      newArray.push(right[rightIndex++]);
    }
  }

  while (leftIndex < left.length) {
    newArray.push(left[leftIndex++]);
  }

  while (rightIndex < right.length) {
    newArray.push(right[rightIndex++]);
  }

  return newArray
}

console.log(mergeSort([0, 1, 3, 5, 1, 2, 0, 9, 10, 32]));
