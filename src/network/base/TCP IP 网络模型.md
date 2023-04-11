# TCP IP 网络模型

## 四层模型

### 1. 应用层(Application Layer)
* enable://proxyHost proxy://127.0.0.1:12639

# 计费
/\/qcloud\/tea\/app\/tsearch-buy(\.(zh|en|jp|ko|dev))?(\.\w{10})?\.(js|css|ttf)(\.map)?/ http://127.0.0.1:8323/tsearch-buy.$4$5
/\/qcloud\/tea\/app\/tsearch-buy/__webpack_hmr$/ http://127.0.0.1:8323/__webpack_hmr
/\/qcloud\/tea\/app\/tsearch-buy.tsearch-buy(.+)?(\.\w+)\.(hot-update\.(js|json))$/ http://127.0.0.1:8323/tsearch-buy.tsearch-buy$2.$3
/\/qcloud\/tea\/app\/tsearch-buy.singltsearchtyleFile(.+)?(\.\w+)\.(hot-update\.(js|json))$/ http://127.0.0.1:8323/tsearch-buy.singltsearchtyleFile$2.$3
/\/qcloud\/tea\/app\/tsearch-buy(.+)?(\.\w+)\.(hot-update\.(js|json))$/ http://127.0.0.1:8323/tsearch-buy$2.$3

# 控制台侧代理
/\/qcloud\/tea\/app\/tsearch(-(\w+))?(\.(zh|en|jp|ko|dev))?(\.\w{10})?\.(js|css|ttf)(\.map)?/ http://127.0.0.1:8322/tsearch$1.$6$7
/\/qcloud\/tea\/app\/(.+\/)?__webpack_hmr$/ http://127.0.0.1:8322/__webpack_hmr
/\/qcloud\/tea\/app\/(.+\.)?(\w+)\.(hot-update\.(js|json))$/ http://127.0.0.1:8322/$1$2.$3

cloudcache.tencent-cloud.cn/qcloud/vendors/react/react16.production.js cloudcache.tencent-cloud.com/qcloud/vendors/react/react-17.0.2.development.js

127.0.0.1 insight.cloud.tencent.com

如：Http/Ftp/Telnet/DNS/SMTP 等

### 2. 传输层(Transport Layer)

有两个协议： TCP/UDP

* TCP - 可靠协议，比UDP多了很多特性，如流量控制、超时重传、拥塞控制等
* UDP - 非可靠协议，只负责发送，不管是否接收

当包大过MSS（TCP最大报文段长度），则会将数据分块，这样即使其中一个包丢了，只需要重发这一个包即可。

TCP 中每个分块称为一个 TCP 段（TCP Segment）

传输层发送给应用层时，由于可能会有多个应用，所以需要端口号。

通常 80 是 web服务，22是远程登录服务器，浏览器中每个Tab都是一个独立的进程，会分配临时端口号

### 3. 网络层

