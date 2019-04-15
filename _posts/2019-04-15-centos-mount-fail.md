---
layout: post
title:  "CentOS 挂载RAID10 磁盘时出现错误"
categories: CentOS
tags: CentOS RAID10
---

* content
{:toc}
### CentOS7 开机 进入 emergency mode 
 
``` shell
welcome to emergency mode！after logging in ，type “journalctl -xb” to view system logs，“systemctl reboot” to reboot ，“systemctl default” to try again to boot into default mode。
```

周五还好好的机器，周一一来启动机器就进入了安全模式
* 好吧，一点点排查

#### 事件背景
>
* 6 块 SAS硬盘组成RAID10 合计 12T
* 1T /
* 1T /home
* 9T /data (作为日后的 ftp 工作目录)

#### 排查
```bash
journalctl -xb

# 搜索 fail
=> Failed to start Crash recovery kernel arming
```




* 所以根本就没有展示什么有效信息，先把kdump 的空间搞大点吧

```bash
vi /etc/grub.conf
crashkernel=auto -> crashkernel=256M

# CentoOS 系统为
vi /etc/grub2.cfg   
crashkernel=auto  -> crashkernel=256M
``` 

* 注意：配置项并没有单独成为一行，在一行的中间位置

* 继续重启，捕获错误

```bash
journalctl -xb

# 搜索 fail

=> Failed to mount /data
```

* 所以是 /data 这个挂载目录导致了系统起不来，我们先干掉他，先让系统起来

```bash
vi /etc /fstab
# UUID=fe533209-da73-4517-8e19-890546d7cb38 /data

# 保存后 重启
```

* 系统起来了，剩下的就是研究怎么搞 /data 这个超大空间吧
* 完全没有什么好办法，这里有大神可以赐教么。。。

#### 暴力解决
因为 data 目录目前并没有数据,直接对其进行格式化，重新挂载

```bash
fdisk -l
# 发现能看到磁盘

lsblk -f
# 用来确认要操作的块 => /dev/sda6

kfs.xfs /dev/sda6
# 提示已经有了这个文件系统，加 -f 参数

mkfs.xfs -f /dev/sda6
## ...

mount /dev/sda6 /data
```

* 处理完了，data重新挂载上了，重新启动OK，不过为什么会这样，还在分析。。。 

PS
* 庆幸是在刚刚装完系统发生的这现象
* 重新划分了RAID10，4块硬盘 组成 RAID 10, 2 块硬盘作为热备，后续还在测试