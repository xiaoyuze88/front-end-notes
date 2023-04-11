module.exports = {
  extends: ["airbnb-base", "airbnb-typescript/base"],
  plugins: [],
  settings: {},
  /**
   "off"或者0   // 关闭规则关闭
   "warn"或者1  // 在打开的规则作为警告（不影响退出代码）
   "error"或者2 // 把规则作为一个错误（退出代码触发时为1）
   */
  rules: {
    "no-underscore-dangle": 0,
    "no-plusplus": 0,
    "max-classes-per-file": 0,
    "no-param-reassign": 0
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  }
};
