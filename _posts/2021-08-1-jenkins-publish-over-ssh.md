---
layout: post
title:  "Jenkins publish over ssh"
categories: jenkins
tags: jenkins
---

* content
{:toc}

## jenkins 发布相关问题记录
publish over ssh 相关问题汇总





## 问题排查
### Exec exit status not zero. Status [-1]
* Jenkings error: Exec exit status not zero. Status [-1] when I try to run npm install in the exec command
提示这个语句时，往往没有其他任何提示，问题很难排查

在构建时，可以在 SSH SERVER 高级下面把 Verbose output in console 打开
其作用是输出更多有用信息，更易于排查问题
