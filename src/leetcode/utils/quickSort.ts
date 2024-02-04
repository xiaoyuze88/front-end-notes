const swap = (array: any[], from: number, to: number) => {
  const temp = array[from];
  array[from] = array[to];
  array[to] = temp;
};

// 双指针，原地排序
export const quickSort = (array: number[], startIndex = 0, endIndex = array.length - 1) => {
  if (endIndex - startIndex + 1 <= 1) return array;

  // 双指针
  let left = startIndex;
  let right = endIndex;

  const base = array[left];

  while (left < right) {
    // 先从右往左过一遍，如果比base大则继续移动右指针
    while (left < right) {
      if (array[right] >= base) {
        right--;
      } else {
        // 如果比base小则交换，交换完退出
        swap(array, left, right);
        break;
      }
    }

    // 此时要不然已经交换过了，也就是base在相对右边；要不然就是全部都比base大，完全不需要交换
    // 此时开始从左往右找一遍（如果是第二种case，则right肯定已经等于left了）
    while (left < right) {
      // 如果小于base则继续挪动左指针
      if (array[left] <= base) {
        left++;
      } else {
        // 否则交换，然后退出
        swap(array, left, right);
        break;
      }
    }
  }

  quickSort(array, startIndex, left - 1);
  quickSort(array, left + 1, endIndex);

  return array;
};

// 需要额外空间复杂度，非原地排序
export const quickSort2 = (array: number[]) => {
  if (array.length <= 1) return array;

  let left = [];
  let right = [];

  for ()

  quickSort(array, startIndex, left - 1);
  quickSort(array, left + 1, endIndex);

  return array;
};

// [42, 65, 6, 58, 5, 21, 99, 80, 65, 96, 103]

console.log(
  quickSort(
    Array(20)
      .fill(0)
      .map(() => Math.round(Math.random() * 100))
  )
);
