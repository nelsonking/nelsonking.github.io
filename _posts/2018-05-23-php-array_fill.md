---
layout: post
title:  "php 获取一段时间内的天数"
categories: php 
tags: php
---

* content
{:toc}

## php 数据填充 




```php
$array = [];
$array = array_fill(0, 5, 0);

//    array:5 [▼
//      0 => 0
//      1 => 0
//      2 => 0
//      3 => 0
//      4 => 0
//    ]

$array = ['A' => 1, 'B' => 0, 'C' => 1, 'D' => 0];
// 保留建填充值为 0
$array = array_fill_keys(array_keys($array), 0);

//    array:4 [▼
//      "A" => 0
//      "B" => 0
//      "C" => 0
//      "D" => 0
//    ]

```
