# what is csrf?



# 1. csrf token usage?

1. 在 console.cloud.tencent.com 登陆过，有cookie
2. 在 someFakeUrl.com 上嵌了一个表单 <form action="console.cloud.tencent.com/some/cgi" method="post" />，如果没任何保护，则会可以执行任意操作。
3. 但是 console.cloud.tencent.com 增加了 csrf token 的限制（通过当前 skey + 一个固定密钥计算），外站无法知道该token的算法，所以无法成功的通过 someFakeUrl.com 往 console 发请求

# 2. SameSite cookie

