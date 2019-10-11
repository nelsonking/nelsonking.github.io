---
layout: post
title:  "docker 容器应用安装扩展"
categories: docker 
tags: docker 容器应用安装扩展
---

* content
{:toc}
接上一篇文章，docker 在下载的官方镜像一般为最小化安装，当我们使用某些扩展时，
需要对应用安装扩展，这里安装的主要方式是通过查文档 ~ ~

这里： https://docs.docker.com/samples/library/php/




### 如何安装 
比如我们要安装php的扩展，镜像内已经提供了一些安装扩展的方法。如下。

```bash
## PHP Core Extensions
FROM php:7.2-fpm
RUN apt-get update && apt-get install -y \
		libfreetype6-dev \
		libjpeg62-turbo-dev \
		libpng-dev \
	&& docker-php-ext-install -j$(nproc) iconv \
	&& docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
	&& docker-php-ext-install -j$(nproc) gd
```
* 通过这段我们知道如果安装 gd 扩展，并知道如何重新编译 php，提取代码如下

```bash
docker exec -it php bash

apt update                                                         #更新软件源
apt install -y libwebp-dev libjpeg-dev libpng-dev libfreetype6-dev #安装各种库
docker-php-source extract                                          #解压源码
cd /usr/src/php/ext/gd                                             #gd源码文件夹
docker-php-ext-configure gd --with-webp-dir=/usr/include/webp --with-jpeg-dir=/usr/include --with-png-dir=/usr/include --with-freetype-dir=/usr/include/freetype2   #准备编译
docker-php-ext-install gd                                          #编译安装
```

* 同上我们去安装 pdo & zip 扩展

```bash
docker exec -it php bash

/usr/src/php/ext/
wget http://pecl.php.net/get/zip-1.13.5.tgz
tar -zvxf zip-1.13.5.tgz
cd zip-1.13.5
docker-php-ext-install zip

docker-php-ext-install pdo pdo_mysql
```

* 安装debug & redis 扩展

```bash
FROM php:7.2-cli
RUN pecl install redis-4.0.1 \
	&& pecl install xdebug-2.6.0 \
	&& docker-php-ext-enable redis xdebug

docker exec -it php bash

pecl install redis-4.0.1
pecl install xdebug-2.6.0
docker-php-ext-enable redis xdebug
```

* 多看文档，会节省很多时间~