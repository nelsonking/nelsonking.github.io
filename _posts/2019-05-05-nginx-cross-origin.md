---
layout: post
title:  "nginx cross origin"
categories: nginx
tags: nginx
---

* content
{:toc}
### nginx 跨域设置
```bash
location / {  
    # 允许跨域
    add_header Access-Control-Allow-Origin *;
    # 允许的请求方法
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    # 允许的请求头
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

    # 可在客户端被读取的返回头
    Access-Control-Expose-Headers:'User-Token'

    # 一般前端框架会在接口请求前走一遍 options 方法，默认都返回 204
    # 204 (No Content)响应
    # 205 在接受了浏览器POST请求以后处理成功以后, 告诉浏览器, 执行成功了, 请清空用户填写的Form表单, 方便用户再次填写,
    if ($request_method = 'OPTIONS') {
        return 204;
    }
} 
```




### 前端框架获取请求头问题
起因 前端请求框架 axios 获取 http 返回头结果如下
```bash
Object {
    content-type:"application/json"
}
```
* 没有打印出所有的服务端返回结果  


#### 浏览器能访问的响应头如下
```bash
Cache-Control
Content-Language
Content-Type
Expires
Last-Modified
Pragma
```

* 如果想让浏览器能访问到其他的 响应头的话 需要在服务器上设置 Access-Control-Expose-Headers

```bash
Access-Control-Expose-Headers:'User-Token'
```

