---
layout: post
title:  "laravel redis"
categories: laravel
tags: laravel
---

* content
{:toc}

## laravel redis 
* 使用 php扩展 phpredis
pcel 不用多说了，很方便

* 使用 predis 包
composer require predis/predis




## 不同模式的配置
```bash
config/database.php

'redis' => [

    'client' => env('REDIS_CLIENT', 'phpredis'),

    'default' => [
        'host' => env('REDIS_HOST', '127.0.0.1'),
        'password' => env('REDIS_PASSWORD', null),
        'port' => env('REDIS_PORT', 6379),
        'database' => env('REDIS_DB', 0),
    ],

    'cache' => [
        'host' => env('REDIS_HOST', '127.0.0.1'),
        'password' => env('REDIS_PASSWORD', null),
        'port' => env('REDIS_PORT', 6379),
        'database' => env('REDIS_CACHE_DB', 1),
    ],

],
```

* client 为 phpredis 或者 predis


## 集群配置
* 在 Redis 配置文件中使用 clusters 键来定义这些集群
```bash
config/database.php

'redis' => [

    'client' => env('REDIS_CLIENT', 'phpredis'),

    'clusters' => [
        'default' => [
            [
                'host' => env('REDIS_HOST', 'localhost'),
                'password' => env('REDIS_PASSWORD', null),
                'port' => env('REDIS_PORT', 6379),
                'database' => 0,
            ],
        ],
    ],

],
```

## 参考资料

* [redis](https://seakee.top/docs/laravel6/database/redis)
