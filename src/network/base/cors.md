# 跨域

仅针对 XHRHttpRequest
## 同源策略

协议+域名+端口都匹配，才认为是同源

 ## 浏览器对跨域的处理

 1. 简单请求：先发送，再判断是否跨域

 * Method 为：GET/POST/HEAD
 * Content-type: text/plain,multipart/form-data,application/x-www-form-urlencoded

 2. 非简答请求：先发 OPTIOINS，再发请求

 * 发送 
 access-control-request-headers: content-type
 access-control-request-method: METHOD 
 
 给服务器
 
 * 回复

access-control-allow-headers: x-requested-with,content-type
access-control-allow-methods: POST
access-control-allow-origin: *
access-control-max-age: 600

给浏览器，max-age 为缓存，600s内不再重复发送

## 跨域带cookie

1. SameSite: none
2. Secure: true
3. set XHRHttpRequest.withCredentials=true
4. server response => access-control-allow-credentials: true
