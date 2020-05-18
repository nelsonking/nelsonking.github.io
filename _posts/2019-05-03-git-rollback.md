---
layout: post
title:  "git rollback"
categories: git
tags: git
---

* content
{:toc}
### git 回滚
git 有两个回滚方式，一种是消灭历史回滚 git reset xxxx
一种是保留历史 git revert xxx




#### git reset
```bash
git reset --soft hash_id 
git push --force
```
-- soft 的回滚方式会将版本库回滚，回滚版本后的修改文件将变为待提交状态。一般用户本地回滚


```bash
git rest --hard hash_id
git push --force
```
-- had 的回滚方式将版本库回滚，同时恢复版本后修改的所有文件为版本内容。 一般用于服务端事故回滚

* 版本库回滚后，其他仓库如何强制和服务端保持一致的方法
```bash
git fetch --all
git reset --hard origin/branch_xxx
git pull
```

#### git revert
git revert 用于反向操作某一个版本，例如当前分支和需要回滚的分支差距如下
```bash
- test.txt hash 123456
1
2
3

- test.txt hash 12345
1
3
```

现将 test 由 123456 回滚到 12345
```bash
git revert -n -m 1 12345
git commit -m 'git revert 12345'
git push 
```

操作完毕提交的信息为 
```bash
- test.txt
----- line 2
```
作为一个新的提交，提交到版本仓库，仓库有完整的提交历史。 一般用户需要保存历史操作的回滚

-n 反向操作不直接提交
-m 指定父级别编号
```bash
git show --format="%P" 12345
```
通过这条命令可以查出要选择的父节点，通常父节点就是 1

https://git-scm.com/docs/git-revert


