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
