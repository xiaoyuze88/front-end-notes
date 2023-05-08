import chalk from "chalk";
import isEqual from "lodash.isequal";

export type IterationType = "recursion" | "iteration";

export const printResult = <T extends (...args: any) => any>(
  fn: T,
  [...args]: [...Parameters<T>],
  expected: ReturnType<T>,
  equalFn: (resp: ReturnType<T>, expected: ReturnType<T>) => boolean = isEqual
) => {
  const result = fn(...args);

  const isMatch = equalFn(result, expected);

  console.log(
    "input: (",
    ...args,
    "), result: ",
    result,
    ", expected: ",
    expected,
    ", is matched? => ",
    chalk[isMatch ? "green" : "red"](isMatch)
  );
};

// 一比特数算法
// n & n-1，会将n最后一个1变成0，所以重复操作k次后n将变为0，此k即是n的1的个数
export function oneBitCount(n: number) {
  const count = 0;

  while (n > 0) {
    n = n & (n - 1);
  }

  return count;
}
