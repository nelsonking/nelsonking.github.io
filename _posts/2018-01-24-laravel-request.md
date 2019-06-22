---
layout: post
title:  "laravel request"
categories: laravel
tags: laravel 持续更新
---

* content
{:toc}

## laravel Request 使用记录
### 为 request 添加参数
* 使用场景 一个字段可能对应多个数据字段
```php
$account = request()->get('account');

if (filter_var($account, FILTER_VALIDATE_EMAIL)) {
	$name = 'email';
} else {
	$name = 'phone';
}

request()->request->add([$name => $account]);

## 后台在使用 request 时就可以通过 $request->input('xxx') 获取到了
```