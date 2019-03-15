---
layout: post
title:  "使用主机和多台docker虚拟机之间建立负载均衡"
categories: docker 
tags: docker 负载均衡
---

* content
{:toc}

## 通过docker搭建nginx php环境
本文不再阐述具体操作，可产考 https://www.cnblogs.com/qinyujie/p/8532515.html

## 建立多台docker容器虚拟集群环境
* 建立容器

```bash
docker run -d -it --privileged --name server1 -p 81:80 -v /Users/nelsonking/Code/:/var/www -v /Users/nelsonking/self/docker/self_nginx/nginx.conf:/usr/local/nginx/conf/nginx.conf -v /Users/nelsonking/self/docker/self_nginx/conf.d:/usr/local/nginx/conf/conf.d 32a739d2d401
docker run -d -it --privileged --name server2 -p 82:80 -v /Users/nelsonking/Code/:/var/www -v /Users/nelsonking/self/docker/self_nginx/nginx.conf:/usr/local/nginx/conf/nginx.conf -v /Users/nelsonking/self/docker/self_nginx/conf.d:/usr/local/nginx/conf/conf.d 32a739d2d401
docker run -d -it --privileged --name server3 -p 83:80 -v /Users/nelsonking/Code/:/var/www -v /Users/nelsonking/self/docker/self_nginx/nginx.conf:/usr/local/nginx/conf/nginx.conf -v /Users/nelsonking/self/docker/self_nginx/conf.d:/usr/local/nginx/conf/conf.d 32a739d2d401
docker run -d -it --privileged --name server4 -p 84:80 -v /Users/nelsonking/Code/:/var/www -v /Users/nelsonking/self/docker/self_nginx/nginx.conf:/usr/local/nginx/conf/nginx.conf -v /Users/nelsonking/self/docker/self_nginx/conf.d:/usr/local/nginx/conf/conf.d 32a739d2d401
```




* 启动容器

```bash
docker exec -it server1 /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
docker exec -it server2 /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
docker exec -it server3 /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
docker exec -it server4 /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
```
* 容器采用的supcervisor作为守护进程启动NGINX&PHP
创建容器后，启动对应运行环境

## 主机搭建nginx
建立好之后在 nginx.conf http 代码段中添加如下
```
upstream web_docker{
        server 127.0.0.1:81 weight=4 max_fails=3 fail_timeout=10;
        server 127.0.0.1:82 weight=3;
        server 127.0.0.1:83 weight=2;
        server 127.0.0.1:84 weight=1;
}
```
在对应 server 代码段中添加如下
```
location / {
      proxy_pass http://web_docker;
      proxy_set_header   Host             $host;
      proxy_set_header   X-Real-IP        $remote_addr;
      proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
}
```

## 名词解释
>
|weight|越大，权重越高，被分配的几率越大|
|max_fails |默认为1。某台Server允许请求失败的次数，超过最大次数后，在fail_timeout时间内，新的请求将不会分配给这台机器。如果设置为0，Nginx会将这台Server置为永久无效状态，然后将请求发给定义了proxy_next_upstream, fastcgi_next_upstream, uwsgi_next_upstream, scgi_next_upstream, and memcached_next_upstream指令来处理这次错误的请求。|
|fail_timeout |默认为10秒。某台Server达到max_fails次失败请求后，在fail_timeout期间内，nginx会认为这台Server暂时不可用，不会将请求分配给它|
|backup |备份机，所有服务器挂了之后才会生效|
|max_conns |限制分配给某台Server处理的最大连接数量，超过这个数量，将不会分配新的连接给它。默认为0，表示不限制。注意：1.5.9之后的版本才有这个配置|
|hash $request_uri|按请求url的hash结果来分配请求，使每个url定向到同一个后端服务器，服务器做缓存时比较有效。|
|ip_hash | 绑定处理请求的服务器。第一次请求时，根据该客户端的IP算出一个HASH值，将请求分配到集群中的某一台服务器上。后面该客户端的所有请求，都将通过HASH算法，找到之前处理这台客户端请求的服务器，然后将请求交给它来处理。|

* supervisor守护NGINX进程，当nginx需要reload时，直接执行 nginx -s reload 就可以完成reload操作