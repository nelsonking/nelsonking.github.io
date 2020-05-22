---
layout: post
title:  "nginx rewirte and variable"
categories: nginx
tags: nginx
---

* content
{:toc}
### nginx 变量
起因
```bash
## 访问/good.html?id=111 跳转到 /good/111
## 第一版
rewrite ^good.html\?(\d+)$ /good/$1 redirect
## 不生效 
```
* 地址上 ？ 后面的数据会被nginx 处理为内置变量 $query_string


 


### 修改版本
```bash
rewrite ^good.html /good/$1 redirect
## so 怎么获取参数 $args['id'] ? 不行 开始爬文档
```

### 内置变量
```bash
$arg_PARAMETER #这个变量包含GET请求中，如果有变量PARAMETER时的值; (敲黑板，这个就是痛点) 
$args          #这个变量等于请求行中(GET请求)的参数，例如foo=123&bar=blahblah; 
$is_args       #如果$args设置，值为"?"，否则为""。
$query_string  #与$args相同，二者的区别是args可以修改，query_string只读；
$binary_remote_addr #二进制的客户地址。
$body_bytes_sent #响应时送出的body字节数数量。即使连接中断，这个数据也是精确的。
$content_length #请求头中的Content-length字段。
$content_type #请求头中的Content-Type字段。
$cookie_COOKIE #cookie COOKIE变量的值
$document_root #当前请求在root指令中指定的值。
$document_uri #与$uri相同。
$host #请求主机头字段，否则为服务器名称。
$hostname #Set to the machine’s hostname as returned by gethostname
$http_HEADER
$is_args #如果有$args参数，这个变量等于”?”，否则等于”"，空值。
$http_user_agent #客户端agent信息
$http_cookie #客户端cookie信息
$limit_rate #这个变量可以限制连接速率。
$request_body_file #客户端请求主体信息的临时文件名。
$request_method #客户端请求的动作，通常为GET或POST。
$remote_addr #客户端的IP地址。
$remote_port #客户端的端口。
$remote_user #已经经过Auth Basic Module验证的用户名。
$request_completion #如果请求结束，设置为OK. 当请求未结束或如果该请求不是请求链串的最后一个时，为空(Empty)。
$request_method #GET或POST
$request_filename #当前请求的文件路径，由root或alias指令与URI请求生成。
$request_uri #包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。不能修改。
$scheme #HTTP方法（如http，https）。
$server_protocol #请求使用的协议，通常是HTTP/1.0或HTTP/1.1。
$server_addr #服务器地址，在完成一次系统调用后可以确定这个值。
$server_name #服务器名称。
$server_port #请求到达服务器的端口号。
$uri #不带请求参数的当前URI，$uri不包含主机名，如”/foo/bar.html”。该值有可能和$request_uri 不一致。$request_uri是浏览器发过来的值。该值是rewrite后的值。例如做了internal redirects后。

```

### 修改版本
```bash
rewrite ^good.html /good/$arg_id redirect
## 生效了也参数也加上了，但是
-> /good/111?id=111 
## what ? 怎么又来一次id=111
```

### 查看重定向规则
> * rewrite 转发只能匹配uri，无法匹配参数；如果要匹配参数需要用 if 语句匹配参数，然后进行重定向；
> * 默认的情况下，Nginx在进行rewrite后都会自动添加上旧地址中的参数部分，而这对于重定向到的新地址来说可能是多余。
> * 如果不想加旧地址中的参数，可以在rewrite中使用“?” (这里就是问题的关键)

### 最终版本
```bash
rewrite ^good.html /good/$arg_id? redirect
-> /good/111 
``` 
