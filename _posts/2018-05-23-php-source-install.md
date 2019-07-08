---
layout: post
title:  "php 源码安装"
categories: php 
tags: php 源码安装
---

* content
{:toc}

## php 源码安装

### 扩展扩支持
```shell
## jpeg
wget http://www.ijg.org/files/jpegsrc.v8c.tar.gz

```


### MAC 编译参数
```shell
./configure --prefix=/usr/local/php7.1.27 --with-config-file-path=/usr/local/php7.1.27/etc --with-config-file-scan-dir=/usr/local/php7.1.27/etc/conf.d --without-ldap --enable-inline-optimization --disable-debug --disable-rpath --enable-shared --enable-fpm --with-fpm-user=www --with-fpm-group=www --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --with-gettext -enable-mbstring --with-mhash --with-openssl=/usr/local/Cellar/openssl/1.0.2n --enable-bcmath --enable-soap --with-libxml-dir --enable-pcntl --enable-shmop --enable-sysvmsg --enable-sysvsem --enable-sysvshm --enable-sockets --with-curl --with-zlib --enable-zip --with-bz2 --with-gd  --with-jpeg-dir --enable-gd-native-ttf --enable-gd-jis-conv --with-openssl=/usr/local/Cellar/openssl/1.0.2r/ --with-gettext=/usr/local/Cellar/gettext/0.19.8.1/ --with-iconv-dir=/usr/local/libiconv 
```

### ubuntu 编译参数
```shell
./configure --prefix=/usr/local/php7.1.19 --with-config-file-path=/usr/local/php7.1.19/etc --with-config-file-scan-dir=/usr/local/php7.1.19/etc/conf.d --enable-inline-optimization --disable-debug --disable-rpath --enable-shared --enable-opcache --enable-fpm --with-fpm-user=www --with-fpm-group=www --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --with-gettext -enable-mbstring --with-iconv --with-mcrypt --with-mhash --with-openssl --enable-bcmath --enable-soap --with-libxml-dir --enable-pcntl --enable-shmop --enable-sysvmsg --enable-sysvsem --enable-sysvshm --enable-sockets  --with-zlib --enable-zip --with-bz2 --with-gd --enable-gd-native-ttf --enable-gd-jis-conv  --with-openssl
```

### 编译参数
```config
--with-config-file-path=/usr/local/php/etc 指定php.ini位置               
--enable-safe-mode   打开安全模式 
--enable-ftp   打开ftp的支持 
--enable-zip   打开对zip的支持 
--with-bz2    打开对bz2文件的支持        
--with-jpeg-dir   打开对jpeg图片的支持 
--with-png-dir   打开对png图片的支持 
--with-freetype-dir   打开对freetype字体库的支持 
--without-iconv   关闭iconv函数，种字符集间的转换 
--with-libXML-dir   打开libxml2库的支持 
--with-XMLrpc    打开xml-rpc的c语言 
--with-zlib-dir   打开zlib库的支持 
--with-gd    打开gd库的支持 
--enable-gd-native-ttf   支持TrueType字符串函数库 
--with-curl    打开curl浏览工具的支持 
--with-curlwrappers    运用curl工具打开url流 
--with-ttf     打开freetype1.*的支持，可以不加了 
--with-xsl     打开XSLT 文件支持，扩展了libXML2库 ，需要libxslt软件 
--with-gettext     打开gnu 的gettext 支持，编码库用到 
--with-pear    打开pear命令的支持，PHP扩展用的 
--enable-calendar    打开日历扩展功能 
--enable-mbstring    多字节，字符串的支持 
--enable-bcmath    打开图片大小调整,用到zabbix监控的时候用到了这个模块
--enable-sockets     打开 sockets 支持
--enable-exif    图片的元数据支持 
--enable-magic-quotes    魔术引用的支持 
--disable-rpath    关闭额外的运行库文件 
--disable-debug    关闭调试模式 
--with-mime-magic=/usr/share/file/magic.mime      魔术头文件位置
--enable-fpm CGI方式安装才用的参数                      
--enable-fastCGI  支持fastcgi方式启动PHP
--enable-force-CGI-redirect        重定向方式启动PHP
--with-ncurses                    支持ncurses 屏幕绘制以及基于文本终端的图形互动功能的动态库
--enable-pcntl                     freeTDS需要用到的，可能是链接mssql 才用到
# mhash和mcrypt算法的扩展
--with-mcrypt                     算法
--with-mhash                      算法
# 以上函数库需要安装
--with-gmp  应该是支持一种规范
--enable-inline-optimization  优化线程
--with-openssl                     openssl的支持，加密传输时用到的
--enable-dbase                     建立DBA 作为共享模块
--with-pcre-dir=/usr/local/bin/pcre-config      perl的正则库案安装位置
--with-gdbm                     dba的gdbm支持
--enable-zend-multibyte         支持zend的多字节
```

### 技巧
* 对于编译参数类型 --with-xx-dir ，如果扩展是默认安装 即 ./configure 形态的，无需指定目录，默认即可
* 添加扩展时源码目录先执行 make clean，之前缓存的对象有可能对对本次安装的扩展产生影响，每次时间那么久，试错成本太高，建议先从 make clean 开始
