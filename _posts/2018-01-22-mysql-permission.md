---
layout: post
title:  "mysql 用户权限"
categories: mysql
tags: mysql
---

* content
{:toc}

## 授权用户
```bash
## 用法
GRANT privileges ON database_name.table_name TO 'user_name'@'host'

## 授权所有权限
jgrant all privileges on database_name.* to `user_name`@'192.168.1.%'
flush privileges;//刷新系统权限表

## 示例
### 清除指定用户的所有库的所有权限 （当有权限划分时，创建用户后先执行这个）
GRANT USAGE ON *.* TO 'user_name'@'192.168.1.%' ;

### 授权指定库的指定权限到指定用户
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, CREATE TEMPORARY TABLES ON `database_name`.* TO 'user_name'@'192.168.1.%' ;

### 授权指定库的指定权限到指定用户
GRANT SELECT, INSERT, UPDATE, DELETE ON `database_name`.* TO 'user_name'@'192.168.1.%';

flush privileges;//刷新系统权限表
```






## 撤销用户权限
```bash
命令: REVOKE privilege ON databasename.tablename FROM 'username'@'host';
说明: privilege, databasename, tablename - 同授权部分.
例子: REVOKE SELECT ON *.* FROM 'pig'@'%';
```
