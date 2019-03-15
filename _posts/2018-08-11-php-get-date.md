---
layout: post
title:  "php获取今天的开始和结束时间戳"
categories: php
tags: php mktime
---

* content
{:toc}

## PHP mktime函数获取今天的开始和结束时间戳
php 获取今日、昨日、上周、本月的起始时间戳和结束时间戳的方法，主要使用到了 php 的时间函数 mktime()。

> mktime函数用法如下：mktime(hour,minute,second,month,day,year,is_dst)




### 参数描述
>
|hour  |可选|规定小时|
|minute |可选|规定分钟|
|second |可选|规定秒|
|month  |可选|规定用数字表示的月|
|day   |可选|规定天|
|year  |可选|规定年。在某些系统上，合法值介于 1901 - 2038 之间。不过在 PHP 5 中已经不存在这个限制了|
|is_dst |可选|如果时间在日光节约时间(DST)期间，则设置为1，否则设置为0，若未知，则设置为-1。（自 PHP 5.1.0 起，本参数已被废弃。应该使用新的时区处理特性来替代。)|


### 获取今日、昨日、上周、本月的起始时间戳和结束时间戳

```php
//获取今日开始时间戳和结束时间戳
$start = mktime(0,0,0,date('m'),date('d'),date('Y'));
$end = mktime(0,0,0,date('m'),date('d')+1,date('Y'))-1;
//获取昨日起始时间戳和结束时间戳
$beginYesterday = mktime(0,0,0,date('m'),date('d')-1,date('Y'));
$endYesterday = mktime(0,0,0,date('m'),date('d'),date('Y'))-1;
//获取上周起始时间戳和结束时间戳
$beginLastweek = mktime(0,0,0,date('m'),date('d')-date('w')+1-7,date('Y'));
$endLastweek = mktime(23,59,59,date('m'),date('d')-date('w')+7-7,date('Y'));
//获取本月起始时间戳和结束时间戳
$beginThismonth=mktime(0,0,0,date('m'),1,date('Y'));
$endThismonth=mktime(23,59,59,date('m'),date('t'),date('Y'));
```


