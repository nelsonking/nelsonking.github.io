---
layout: post
title:  "nginx访问日志统计"
categories: nginx
tags: nginx访问日志统计
---

* content
{:toc}
在数据没有上ELK之间，nginx 的 access log 是一个很好的日志去统计公司的一些留存信息

## nginx 访问日志统计




### 根据访问IP统计UV
awk '{print $1}'  access.log|sort | uniq -c |wc -l

### 统计访问URL统计PV

awk '{print $7}' access.log|wc -l
### 查询访问最频繁的URL

awk '{print $7}' access.log|sort | uniq -c |sort -n -k 1 -r|more
### 查询访问最频繁的IP

awk '{print $1}' access.log|sort | uniq -c |sort -n -k 1 -r|more

### 根据时间段统计查看日志
cat  access.log| sed -n '/14\/Mar\/2015:21/,/14\/Mar\/2015:22/p'|more