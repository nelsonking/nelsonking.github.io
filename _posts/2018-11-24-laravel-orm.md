---
layout: post
title:  "laravel orm"
categories: laravel
tags: laravel orm
---

* content
{:toc}

## laravel ORM 关系记录


### hasManyThrough
表结构如下
```
countries
    id - integer
    name - string

users
    id - integer
    country_id - integer
    name - string

posts
    id - integer
    user_id - integer
    title - string
```    

* 目的获取城市下的文章 

```php
class Country extends Model
{
    public function posts()
    {
        return $this->hasManyThrough(
            'App\Post',    // related        远程关联的表
            'App\User',    // through        中间表
            'country_id',  // firstKey       当前表 和 中间表 的关联关系 取 中间表的键
            'user_id',     // secondKey      中间表 和 远程表 的关联关系 取 远程表的键
            'id',          // localKey       当前表 和 中间表 的关联关系 取 当前表的键
            'id'           // secondLocalKey 中间表 和 远程表 的关联关系 取 中间表的键
        );
    }
}
```    

* 关联关系摘自 https://learnku.com/docs/laravel/5.8/eloquent-relationships/3932#has-many-through
* 由于localKey 和 secondLocalKey 在不同的表模型中可能会存在多种键，所以补充了关联关系，方便记忆
* 当前 -> 中间 -> 远程  （两个关系处理两次共计4个参数）