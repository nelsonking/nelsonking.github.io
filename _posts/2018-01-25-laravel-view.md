---
layout: post
title:  "laravel view"
categories: laravel
tags: laravel 持续更新
---

* content
{:toc}

## laravel view 使用记录
### 公共模板 赋值变量
```php
App\Providers\AppServiceProvider
View()->composer('common.header',function ($view){
 //common.header 对应Blade模板 
 $view->with('key', 'value'); 
});
```

```php
View()->share('key', 'value');
```
