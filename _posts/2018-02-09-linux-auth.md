---
layout: post
title:  "linux auth"
categories: linux 
tags: linux
---

* content
{:toc}

## linux 权限相关的记录
* 三个用户文件

```bash
cat /etc/passwd
www:x:1000:1000::/home/www:/bin/bash
  
cat /etc/shadow
www:!:18221:0:99999:7:::

cat /etc/group
www:x:1000:git
```





### /etc/passwd 
* 是系统识别用户的一个文件，系统所有的用户都在这里有登录记载；
当我们以 root 这个账号登录时，系统首先会查阅 /etc/passwd 文件，看是否有 www 这个账号，然后确定 www 的UID.
通过UID 来确认用户和身份，如果存在则读取 /etc/shadow 影子文件中所对应的 www 的密码；如果密码核实无误则登录系统，读取用户的配置文件
```bash
www:x:1000:1000::/home/www:/bin/bash

第一字段：用户名（也被称为登录名）；在上面的例子中，我们看到这两个用户的用户名分别是 www 和linuxsir；
第二字段：口令；在例子中我们看到的是一个x，其实密码已被映射到/etc/shadow 文件中；
第三字段：UID ；请参看本文的UID的解说；
第四字段：GID；请参看本文的GID的解说；
第五字段：用户名全称，这是可选的，可以不设置；
第六字段：用户的家目录所在位置；www 这个用户是/home/www 
第七字段：用户所用SHELL 的类型，设置为/bin/bash
```

* UID
UID 是用户的ID 值，在系统中每个用户的UID的值是唯一的，更确切的说每个用户都要对应一个唯一的UID
，系统管理员应该确保这一规则。系统用户的UID的值从0开始，是一个正整数，至于最大值可以在/etc/login.defs
可以查到，一般Linux发行版约定为60000；
　　UID 是确认用户权限的标识，用户登录系统所处的角色是通过UID 来实现的，而非用户名，切记； 在Linux 中，root的UID是0，拥有系统最高权限；比如我在/etc/passwd 中把beinan的UID改为0后，你设想会发生什么呢？beinan这个用户会被确认为root用户。beinan这个帐号可以进行所有root的操作；
　　
　　一般情况下，每个Linux的发行版都会预留一定的UID和GID给系统虚拟用户占用，虚拟用户一般是系统安装时就有的，是为了完成系统任务所必须的用户，但虚拟用户是不能登录系统的，比如ftp、nobody、adm、rpm、bin、shutdown等；预留数量以各个系统中/etc/login.defs
中的 UID_MIN 的最小值为准；比如Fedora 系统 login.defs的UID_MIN是500，而UID_MAX
值为60000，也就是说我们通过adduser默认添加的用户的UID的值是500到60000之间；

 
 

 

 
 
 





