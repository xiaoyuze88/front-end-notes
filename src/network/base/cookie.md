# Cookie

## 属性

1. domain
默认当前域名，console.cloud.tencent.com
也可以设置：cloud.tencent.com/.cloud.tencent.com/.tencent.com

但是反过来不行，也就是 cloud.tencent.com 不能写给 console.cloud.tencent.com
同时 console.cloud.tencent.com 也不能写给 buy.cloud.tencent.com

* 端口不影响 domain
* 协议不影响 domain

2. Path

默认 /，设置后只有该路径会带上该 cookie

2. Expires/Mag-age

3. Secure

只允许 https

4. HttpOnly

只允许通过 http 传递，不允许 js 接触，document.cookie 无法获取

5. SameSite

支持：
* Strict 所有地方都不会发送第三方cookie
* Lax 默认值，除：链接（<a/>）,预加载请求<link rel="prerender" href="..."/>，GET 表单：<form method="GET" action="..."> 外，都不会发送第三方 cookie
* None（若为 None，则必须设置 Secure）

## 风险点

1. 中间人攻击

防御方式：
* https
* 设置 Secure 属性

2. DNS劫持

用户登录过A.com，黑客攻击dns服务器，构造虚假的解析，将fake.A.com指向黑客自己的服务器ip，发送美女图片(fake.A.com/beauty.jpg)诱导用户点击。

若 A.com cookie 设置的是全子域，则 fake.A.com 将可以获取用户的 cookie。
若 A.com 设置了 secure，那么黑客必须使用 https://fake.A.com，但是由于没有合法证书（匹配域名的证书），用户会看到 TSL 警告

3. XSS

XSS后可通过诱导用户点击，从而可以讲可获取的 document.cookie 发送给黑客

防御：
HttpOnly

4. csrf

1. 登陆A
2. 访问B，B中内置了指向A的表单或图片
3. 就能以A的身份发起请求（会带上A的cookie），但是B是无法获取A的cookie的

防御：
1. 设置 SameSite
2. 写入的方法用 Post，且用 json form
3. csrf token，写在 cookie 中(或通过cookie中某字段计算)，要求请求payload中带上token（B无法获取 A的cookie）