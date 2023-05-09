// 设计一个算法收集某些股票的每日报价，并返回该股票当日价格的 跨度 。

// 当日股票价格的 跨度 被定义为股票价格小于或等于今天价格的最大连续日数（从今天开始往回数，包括今天）。

// 例如，如果未来 7 天股票的价格是 [100,80,60,70,60,75,85]，那么股票跨度将是 [1,1,1,2,1,4,6] 。

// 实现 StockSpanner 类：

// StockSpanner() 初始化类对象。
// int next(int price) 给出今天的股价 price ，返回该股票当日价格的 跨度 。
//

// 示例：

// 输入：
// ["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
// [[], [100], [80], [60], [70], [60], [75], [85]]
// 输出：
// [null, 1, 1, 1, 2, 1, 4, 6]

// 解释：
// StockSpanner stockSpanner = new StockSpanner();
// stockSpanner.next(100); // 返回 1
// stockSpanner.next(80);  // 返回 1
// stockSpanner.next(60);  // 返回 1
// stockSpanner.next(70);  // 返回 2
// stockSpanner.next(60);  // 返回 1
// stockSpanner.next(75);  // 返回 4 ，因为截至今天的最后 4 个股价 (包括今天的股价 75) 都小于或等于今天的股价。
// stockSpanner.next(85);  // 返回 6
//
// 提示：

// 1 <= price <= 105
// 最多调用 next 方法 104 次

// 来源：力扣（LeetCode）
// 链接：https://leetcode.cn/problems/online-stock-span
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

class StockSpanner {
  // 这个 stack 肯定是单调递增的
  stack: {
    price: number;
    index: number;
  }[] = [];

  index = -1;

  next(price: number): number {
    this.index++;

    // 问题相当于我从后往前看，能看到的最近一个比我高的高个子在哪
    // 栈里只留下最前一个比我大的，就像一个高个子站在我前面，那么再在他前面的矮个子我都看不到了
    // 比我还矮的都不重要了，推出去
    while (this.stack.length && this.stack[this.stack.length - 1].price <= price) {
      this.stack.pop();
    }

    // 没有比我高的了，那么返回1
    if (!this.stack.length) {
      this.stack.push({
        price,
        index: this.index
      });
      return this.index + 1;
    }

    // 我前面离我最近的比我高的下标
    const latestHigherIndex = this.stack[this.stack.length - 1].index;

    this.stack.push({
      price,
      index: this.index
    });

    return this.index - latestHigherIndex;
  }
}

const stockSpanner = new StockSpanner();

[100, 80, 60, 70, 60, 75, 85].forEach((price) => {
  console.log(price, stockSpanner.next(price));
});

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
