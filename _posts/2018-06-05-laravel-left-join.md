---
layout: post
title:  "laravel leftJoin 多个条件"
categories: laravel 
tags: php laravel leftJoin
---

* content
{:toc}

在laravel中使用leftJoin添加多个条件时，如select a.* from a left join b on a.id = b.pid and b.status = 1这种类似sql，发现框架自身封装的leftJoin不支持多个参数传递（当然可用写原生sql）

## laravel框架自身封装的leftJoin方法如下：
```php
    public function leftJoin($table, $first, $operator = null, $second = null)
    {
        return $this->join($table, $first, $operator, $second, 'left');
    }
```




* 浏览下 \vendor\laravel\framework\src\Illuminate\Database\Query\Builder.php文件，发现join方法可用实现自己想要的left join携带多参数。laravel自身的join方法如下：

```php 
public function join($table, $one, $operator = null, $two = null, $type = 'inner', $where = false)
    {
        // If the first "column" of the join is really a Closure instance the developer
        // is trying to build a join with a complex "on" clause containing more than
        // one condition, so we'll add the join and call a Closure with the query.
        if ($one instanceof Closure) {
            $join = new JoinClause($type, $table);

            call_user_func($one, $join);

            $this->joins[] = $join;

            $this->addBinding($join->bindings, 'join');
        }

        // If the column is simply a string, we can assume the join simply has a basic
        // "on" clause with a single condition. So we will just build the join with
        // this simple join clauses attached to it. There is not a join callback.
        else {
            $join = new JoinClause($type, $table);

            $this->joins[] = $join->on(
                $one, $operator, $two, 'and', $where
            );

            $this->addBinding($join->bindings, 'join');
        }

        return $this;
    }
```

### 当左右连接携带多条件时，可以这样写：
```php
DB::table('app_a as a')
->join('app_b as b',function($join){
    $join->on('a.id','=','b.goodId')
        ->where('b.status','=','SUCCESS')
        ->where('b.type','=','UNLOCK');
}, null,null,'left')
->where('a.id','>',1)
->get();

// 当join不传left时，默认是inner。

//相当于
SELECT * FROM app_a as a 
LEFT JOIN app_b as b on a.id = b.goodId 
and b.status = 'SUCCESS' and b.type = 'UNLOCK' 
where a.id > 1;
```

