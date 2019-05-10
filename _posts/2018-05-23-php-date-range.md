---
layout: post
title:  "php 获取一段时间内的天数"
categories: php 
tags: php
---

* content
{:toc}

## php 获取一段时间内的天数




```php
function getDateRange($startDate, $endDate){
	$startTimeStamp = strtotime($startDate);
	$endTimeStamp = strtotime($endDate);

	// 计算日期段内有多少天
	$days = ($endTimeStamp-$startTimeStamp) / 86400;

	// 保存每天日期
	$date = array();

	for($i=0; $i<$days; $i++){
		$date[] = date('Y-m-d', $startTimeStamp+(86400*$i));
	}

	return $date;
}

$list = getDateRange('2018/01/01', '2018/01/03);

/**
 * $list 如下 
 * [2018-01-01,2018-01-02,2018-01-03]
 */ 

```