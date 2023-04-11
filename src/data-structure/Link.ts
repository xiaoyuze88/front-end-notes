class LinkItem<T = any> {
  data: T;

  next?: LinkItem<T> = null;

  constructor(data: T) {
    this.data = data;
  }
}

class Link<T = any> {
  private _head: LinkItem<T> = null;

  private _length = 0;

  constructor(arrayOrLinkItem?: T[] | LinkItem<T>) {
    if (arrayOrLinkItem) {
      if (Array.isArray(arrayOrLinkItem)) {
        arrayOrLinkItem.reduce<LinkItem<T>>((prev, next, index) => {
          const linkItem = new LinkItem(next);

          if (index === 0) {
            this._head = linkItem;
          } else {
            prev.next = linkItem;
          }

          this._length++;

          return linkItem;
        }, null);
      } else {
        this._head = arrayOrLinkItem as LinkItem<T>;
      }
    }
  }

  // 返回链表中节点的个数
  size() {
    return this._length;
  }

  // 返回链表中的头部元素
  head() {
    return this._head;
  }

  // 向链表尾部增加一个节点
  add(item: T) {
    const linkItem = new LinkItem(item);

    if (!this._head) {
      this._head = linkItem;
      this._length++;
      return;
    }

    const lastItem = this.iterator((element) => {
      if (!element.next) return true;

      return false;
    });

    if (lastItem) {
      lastItem.next = linkItem;
      this._length++;
    }
  }

  // 删除某个节点
  remove(item: T) {
    this.iterator((element) => {
      if (element?.next?.data === item) {
        if (element.next?.next) {
          element.next = element.next.next;
        } else {
          element.next = null;
        }

        this._length--;

        return true;
      }

      return false;
    });
  }

  // 返回某个节点的index
  indexOf(item: T) {
    let targetIndex = -1;

    this.iterator((element, index) => {
      if (element?.data === item) {
        targetIndex = index;
        return true;
      }

      return false;
    });

    return targetIndex;
  }

  // 返回某个index处的节点
  elementAt(targetIndex: number) {
    return this.iterator((_, index) => {
      if (index === targetIndex) {
        return true;
      }

      return false;
    });
  }

  // 在某个index处插入一个节点
  addAt(targetIndex: number, item: T) {
    const linkItem = new LinkItem(item);

    const prevTarget = this.elementAt(targetIndex - 1);

    if (!prevTarget) {
      throw new Error(`Invalid index: ${targetIndex}`);
    }

    if (prevTarget.next) {
      const prevNext = prevTarget.next;
      prevTarget.next = linkItem;
      linkItem.next = prevNext;
    } else {
      prevTarget.next = linkItem;
    }
  }

  // 删除某个index处的节点
  removeAt(targetIndex: number) {
    const prevTarget = this.elementAt(targetIndex - 1);

    if (prevTarget) {
      if (prevTarget.next?.next) {
        const prevGrandNext = prevTarget.next.next;

        prevTarget.next = prevGrandNext;
      } else {
        prevTarget.next = null;
      }
    }
  }

  iterator(callback: (item: LinkItem<T>, index: number) => boolean | void | null): LinkItem<T> {
    let next: LinkItem<T> = this._head;
    let index = 0;

    while (next) {
      const shouldBreak = callback(next, index);

      if (shouldBreak) return next;

      index++;
      next = next.next;
    }

    return null;
  }
}

const link = new Link([1, 2, 3, 4, 5, 6]);

// console.log("link", link);

// console.log("link size", link.size());

const printLink = (link: Link<any>, flag?: string) => {
  return link.iterator((item, index) => {
    printItem(item, "iterator");
    return false;
  });
};

const printItem = (linkItem: LinkItem, flat?: string) => {
  const args = [linkItem?.data, "next:", linkItem?.next?.data];

  if (flat) {
    args.unshift(flat);
  }

  console.log(...args);
};

function removeDuplicate<T = string>(link: Link<T>): Link<T> {
  const map: { [key: string]: true } = {};

  link.iterator((item) => {
    if (map[item.data as string]) {
      link.remove(item.data);
    } else {
      map[item.data as string] = true;
    }
  });

  return link;
}

// removeDuplicate(link);

function reverseLink<T>(link: Link<T>): Link<T> {
  let prev;
  let next;
  let current = link.head();
  next = current.next;

  while (current) {
    if (prev) {
      current.next = prev;
    } else {
      current.next = null;
    }

    if (!next) break;

    prev = current;
    current = next;
    next = next.next;

    printItem(prev, "prev");
    printItem(current, "current");
    printItem(next, "next");
  }

  return new Link(current);
}

// printLink(link);

printLink(reverseLink(link));

// console.log("link size", link.size());

// printLink();

// link.add(7);

// printLink('after add');

// link.addAt(2, 10);

// printLink('after addAt');

// link.remove(6);

// printLink('after remove');

// link.removeAt(3);

// printLink('after removeAt');
