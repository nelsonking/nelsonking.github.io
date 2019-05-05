---
layout: post
title:  "laravel 发布问题记录"
categories: laravel
tags: laravel
---

* content
{:toc}

## laravel 发布问题记录
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