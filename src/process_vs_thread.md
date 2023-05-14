# 进程与线程区别

## 进程

进程好比一个中心，CPU资源分配是按中心分配的，系统会给他分配内存，是能够拥有资源和独立运行的最小单位（一个中心需要多少钱，统一拨给你，你内部怎么使用是你内部的事情）

同一时刻执行的进程数不会超过核心数，但是单核也可以执行多个进程，需要来回切换

## 线程

线程好比中心下的若干个组，是CPU调度的最小单位，CPU上真正运行的是线程，多个线程共享中心内资源