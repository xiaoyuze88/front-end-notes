# iframe

父站 parent，子站 child

## 阻止自己被别人嵌到iframe中

1. cookie SameSite,不同源则parent打开child后 child 中无法使用 cookie

2. X-Frame-Options（deprecated）
选项：
* DENY
* SAMEORIGIN
* Allow-From: http://some.parent.com

3. Content-Security-Policy(CSP)

Content-Security-Policy: frame-ancestors none; // 不允许任何网站嵌我
Content-Security-Policy: frame-ancestors self some.parent.com; // 允许我同源的和 someparent.com 嵌我

4. JS判断

window.top === window.self;

## 阻止嵌入的child操作parent，sandbox属性

<iframe sandbox/>

sandbox="一堆属性"，打开一项就支持一项