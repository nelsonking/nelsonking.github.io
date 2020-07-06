---
layout: post
title:  "mysql time"
categories: mysql
tags: mysql
---

* content
{:toc}


## MySQL 时区修改 

Mysql 默认使用 系统时区，所以修改mysql 时区有两种方案，

* sql 直接修改时间

```bash
show variables like '%time_zone%';
set time_zone='+8:00';
show variables like '%time_zone%';
select now();
```





* 修改系统时间 为 CST

```bash
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
