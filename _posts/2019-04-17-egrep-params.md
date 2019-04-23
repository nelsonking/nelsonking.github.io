---
layout: post
title:  "grep 参数记录"
categories: grep
tags: grep
---

* content
{:toc}
### grep 参数记录
grep 参数频率使用不高的总是忘记，备档，PS: egrep 用起来比 grep 好用





```bash
-h, --no-filename
      当搜索多个文件时，禁止在输出的前面加上文件名前缀。

-n, --line-number
      在输出的每行前面加上它所在的文件中它的行号。      

-o, --only-matching
      只显示匹配的行中与 PATTERN 相匹配的部分。

-R, -r, --recursive
      递归地读每一目录下的所有文件。这样做和 -d recurse 选项等价。

--include=PATTERN
      仅仅在搜索匹配 PATTERN 的文件时在目录中递归搜索。

--exclude=PATTERN
      在目录中递归搜索，但是跳过匹配 PATTERN 的文件。

-v, --invert-match
      改变匹配的意义，只选择不匹配的行。

-w, --word-regexp
      只选择含有能组成完整的词的匹配的行。判断方法是匹配的子字符串必须是一行的开始，或者是在一个不可能是词的组成的字符之后。与此相似，
它必须是一行的结束，或者是在一个不可能是词的组成的字符之前。词的组成字符是字母，数字，还有下划线。

-x, --line-regexp
       只选择能匹配完整一行的匹配。
```


### demo 
```bash
## 匹配代码中的图片文件，并且下载到本地
egrep --exclude='workspace.xml' -ohR 'https?:\/\/.+?\.com\/[^>]+?\/(\w+\.(jpg|png|gif)+)' ../../  | xargs wget
## 避免一行中出现多次图片地址，注意匹配的时候都加上非贪婪模式 eg : .+? 
## 因为图片标签以 > 结尾所以[^>]+? 即可匹配图片的路径情况
## [^>]+? 的写法 可以在 后文追加前瞻预测 (?=.*>) 
## --exclude 排除赛选的文件
## -ohR o 只显示匹配内容 h 不输出文件名 R 递归搜索
## 出来的内容就是文件的网络地址，直接管道给 wget 即可下载
```


