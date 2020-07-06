---
layout: post
title:  "linux file sort"
categories: linux
tags: linux
---

* content
{:toc}

## linux sort
* Linux sort命令用于将文本文件内容加以排序。
* sort可针对文本文件的内容，以行为单位来排序。

```bash 
sort [-bcdfimMnr][-o<输出文件>][-t<分隔字符>][+<起始栏位>-<结束栏位>][--help][--verison][文件]

-b 忽略每行前面开始出的空格字符。
-c 检查文件是否已经按照顺序排序。
-d 排序时，处理英文字母、数字及空格字符外，忽略其他的字符。
-f 排序时，将小写字母视为大写字母。
-i 排序时，除了040至176之间的ASCII字符外，忽略其他的字符。
-m 将几个排序好的文件进行合并。
-M 将前面3个字母依照月份的缩写进行排序。
-n 依照数值的大小排序。
-u 意味着是唯一的(unique)，输出的结果是去完重了的。
-o<输出文件> 将排序后的结果存入指定的文件。
-r 以相反的顺序来排序。
-t<分隔字符> 指定排序时所用的栏位分隔字符。
+<起始栏位>-<结束栏位> 以指定的栏位来排序，范围由起始栏位到结束栏位的前一栏位。
--help 显示帮助。
--version 显示版本信息。
```




### 用法
```bash
# 对当前文件夹大小进行排序
du -ah --max-depth=1 | sort -n
du -ah --max-depth=1 | sort -n | head // 获取前10个
du -ah --max-depth=1 | sort -n | tail // 获取后10个

# 因为sort 只能排序相同单位，所以，可以先去顶目标单位 比如查找 G单位
du -ah --max-depth=1 | grep 'G' | sort -n | tail 
# 查找G为单位排序 
```


* https://www.runoob.com/linux/linux-command-manual.html
