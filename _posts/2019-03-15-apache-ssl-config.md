---
layout: post
title:  "Apache 2.4.* 配置 https 和 proxy 反向代理"
categories: apache 
tags: apache ssl https
---

* content
{:toc}

## apache 配置https
- 版本 ： Apache/2.4.6
- 所需依赖 openssl和openssl-devel
- 所需扩展 ssl_module
* 可以 /etc/httpd/modules/ 目录下确认 mod_ssl.so 是否存在

* 开启配置
```apache
LoadModule ssl_module         modules/mod_ssl.so
Include conf/extra/httpd-ssl.conf
```




### https配置
* /etc/httpd/conf.d/ssl.conf

- 实际仍然是 /etc/httpd/conf/httpd.conf 加载进来的配置文件
```apache
# Supplemental configuration
#
# Load config files in the "/etc/httpd/conf.d" directory, if any.
IncludeOptional conf.d/*.conf
```

* 对于apache 默认已经配置了https，我们只需要修改对应的主机的key文件（即新建的端口为443的VirtualHost）
```apache
SSLCertificateFile /etc/httpd/cert/*.pem
# 在Apache中重点就是SSLCertificateChainFile的配置，有没有都需要添加一个（服务器缺少中间证书问题）
SSLCertificateChainFile /etc/httpd/cert/*.pem
SSLCertificateKeyFile /etc/httpd/cert/*.key
 ```

* 具体的配置如下
```apache
LoadModule ssl_module modules/mod_ssl.so
Listen 443
SSLPassPhraseDialog  builtin
SSLSessionCache         shmcb:/var/cache/mod_ssl/scache(512000)
SSLSessionCacheTimeout  300
SSLMutex default
SSLRandomSeed startup file:/dev/urandom  256
SSLRandomSeed connect builtin
SSLCryptoDevice builtin
SSLProtocol all -SSLv2 -SSLv3
SSLHonorCipherOrder on
SSLCipherSuite ALL:!ADH:!EXPORT:!SSLv2:RC4+RSA:+HIGH:+MEDIUM:+LOW:!RC4:
========================================================================
< VirtualHost _default_:443> 
    DocumentRoot "/data/web/project"
    Servername https://www.domain.com/
    ErrorLog logs/ssl_error_log
    TransferLog logs/ssl_access_log
    LogLevel warn
    SSLEngine on
    SSLCertificateFile /etc/httpd/conf/cert/*.epm
    SSLCertificateChainFile /etc/httpd/cert/*.pem
    SSLCertificateKeyFile /etc/httpd/conf/cert/*.key
</ VirtualHost>
```
>> 虚拟主机配置，必须有一个虚拟主机，这样才可以使用跳转功能和使用443端口访问    

* 由于阿里云默认没有开启443端口，所有需要去网页面添加安全组规则
>> 阿里云控制台 -> 云服务器ECS -> 网络和安全 -> 安全组 -> 配置规则 (入方向 选择自定义TCP 填写 443 即可)

### 默认 http 转 https 
* /etc/httpd/conf/httpd.conf
```apache
RewriteEngine On
RewriteCond %{SERVER_PORT} 80
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R,L]
=================================================
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*) https://%{SERVER_NAME}/$1 [R,L]
=================================================
RewriteEngine on
RewriteCond %{SERVER_PORT} !^443$
RewriteRule ^/?(.*)$ https://%{SERVER_NAME}/$1 [L,R]
```
* 以上方案都可以实现

* 所有配置设定后记得重启apache哦
```bash
service httpd restart
systemctl restart httpd
```

### 问题整理
#### 重启apache,出现 Invalid command 'SSLPassPhraseDialog', perhaps misspelled or defined by a module not included in the server configuration
* 执行 ./httpd -l 看看有没有mode_ssl.c，这个错误说明ssl模块安装没有成功。
解决办法：

* 重新编译apache，加上--enable-ssl --with-ssl参数

* 把ssl模块加入到已经编译好的apache中 (获取lib和include的路径)
```bash
whereis openssl
# openssl: /usr/bin/openssl /usr/lib/openssl /usr/include/openssl /usr/share/man/man1/openssl.1ssl.gz
```

* 然后 在apache 源码的modules/ssl文件夹下，使用命令
```bash
/usr/sbin/apxs -i -a -D HAVE_OPENSSL=1 -I/usr/include/openssl/ -L/usr/lib/openssl/ -c *.c -lcrypto -lssl -ldl
```
* apxs需要安装http-devel才有


## apache 配置 反向代理
* 首先确保Apache有这些模块，在Apache根目录下确认有这些模块，主要包含以下模块：
/etc/httpd/modules
```bash
mod_proxy.so
mod_proxy_ajp.so
mod_proxy_balancer.so
mod_proxy_connect.so
mod_proxy_http.so
```
### 查看配置是否开启
```bash
grep -R 'mod_proxy.so' /etc/httpd/
```
查看是否包含所在行，且未被注释


### 配置反向代理
* /etc/httpd/conf/httpd.conf
* /etc/httpd/conf.d/ssl.conf
```apache
SSLProxyEngine on # https 是需要要添加
ProxyRequests Off
< Proxy *>
    Order deny,allow
    Allow from all
</ Proxy>
ProxyPass /test/ http://127.0.0.1:8080/test/
ProxyPassReverse /test/ http://127.0.0.1:8081/test/
```

### 问题整理
- Reason: DNS lookup failure for: 127.0.0.1:8080ranking
>> 反向代理代理的地址后面的反斜线，如果是有地址需要带到代理服务器上一定需要添加，否则地址会出错
