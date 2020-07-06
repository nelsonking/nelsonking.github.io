---
layout: post
title:  "mac 开启启动项"
categories: mac
tags: mac
---

* content
{:toc}

## mac开机启动项
mac 在安装程序后，有的程序会自动添加开机启动中，有的则需要手动添加




### launchctl
* 了解mac 启动程序需要先了解 launchctl 服务管理框架
launchctl 可以启动、停止和管理守护进程、应用程序、进程和脚本等。可通过配置文件来指定执行周期和任务的。

语法
```bash
sudo launchctl load -w /path/to/service.plist     ## 加载启动服务
sudo launchctl unload -w /path/to/service.plist   ## 删除启动服务
lauchctl list                                  ## 查看启动服务列表
```

一般plist文件放在这j几个地方：
> * /Library/LaunchDaemons/        由管理员定义的守护进程任务项，系统启动就会执行
> * /Library/LaunchAgents/         由管理员为用户定义的任务项，用户登录才会执行 
> * ~/Library/LaunchAgents/        由用户自己定义的任务项 
> * /System/Library/LaunchAgents   由Mac OS X为用户定义的任务项

*  lanucnctl 启动的应用程序是无法杀掉的，杀掉后还会自动启动

#### 添加启动文件
```bash
## 添加adobe 登录程序为自启动
/Library/LaunchAgents
sudo ln -f /Appliaction/Utilities/Adobe Creative Cloud/Utils/Creative Cloud 
Uninstaller.app/Contents/Resources/com.adobe.AdobeCreativeCloud.plist /Library/LaunchAgents/
## 加载启动项
launchctl load -w /Library/LaunchAgents/com.adobe.AdobeCreativeCloud.plist
```

#### 删除启动文件
* 删除启动文件并不是删除plist就完事了，需要 launchctl unload

```bash
cd /Library/LaunchAgents
## 去掉启动项
launchctl unload -w /Library/LaunchAgents/com.adobe.AdobeCreativeCloud.plist
```


#### 一个plist 样例

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
        <key>KeepAlive</key>
        <true/>
        <!-- Label唯一的标识 -->
        <key>Label</key>
        <string>com.qiuyuzhou.shadowsocksX-NG.http</string>
        <!-- 指定要运行的脚本 -->
        <key>ProgramArguments</key>
        <array>
                <string>/Users/nelsonking/Library/Application Support/ShadowsocksX-NG/privoxy</string>
                <string>--no-daemon</string>
                <string>privoxy.config</string>
        </array>
        <!-- 指定要运行的时间 -->
        <key>StandardErrorPath</key>
        <string>/Users/nelsonking/Library/Logs/privoxy.log</string>
        <!-- 标准输出文件 -->
        <key>StandardOutPath</key>
        <string>/Users/nelsonking/Library/Logs/privoxy.log</string>
        <!-- 标准错误输出文件，错误日志 -->
        <key>WorkingDirectory</key>
        <string>/Users/nelsonking/Library/Application Support/ShadowsocksX-NG/</string>
</dict>
</plist>
```
* 修改后的 plist 必须 unload 然后在 load
* 加载后的 plist 当时就会执行，不论时间是否到了