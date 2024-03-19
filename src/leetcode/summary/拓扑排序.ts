// 拓扑排序
// 1. 有向图
// 2. bfs
// 3. 度为0的入队列
// 4. 每出一个队列，就将其指向的变度-1，同时推入结果，如果-1后等于0的边，也推入队列
// 5. 如果某个时刻没有度为0的边，说明有环

// 207. 课程表
// https://leetcode.cn/problems/course-schedule/description/?utm_source=LCUS&utm_medium=ip_redirect&utm_campaign=transfer2china
// 中等
// 相关标签
// 相关企业
// 提示
// 你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。

// 在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。

// 例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
// 请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。

// 示例 1：

// 输入：numCourses = 2, prerequisites = [[1,0]]
// 输出：true
// 解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
// 示例 2：

// 输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
// 输出：false
// 解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。

// 提示：

// 1 <= numCourses <= 2000
// 0 <= prerequisites.length <= 5000
// prerequisites[i].length == 2
// 0 <= ai, bi < numCourses
// prerequisites[i] 中的所有课程对 互不相同

function canFinish(numCourses: number, prerequisites: number[][]): boolean {}
