---
layout: post
title:  "mysql 数据库"
categories: mysql
tags: mysql
---

* content
{:toc}

## 导入数据库
```mysql
create database testdb;

use testdb;
source < ~/test_db.sql

## 直接使用mysql 方式导入
mysql -uroot -p testdb < testdb.sql
```




## 导出数据库
```mysql
mysqldump -u root -p testdb > testdb.sql
```

* 导出一个表
```mysql
mysqldump -u root -p testdb users> users.sql
```

* 导出数据结构
```mysql
mysqldump -u root -p -d --add-drop-table testdb > ~/testdb.sql
-d 没有数据 --add-drop-table 在每个create语句之前增加一个drop table
```