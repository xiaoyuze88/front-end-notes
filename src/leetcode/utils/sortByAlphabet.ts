// 返回 s <= p
function compareByAlphabet(s: string, p: string) {
  const minLen = Math.min(s.length, p.length);

  let charCodeS: number;
  let charCodeP: number;

  for (let i = 0, l = minLen; i < l; i++) {
    charCodeS = s.charCodeAt(i);
    charCodeP = p.charCodeAt(i);

    if (charCodeS > charCodeP) {
      return false;
    } else if (charCodeS < charCodeP) {
      return true;
    }
  }

  // 到这里说明前面都相等，如果 s.length > p.length，那么返回 false, p 更小
  if (s.length > p.length) return false;

  return true;
}

export function sortByAlphabet(array: string[]) {
  array.sort((a, b) => (compareByAlphabet(a, b) ? -1 : 1));
  return array;
}

const arr = ["mobile", "mouse", "moneypot", "monitor", "mousepad"];

// console.log(compareByAlphabet("mouse", "mou"));

console.log(
  [...arr].sort(),
  [...arr].sort((a, b) => (compareByAlphabet(a, b) ? -1 : 1))
);
