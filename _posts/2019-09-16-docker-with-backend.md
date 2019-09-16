---
layout: post
title:  "使用 docker 集成开发环境"
categories: docker 
tags: docker 集成环境
---

* content
{:toc}
本文旨在快速搭建开发环境，并减少后期因应用版本变更的维护成本，和公共配置文件的通用性， 
避免相同配置每个开发人员都去实现一次

* 项目地址 https://github.com/nelsonking/docker_with_backend

## 项目目录
```bash
bin/     # 常用命令
install/ # 安装命令 
mongo/   # mongo 配置文件 和 库文件
mysql/   # mysql 配置 和 数据库文件
nginx/   # nginx 配置文件
README.MD  
redis/   # redis 的配置文件和持久化文件
source/  # 安装源文件 这里统一放到百度云地址为  https://pan.baidu.com/s/1VNa0FWvl-CjMLyzZt_jUpg  提取码: remq 
   ```




* 其中配置文件已经归入版本控制，数据库文件等 容器运行产生的文件全部忽略

##  开启安装
首先下载安装windows docker 可通过官网下载，也可通过下文提供的百度网盘下载。
安装后，docker 目前的版本会自动配置 windows 的虚拟机 （会要求重启），安装后，开启docker 的目录共享

```bash
鼠标右击 docker 右下角角标 
-> settings 
-> Shared Drives 
-> 勾选需要共享的目录 （比如配置和项目都放到 F 盘，那么我就勾选 F）
-> Apply
```

### 载入镜像
方式分为两种，
* 运行 docker pull 速度快的同学可以直接 运行下列命令
```bash
docker pull php:7.1-fpm
docker pull nginx:latest
docker pull mongo:latest
docker pull mysql:5.7
docker pull centos:latest
docker pull redis:3.2
```
* 运行速度不快的，可通过这个地址下载所有上诉镜像
```bash
https://pan.baidu.com/s/1VNa0FWvl-CjMLyzZt_jUpg  提取码: remq 
# 所有文件下载完毕后统一放入 source 目录下，然后执行下面的命令
./install/load_images.sh
```

* 上述命令执行完毕后会出现下列情况，就可以继续往下面走了
```bash
$ $ docker  images
php                 7.1-fpm             9e5aa36761ac        13 days ago         392MB
nginx               latest              5a3221f0137b        4 weeks ago         126MB
mongo               latest              cdc6740b66a7        4 weeks ago         361MB
mysql               5.7                 e1e1680ac726        4 weeks ago         373MB
centos              latest              9f38484d220f        6 months ago        202MB
redis               3.2                 87856cc39862        11 months ago       76MB
```

### 安装应用
* 我们以php 和 nginx 的安装为例

```bash
cd install
cat php_nginx.sh
#!/bin/bash
source ./common.sh

# 检查容器是否安装，并删除已安装的容器
check_container php
check_container nginx

# 代码共享配置 (需要变更为真实环境)
code_dir="D:/Code"
code_dir_map="-v $code_dir:/web"

# nginx 共享配置 (需要变更为真实环境)
nginx_config="D:/Code/docker/nginx/nginx.conf"
nginx_config_d="D:/Code/docker/nginx/conf.d"

nginx_config_map="-v $nginx_config:/etc/nginx/nginx.conf -v $nginx_config_d:/etc/nginx/conf.d"
nginx_port_map="-p 80:80 -p 443:443"

# 安装php
$docker_run php $code_dir_map $use_network_alias php php:7.1-fpm

# 安装nginx
$docker_run nginx $code_dir_map $nginx_config_map $nginx_port_map $use_network_alias nginx nginx:latest
```

* 这里我们只需要修改 code_dir nginx_config nginx_config_d 这三个变量为本机配置即可

* 然后执行 php_nginx.sh 即可。
```bash
./php_nginx.sh
network sharenetwork has been created
container php will be create
container nginx will be create
6f99a6d80740da9b56ab22bd4074ff8dd138287982524cddb49ff1492278b7a9
1b2211ef8dec084ddcd942e107260b3a18083ff811a6a83093c8ffcff0eb383c
```

*  按上面命令显示结果，那么php 和 nginx 就已经安装完毕了，可通过命令查看详情
```bash
$ ../bin/docker_info.sh
CONTAINER ID                                                       IMAGE               COMMAND                           CREATED              STATUS              PORTS                                      NAMES
1b2211ef8dec084ddcd942e107260b3a18083ff811a6a83093c8ffcff0eb383c   nginx:latest        "nginx -g 'daemon off;'"          About a minute ago   Up About a minute   0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   nginx
6f99a6d80740da9b56ab22bd4074ff8dd138287982524cddb49ff1492278b7a9   php:7.1-fpm         "docker-php-entrypoint php-fpm"   About a minute ago   Up About a minute   9000/tcp                                   php
```

* 镜像包含了 nginx php redis mongo mysql centos，可按照自己的需求去扩展

