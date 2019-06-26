---
layout: post
title:  "laravel orm"
categories: laravel
tags: laravel orm
---

* content
{:toc}

## laravel ORM 关系记录
### 表结构
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
    
user_posts
	user_id
	posts_id    
```    



### with
渴求式加载,缓解了1+N的查询问题，仅需1+1次查询就能解决问题，对查询速度有了质的提升。
```php
// 加载多个关联
User::with(['country','posts'])->get();

// 嵌套预加载
Country::with('user.post')->get();

// 预加载指定列
User::with('post:id,title')->get();
```


### has
基于关联关系去过滤模型的查询结果，所以它的作用和where条件非常相似。至少存在一个关联关系才能被查询出来。
* 你还可以使用”.“来构造嵌套has语句。
```php
Country::has('users.posts').get();
```

### whereHas
方法的原理基本和has()方法相同，但是他允许你自己添加对这个模型的过滤条件。
```php
Country::whereHas('users', function($query){
	$query->wehre('name','like','%'.xxx.'%')
}).get();
``` 

### withCount
* 5.3 版本后
* 顾名思义可以统计关联模型的数量
```php
Country::withCount('users'); // 统计总数
Country::withCount(['users' => function($query){
	$query->where('name','like','%'.xxx.'%')
}]); // 按需统计

```


### hasManyThrough
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


### 关联模型添加/更新
```php
// 添加关联
attch
$userObj->posts()->attach($postsObj)
$userObj->posts()->attach([$posts_id, $posts_id_2])
$userObj->posts()->save($postsObj) // save 只支持 对象形式

// 同步关联
sync
$userObj->posts()->sync($postsObj)
$userObj->posts()->sync([$posts_id, $posts_id_2])
```