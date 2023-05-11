# Event-Loop

## 进程 vs 线程

* 进程(Process) - Cpu分配资源的最小单位，系统会给它分配内存，是能够拥有资源和独立运行的最小单位
* 线程(Thread) - Cpu调度的最小单位，是建立在进程基础上的独立运行单位

## 浏览器中的事件循环

micro task:
Promise,MutationObserver,queueMicrotask

macro task:
setTimeout/setInterval/postMessage/MessageChanel.postMessage

当 call stack 为空时，开始依次执行 micro task（一个推出才推入第二个，因为一个task可能产生新的task）

当 micro queue 也空后，开始执行 macro task

## nodejs中的事件循环

nodejs 的 事件循环是基于 libuv 实现的，以下是 libuv 的一个完整事件循环

1. timer => setTimeout/setInterval

2. pending callback

3. idle/process 

4. poll =>  I/O callbacks

5. check => setImmediate

6. close callback

在每轮事件循环之前，nodejs还会执行

1. process.nextTick
2. micro task queue