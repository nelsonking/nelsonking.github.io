---
layout: post
title:  "mysql 字段长度记录"
categories: mysql
tags: mysql
---

* content
{:toc}

## 整数数据类型

|数据类型|描述|存储| 默认长度|
| ------ | ------ | ------ | ------ |
| tinyint| 0 ~ 255 | 1 字节| 4 |
| smallint | -32,768 ~ 32,767| 2 字节 | 6| 
| int|-2,147,483,648 ~ 2,147,483,647| 4 字节 |11|
| bigint|-9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807| 8 字节 |20| 





> 换算关系
> * tinyint 1 字节 => 1B => 8b => 2^8 [256 - 1(0 站位)] => 0 ~ 255 

* 整数数据类型的长度 M 与你存放的数值型的数的大小无关.
* 长度 M也就是 创建表时 int(11) 的11 指示最大显示宽度。显示宽度与存储大小或类型包含的值的范围无关。

### 显示宽度有何意义？
类似按长度补全时，例如 长度是 4，实际 值是 1 那么 mysql 记录的为 0001
这个显示宽度在其范围内是是有意义的

 