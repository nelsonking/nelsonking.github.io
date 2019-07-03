---
layout: post
title:  "mysql 安装"
categories: mysql
tags: mysql
---

* content
{:toc}

## mysql 小内存机器安装
* mysql5.9以上的版本，编译安装需要1G内存

```shell
dd if=/dev/zero of=/data/swap_add bs=1M count=2048
mkswap /data/swap_add
swapon /data/swap_add
swapon -s
```



## mysql 编译过慢
```shell
make -j 4
make instlal -j 4

# -j 后加内核数

优点：速度快会相对提高很多
缺点：消耗大量CPU，内存资源。
```
