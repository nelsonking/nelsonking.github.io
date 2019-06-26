---
layout: post
title:  "laravel 发布问题记录"
categories: laravel
tags: laravel 持续更新
---

* content
{:toc}

## Class 'Faker\Factory' not found
* In DatabaseServiceProvider.php line 78: Class 'Faker\Factory' not found
运行 composer install --no-dev 时出现

查看源码发现 时在 核心文件里引用了 开发包




解决办法

```php
vim composer.json
将 fzaninotto/faker 从 require-dev 移动到 require
## 由于 composer.locak 的存在无法将 开发包直接移动到 require 包内  
rm composer.lock
composer install
```

## 添加 env 后本地正常 服务器页面空白 返回状态码 200
* laravel 的 env 对中文的编码处理并不友好，在不同的系统上处理编码会导致不一样的问题
```php
eg : EMAIL_NAME=罗素
-> Script @php artisan package:discover --ansi handling the post-autoload-dump event returned with error code 1
# 对这个素的处理异常导致整个 env 文件无法解析导致 页面输出空白

处理办法 中文的 配置部分添加 双引号 （只能是双引号,单引号不起作用）
->  EMAIL_NAME="罗素"
```

## 多个库操作时，出现错误事物未正产回滚，回滚不完全
* DB 类在未指定库时，使用的是默认库，避免多库回滚发生问题，指定库即可

```php
DB::connection('mysql')->transaction(function(){

})
```

``` php
DB::connection('mysql')->beginTransaction();
DB::connection('mysql')->commit();
DB::connection('mysql')->rollBack();
```
* 同时，如果是多个库都有操作，请分成多个事物进行
