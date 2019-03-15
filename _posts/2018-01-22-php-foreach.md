---
layout: post
title:  "php foreach怪现象"
categories: php
tags: php foreach
---

* content
{:toc}

## foreach 在参数使用引用后输出结果问题
```php
$a = array ('zero','one','two', 'three');
foreach ($a as &$v) {}
foreach ($a as $v) {}
dump($array);

array:4 [▼
  0 => "zero"
  1 => "one"
  2 => "two"
  3 => & "two"
]
```




* 这里输出的是 zero one two two
* 所有最后一个输出的使用它的上一位
* 障眼法这里主要是对引用的理解,可以看下面下面的分解

```php
$array = ['zero', 'one', 'two', 'three'];
$value = &$array[3];
// foreach 的作用如上
// $value 现在是$array[3]的地址
$value = 100;
// 相当于 $array[3] 的内存地址为 100

dump($array);

array:4 [▼
  0 => "zero"
  1 => "one"
  2 => "two"
  3 => & 100
]
```