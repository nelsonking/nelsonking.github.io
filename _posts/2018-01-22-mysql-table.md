---
layout: post
title:  "mysql 数据表"
categories: mysql
tags: mysql
---

* content
{:toc}

## 清空数据表
```mysql
TRUNCATE TABLE name
```
* 速度快,而且效率高,在功能上与不带 WHERE 子句的 DELETE 语句相同.二者均删除表中的全部行。
* TRUNCATE TABLE 比 DELETE 速度快，且使用的系统和事务日志资源少。
* DELETE 语句每次删除一行，并在事务日志中为所删除的每行记录一项。
* TRUNCATE TABLE 通过释放存储表数据所用的数据页来删除数据，并且只在事务日志中记录页的释放。
* 对于由 FOREIGN KEY 约束引用的表，不能使用 TRUNCATE TABLE，而应使用不带 WHERE 子句的 DELETE 语句。由于 TRUNCATE TABLE 不记录在日志中，所以它不能激活触发器。






## 清空多个数据表
```php
SELECT concat('DROP TABLE IF EXISTS ', table_name, ';')
FROM information_schema.tables
WHERE table_schema = 'mydb';
```
* 然后运行结果集就全部清空了 mydb 换成需要处理的库
