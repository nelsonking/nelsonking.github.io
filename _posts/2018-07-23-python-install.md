---
layout: post
title:  "python 源码安装"
categories: php 
tags: python 源码安装
---

* content
{:toc}

## python 源码安装

### 依赖包安装
```shell
yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
 libffi-devel
```





### 编译参数
```shell
wget https://www.python.org/ftp/python/3.8.0/Python-3.8.0.tar.xz

tar -xvJf Python-3.8.0.tar.xz

cd Python-3.8.0/

make clean

./configure --prefix=/usr/local/python3

make && make install

ln -s /usr/local/python3/bin/pip3 /usr/local/bin/
ln -s /usr/local/python3/bin/python3 /usr/local/bin/
```