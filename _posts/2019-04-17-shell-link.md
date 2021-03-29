---
layout: post
title:  "linux shell"
categories: shell link
tags: shell
---
* content
  {:toc}

### ln 软链接的绝对路径和相对路径详解

* 源文件的路径 是根据软链接的路径来计算的，而不是根据当前路径来计算的

* Linux链接，可以分为硬链接与软链接；本文主要介绍软链接。（默认情况下，ln命令产生硬链接）
> 软链接文件类似于Windows的快捷方式，但实际上是一个特殊的文件。
> 在软连接中，文件实际上是一个文本文件，其中包含另一文件的位置信息。
> 允许软链接指向位于其他分区、甚至是其他网络硬盘上的某个文件。




#### ln命令

语法：
ln -s 源文件路径 软链接文件路径

参数	功能
-b	删除，覆盖以前建立的链接
-d	允许超级用户制作目录的硬链接
-f	强制执行
-i	交互模式，文件存在则提示用户是否覆盖
-n	把符号链接视为一般目录
-s	软链接(符号链接)
-v	显示详细的处理过程

#### 示例

```bash
# 使用绝对路径
ln -s /usr/local/Cellar/php/7.4.9/sbin/php-fpm /usr/local/bin/
ll /usr/local/bin/
/usr/local/bin/php-fpm -> /usr/local/Cellar/php/7.4.9/sbin/php-fpm

# 这里切换到目标目录，以此为相对目录写地址，不切到目标目录，也需要根据目标地址去写
cd /usr/local/bin
ln -s ../../Cellar/php/7.4.9/sbin/php-fpm ./

```
