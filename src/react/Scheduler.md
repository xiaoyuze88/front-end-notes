# Scheduler

## 时间切片
浏览器一帧中可以执行js的时机：
task（宏任务） -> job（micro task）

## 

两个队列，以 min heap 的数据结构储存
timeQueue - 等待中的队列
taskQueue - 待执行的队列

