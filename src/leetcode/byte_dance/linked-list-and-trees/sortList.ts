// 排序链表
// https://leetcode.cn/explore/interview/card/bytedance/244/linked-list-and-tree/1040/
// 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

// 示例 1：

// 输入：head = [4,2,1,3]
// 输出：[1,2,3,4]
// 示例 2：

// 输入：head = [-1,5,3,4,0]
// 输出：[-1,0,3,4,5]
// 示例 3：

// 输入：head = []
// 输出：[]
 

// 提示：

// 链表中节点的数目在范围 [0, 5 * 104] 内
// -105 <= Node.val <= 105
 

// 进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？

// 1. 从上到下，通过快慢指针找中的办法，来进行递归mergeSort，时间复杂度 O(N*logN)，空间复杂度 O(logN)
// 2. 从下到上，通过遍历方法进行mergeSort，可达到空间复杂度 O(1)
function sortList(head: ListNode | null): ListNode | null {
  
};