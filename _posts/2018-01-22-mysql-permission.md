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
grant all privileges on open.* to admin;
flush privileges;//刷新系统权限表
GRANT privileges ON databasename.tablename TO 'username'@'host'
```

## 撤销用户权限
```bash
命令: REVOKE privilege ON databasename.tablename FROM 'username'@'host';
说明: privilege, databasename, tablename - 同授权部分.
例子: REVOKE SELECT ON *.* FROM 'pig'@'%';
```
