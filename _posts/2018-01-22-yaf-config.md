---
layout: post
title:  "yaf配置文件说明"
categories: yaf
tags: yaf
---

* content
{:toc}

## yaf配置文件说明

* 开启命名空间
yaf.use_namespace=1

* 设置当前运行环境
yaf.environ=develop

* 开发环境配置
```nginx
[develop : common]
application.debug = 1
application.showErrors = 1
application.throwException = 1
application.dispatcher.catchException = 1
application.dispatcher.throwException = 1
```