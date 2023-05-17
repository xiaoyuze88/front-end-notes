const isPrimitive = (any: any): boolean => {
  const type = typeof any;

  if (any === null) return true;

  if (type === "function" || type === "object") return false;

  return true;
};

// 满足由 Object 直接实例化的
// 1. prototype === null
// 2. prototype.constructor instanceof prototype.constructor
// 3. prototype.constructor === Object
const isPlainObject = (any: any): boolean => {
  if (isPrimitive(any)) return false;

  const proto = Object.getPrototypeOf(any);

  return proto instanceof proto && proto.constructor === Object;
};

// 1. Object
// 2. Array
// 3. some instance
// 4. primitive value
export function deepMerge(target: any, ...sources: any[]): any {
  // TODO: type check
  // 找到最后一个非 undefined 的值
  if (isPrimitive(target)) {
    const arr = [target, ...sources];

    for (let i = arr.length - 1; i >= 0; i--) {
      if (typeof arr[i] !== "undefined") return arr[i];
    }
  }

  if (Array.isArray(target)) {
    const result = [];

    const maxLength = Math.max(target.length, ...sources.map((source) => source.length));

    for (let i = 0; i < maxLength; i++) {
      result.push(deepMerge(target[i], ...sources.map((source) => source[i])));
    }

    return result;
  } else {
    // for ()

  }
}
