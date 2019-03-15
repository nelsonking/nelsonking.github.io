---
layout: post
title:  "laravel 使用记录"
categories: laravel
tags: laravel
---

* content
{:toc}

## laravel 使用记录
* 如何获取数据流
```
Request::getContent();
```




* 添加队列任务
```
//首先，通过artisan创建一个队列命令：
php artisan make:command SendEmail --queued
```

* 获取模型原始值
```
$mode->getOriginal();
```

* 一主多从
```
  'mysql' => [  
      'driver'   => 'mysql',  
      'write'    => [  
          'host' => '192.168.1.180',  
      ],  
      'read'     => [  
          ['host' => '192.168.1.182'],  
          ['host' => '192.168.1.179'],  
      ],  
  ]  
```

* 强制读主
```
	// 强制走主库
  $webinarExtendObj = new WebinarExtends();
  $webinarExtendObj->setConnection('master_write');
```

* 在laravel模板中声明变量
```
// 在app\Providers\AppServiceProvider.php 中引入 Blade
// 在BOOT方法中添加
Blade::extend(function($value) {
    return preg_replace('/\@var(.+)/', '<?php ${1}; ?>', $value);
});
@var $nameIndex = isset($listInput['name']) ?  $listInput['name'] : $listName;
```

* with 查询固定字段用法 查询特殊字段
```
->with(['usersExtra'=>function($query){
                $query->select('uid','alipay_name');
            }]);
```

* 在类中使用中间件
```
 $this->middleware('auth', ['except' => ['index'，'show']]);
```