import chalk from "chalk";

export const printResult = <T extends (...args: any) => any>(
  fn: T,
  [...args]: [...Parameters<T>],
  expected: ReturnType<T>
) => {
  const result = fn(...args);

  console.log(
    "input: (",
    ...args,
    "), result: ",
    result,
    ", expected: ",
    expected,
    ", is matched? => ",
    chalk[result === expected ? "green" : "red"](result === expected)
  );
};
