---
layout: post
title:  "Dockfile"
categories: docker
tags: docker Dockfile
---

* content
{:toc}

## docker file 
Dockfile用于编写docker镜像生成过程,在一个文件夹中，如果有一个名字为Dockfile的文件,执行命令:

```shell
docker build --tag name:tag .
# name是镜像的名称，tag是镜像的版本或者是标签号，不写就是lastest。注意后面有一个空格和点。
``` 
就可以按照描述构建一个镜像。





### Dockfile语法 
#### FROM
用法：FROM <image>

说明：第一个指令必须是 FROM了，其指定一个构建镜像的基础源镜像，如果本地没有就会从公共库中拉取，没有指定镜像的标签会使用默认的latest标签。
* 可以出现多次，如果需要在一个 Dockerfile 中构建多个镜像。

用例:
```shell 
FROM ubuntu:16.04
```

#### MAINTAINER
用法：MAINTAINER <name> <email>

说明：描述镜像的创建者，名称和邮箱

用例：
```shell
MAINTAINER nelson "xxxx@gmail.com"
```
#### RUN
用法：RUN "command" "param1" "param2"

说明：RUN命令是一个常用的命令，执行完成之后会成为一个新的镜像，这里也是指镜像的分层构建。
* 一句RUN就是一层，也相当于一个版本。
* 你如果第一句安装了软件，用完在后面一句删除是不可能的。所以这种情况要在一句 RUN 命令中完成，可以通过&符号连接多个RUN语句。
* > docker是镜像层是只读
* RUN后面的必须是 双引号 不能是 单引号（可以没引号），command 是不会调用shell的，所以也不会继承相应变量，要查看输入RUN "sh" "-c" "echo" "$HOME"，而不是RUN "echo" "$HOME"。

用例：
```shell 
RUN echo 'hello docker!' \
        > /usr/local/file.txt
```        
* 使用 \ 来换行
         

### ARG
用法: ARG key=value

说明: ARG 产生临时变量，只有在实行docker build命令时构建容器有效

用例:
```shell
ARG APT=apt install
RUN $APT nginx
## 会执行 apti install nginx 命令
``` 


#### CMD
用法：CMD command param1 param2

说明：CMD 在 Dockerfile 中只能出现一次，其作用是在启动容器的时候提供一个默认的命令项。
* 有多个 CMD时，只有最后一个会有效
* 如果用户执行docker run 时提供了命令项，就会覆盖掉这个命令。没提供就会使用构建时的命令。

用例:
```shell
CMD /bin/bash
```

#### EXPOSE
用法：EXPOSE <port> [<port>...]

说明：告诉Docker服务器容器对外映射的容器端口号，在 docker run -p 的时候生效。

用例:
```shell
EXPOSE 80 8080
EXPOSE 81 8081
```

#### ENV
用法：ENV <key> <value> 只能设置一个
     ENV <key>=<value> 允许一次设置多个

说明：设置容器的环境变量，可以让其后面的RUN命令使用，容器运行的时候这个变量也会保留。
用例:
```shell
ENV home $HOME
```

#### ADD
用法：ADD <src>   <dest>

说明：复制本机文件或目录或远程文件，添加到指定的容器目录，支持GO的正则模糊匹配。路径是绝对路径，不存在会自动创建。如果源是一个目录，只会复制目录下的内容，目录本身不会复制
* ADD命令会将复制的压缩文件夹自动解压，这也是与COPY命令最大的不同。

用例:
```shell
ADD nginx.tar.gz /home/xxx/
* 最终 /home/xxx/ 下会包含 nginx 文件 （nginx.tar.gz 自动解压了）
```

#### COPY
用法：COPY <src> <dest>

说明：将主机的文件复制到镜像内，如果目的位置不存在，Docker会自动创建所有需要的目录结构

* COPY除了不能自动解压，也不能复制网络文件。其它功能和ADD相同。

用例:
```shell
```
用例：COPY nginx.conf /etc/nginx/config/nginx.conf

#### ENTRYPOINT
用法：ENTRYPOINT "command" "param1" "param2"

说明：这个命令和CMD命令一样，唯一的区别是不能被docker run命令的执行命令覆盖，如果要覆盖需要带上选项--entrypoint，如果有多个选项，只有最后一个会生效。
* 命令不会覆盖，但是会被当成是 ENTRYPOINT 的参数

用例:
```shell
ENTRYPOINT 【“nginx"]
docker run -it xxx -g "daemon off"
## 执行 ngxin -g "daemong off"

ENTRYPOINT ["echo", "hello"]
docker run -it xxx  "world"
## 执行 echo hello world
```


#### VOLUME
用法：VOLUME ["path"]

说明：在主机上创建一个挂载，挂载到容器的指定路径。

* docker run -v命令也能完成这个操作，而且更强大。
* 这个命令不能指定主机的需要挂载到容器的文件夹路径，但docker run -v可以，而且其还可以挂载数据容器！

用例:
```shell
VOLUME /code/php /data/www
```

#### USER
用法：USER daemon

说明：指定运行容器时的用户名或UID，后续的RUN、CMD、ENTRYPOINT也会使用指定的用户运行命令。

用例:
```shell
USER mysql
```

#### WORKDIR
用法:WORKDIR path

说明：为RUN、CMD、ENTRYPOINT指令配置工作目录。可以使用多个WORKDIR指令，后续参数如果是相对路径，则会基于之前的命令指定的路径。

用例:
```shell
WORKDIR /usr/local
WORKDIR webservice
RUN echo 'hello docker' > text.txt

# 最终会在/usr/local/webservice/目录下生成text.txt文件
```

#### ONBUILD
用法：ONBUILD [INSTRUCTION]

说明：配置当前所创建的镜像作为其它新创建镜像的基础镜像时，所执行的操作指令。意思就是，这个镜像创建后，如果其它镜像以这个镜像为基础，会先执行这个镜像的ONBUILD命令。

用例:
```shell
## 创建镜像 A
FROM ubuntu
...
ONBUILD ADD . /var/www
...

## 创建镜像B
FROM image-A

# 最终镜像 B 执行 ADD . /var/www

```

### Dockerfile例子
```shell
FROM ubuntu
MAINTAINER xxx xxxx@qq.com

WORKDIR /usr/local/docker
ADD temp.zip ./add/
COPY temp.zip ./copy/
EXPOSE 22
RUN groupadd -r vector4wang && useradd -r -g xxx xxx
USER xxx

ENTRYPOINT ["/bin/bash"]
```

* dockerFile nginx

```shell
FROM centos:7
MAINTAINER xxx xxx@sina.com
ENV TIME_ZOME Asia/Shanghai
ARG NV="nginx-1.14.0"

COPY nginx.conf /data/nginx/conf/
ADD $NV.tar.gz /tmp
RUN yum -y install gcc gcc-c++ make openssl-devel pcre-devel \
        && mkdir -p /data \
        && cd /tmp/$NV \
        && ./configure --prefix=/data/nginx \
        && make -j 2 \
        && make install \
        && echo "${TIME_ZOME}" > /etc/timezone \
        && ln -sf /usr/share/zoneinfo/${TIME_ZOME} /etc/localtime \
        && rm -rf /tmp/nginx* \
        && yum clean all \
        && yum -y remove gcc gcc-c++ make

WORKDIR /data/nginx/
EXPOSE 80 80
CMD ["./sbin/nginx","-g","daemon off;"]

## 构建
cd ~/docker/nginx/
docker build -t nginx:1.14.0 .
```
* 实际安装时，由于网络等不可预测因数，安装包尽量下载到本地，然后拷贝到docker中进行操作



- [source at ](https://www.cnblogs.com/lighten/p/6900556.html)
* [source at ](https://www.jianshu.com/p/10ed530766af)