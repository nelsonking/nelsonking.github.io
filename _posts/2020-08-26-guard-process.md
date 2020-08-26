---
layout: post
title:  "守护进程"
categories: 守护进程
tags: 守护进程
---

* content
{:toc}

## 守护进程
以 beego 项目作为切入点（有模板，有服务） 
* https://github.com/nelsonking/app-publish
* 该项目是一个 公司内测使用的发布平台 支持 Android 和 iOS 应用




## systemctl 守护进程
```bash
## *.servic 名称即为最终守护进程的名称 例如下文的守护进程名称为 app-publish
cat /usr/lib/systemd/system/app-publish.service


[UNIT]
#服务描述
Description=app publish for test

#指定了在systemd在执行完那些target之后再启动该服务
After=network.target

[Service]
# 默认类型，始终守护 app-publish 进程
Type=simple

#定义systemctl start|stop|reload *.service 的执行方法（具体命令需要写绝对路径）
#注：ExecStartPre为启动前执行的命令

# 工作目录，这个定义的作用在于项目模板等寻址文件，守护进程的默认工作目录为 / ,在这个目录下是找不到项目中的模板的，所以需要指定 
WorkingDirectory=/data/www/qjyedu-app-publish
# 启动命令
ExecStart=/data/www/qjyedu-app-publish/app-publish
# 停止命令
ExecStop=ps -ef | grep app-publish| grep -v 'grep'| grep -v 'nohup' | awk '{print $2}' | xargs -I {} bash -c 'if test "{}" -ne 0; then kill -9 {}; fi'

#创建私有的内存临时空间
PrivateTmp=True

[Install]
#多用户
WantedBy=multi-user.target
```

### 检查并启动服务
```bash
## 挂载服务
sudo systemctl daemon-reload

## 检查服务是否存在
systemctl list-unit-files|grep app-publish

## 启动
systemctl start app-publish

## 设置开机启动
systemctl enable app-publish
```


## supervisor 守护进程
```bash
## 守护进程名称
[program:app-publish]
## 启动命令
command=/Users/nelsonking/Code/go/src/qjyedu-app-publish/app-publish
## 工作目录，这个定义的作用在于项目模板等寻址文件，守护进程的默认工作目录为 / ,在这个目录下是找不到项目中的模板的，所以需要指定
directory=/Users/nelsonking/Code/go/src/qjyedu-app-publish
## 输出日志文件
strout_events_enable=true
strerr_events_enable=true
```

### 检查并启动服务
```bash
supervisor
-> 
update
-> 
status
-> 检查是否含有 app-publish

start app-publish
```

## pm2 守护进程
```bash
pm2 start /data/www/qjyedu-app-publish/app-publish --cwd /data/www/qjyedu-app-publish --name app-publish
```
* --cwd 可以指定具体的工作目录，但是实际使用并未生效，工作空间并未生效，使用时需要注意
