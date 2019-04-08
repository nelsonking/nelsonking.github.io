---
layout: post
title:  "php 调用外部命令不执行"
categories: php
tags: php shell_exec imagemagick convert
---

* content
{:toc}
### 手动调用可以执行的shell命令，放到PHP中调用就不运行 
 
``` shell
/usr/local/bin/convert -density 300 -depth 8 -quality 85 php.pdf ./file.png
```
> 目标目录产生结果





```php
$out = shell_exec(/usr/local/bin/convert -density 300 -depth 8 -quality 85 php.pdf ./file.png);
```
> 目标目录无结果，$out 返回 null

* 出现这种问题，很明显是由于环境变量引起的，即便是命令写的全称，
由于在脚本中没有环境变量，命令调用的自身其他的命令仍然会找不到


### 处理办法

```php
putenv("PATH=/usr/local/bin:/usr/bin:/bin");
```

> 其他环境变量类推


#### 非常规问题
* 在 PHP 调用 liberoffice 时同样会出错，但是不是这种问题，liberoffice需要HOME变量

```php
shell_exec(export HOME=/tmp;/usr/local/bin/soffice --convert-to pdf php.docx --outdir /tmp)
```







