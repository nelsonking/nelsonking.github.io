---
layout: post
title:  "nginx https local"
categories: nginx
tags: nginx
---

* content
{:toc}
### nginx 本地开发环境配置Https
```bash
vim test.conf

[ req ]

default_bits        = 2048							# RSA的2048是公认较比较安全的key长度
default_keyfile     = server-key.pem
distinguished_name  = subject
req_extensions      = req_ext
x509_extensions     = x509_ext
string_mask         = utf8only

[ subject ]

countryName                 = Country Name (2 letter code)
countryName_default         = US

stateOrProvinceName         = State or Province Name (full name)
stateOrProvinceName_default = NY

localityName                = Locality Name (eg, city)
localityName_default        = New York

organizationName            = Organization Name (eg, company)
organizationName_default    = Example, LLC

commonName                  = Common Name (e.g. server FQDN or YOUR name)
commonName_default          = Example Company

emailAddress                = Email Address
emailAddress_default        = test@example.com

[ x509_ext ]

subjectKeyIdentifier   = hash
authorityKeyIdentifier = keyid,issuer

basicConstraints       = CA:FALSE
keyUsage               = digitalSignature, keyEncipherment
subjectAltName         = @alternate_names
nsComment              = "OpenSSL Generated Certificate"

[ req_ext ]

subjectKeyIdentifier = hash

basicConstraints     = CA:FALSE
keyUsage             = digitalSignature, keyEncipherment
subjectAltName       = @alternate_names
nsComment            = "OpenSSL Generated Certificate"

[ alternate_names ]

DNS.1       = *.test.com			# 本地开发域名，支持正则
```




### 生成秘钥和证书
```bash
openssl req -config test.conf -new -sha256 -newkey rsa:2048 -nodes -keyout server.key -x509 -days 365 -out server.crt

```
* openssl：这是用于创建和管理OpenSSL证书，密钥和其他文件的基本命令行工具。
* req：此子命令指定我们要使用X.509证书签名请求（CSR）管理。“X.509”是SSL和TLS为其密钥和证书管理所遵循的公钥基础结构标准。我们想要创建一个新的X.509证书，所以我们使用这个子命令。
* -x509：通过告诉实用程序我们要创建自签名证书而不是生成证书签名请求（通常会发生）来进一步修改上一个子命令。
* -nodes：这告诉OpenSSL跳过用密码保护我们的证书的选项。当服务器启动时，我们需要Nginx能够在没有用户干预的情况下读取文件。密码短语会阻止这种情况发生，因为我们必须在每次重启后输入密码。
* -days 365：此选项设置证书被视为有效的时间长度。我们在这里设置了一年。
* -newkey rsa：2048：这指定我们要同时生成新证书和新密钥。我们没有创建在上一步中签署证书所需的密钥，因此我们需要将其与证书一起创建。该rsa:2048部分告诉它制作一个2048位长的RSA密钥。
* -keyout：这一行告诉OpenSSL在哪里放置我们正在创建的生成的私钥文件。
* -out：这告诉OpenSSL在哪里放置我们正在创建的证书。

### nginx 加载使用
```bash
server {
    listen      80;    
    listen 443 ssl;
    ssl_certificate conf.d/ssl/server.crt;
    ssl_certificate_key conf.d/ssl/private.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;  #使用此加密套件。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;   #使用该协议进行配置。
    ssl_prefer_server_ciphers on;

    server_name dev.test.com;
    set $root /var/www/backend/test/public;
    root $root;    

    index   index.html index.php;
    client_max_body_size    100m;
    add_header  Access-Control-Allow-Origin *;

    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_index index.php;
        fastcgi_pass     php:9000;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;

        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root/$fastcgi_script_name;

        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
    }
}
```

* docker 环境下优先把443端口打开