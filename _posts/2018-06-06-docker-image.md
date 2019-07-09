---
layout: post
title:  "docker 镜像记录"
categories: docker
tags: docker
---

* content
{:toc}

## docker 镜像记录
### shadowsock
```shell
docker run -it -p 7878:431 -e "password=docker" -d  kelvv/shadowsock-docker

# 更改加密方式
docker exec -it  gifted_ramanujan /bin/bash
vi ServerStart.sh

#!/bin/sh
ssserver -p 431 -k ${password} -m aes-128-cfb
```

