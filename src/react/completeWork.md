# completeWork
绝大部分都无操作，
除了 HostComponent/HostText 额外操作 dom

HostComponent：
无 dom 复用时，创建新 Dom元素，有dom时diff properties，以[k,v,k,null] 形式挂载到 updateQueue 上

HostText
创建/更新文本