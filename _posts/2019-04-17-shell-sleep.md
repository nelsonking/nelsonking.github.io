---
layout: post
title:  "shell—sleep"
categories: shell
tags: shell sleep
---

* content
{:toc}
### sleep
Shell的脚本，用于顺序执行一系列的程序。遇到需要延时处理的可以通过 sleep 去过度

```bash
sleep 1    # 睡眠1秒
sleep 1s   # 睡眠1秒
sleep 1m   # 睡眠1分
sleep 1h   # 睡眠1小时
```





### 示例 重启 tomcat
```bash
progressId = `ps -ef | grep tomcat | grep -v 'grep' | awk '{print $2}'`
kill -9 $progressId
sleep 3  #等3秒后执行下一条
nohup /opt/apache-tomcat-7.0.94/bin/startup.sh &
```


 