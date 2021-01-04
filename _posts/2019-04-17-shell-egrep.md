---
layout: post
title:  "shell-grep"
categories: shell
tags: grep
---

* content
{:toc}
### grep 参数记录
grep 参数频率使用不高的总是忘记，备档，PS: egrep 用起来比 grep 好用





```bash
-a, --text              
      equivalent to --binary-files=text

-A NUM, --after-context=NUM
      打印出紧随匹配的行之后的下文 NUM 行。在相邻的匹配组之间将会打印内容是 -- 的一行。

-b, --byte-offset
      在输出的每行前面同时打印出当前行在输入文件中的字节偏移量。

-B NUM, --before-context=NUM
      打印出匹配的行之前的上文 NUM 行。在相邻的匹配组之间将会打印内容是 -- 的一行。

--colour[=WHEN], --color[=WHEN]
      在匹配的行周围以 GREP_COLOR 环境变量中指定的记号来标记。WHEN 可以是 `never', `always', 或是 `auto'。

-c, --count
      禁止通常的输出；作为替代，为每一个输入文件打印一个匹配的行的总数。如果使用       -v,      --invert-match      选项(参见下面)，将是不匹配的行的总数。

-C NUM, --context=NUM
      打印出匹配的行的上下文前后各 NUM 行。在相邻的匹配组之间将会打印内容是 -- 的一行。

-d, --directories=ACTION  
    how to handle directories; ACTION is 'read', 'recurse', or 'skip'

-D, --devices=ACTION      
    how to handle devices, FIFOs and sockets; ACTION is 'read' or 'skip'

-e PATTERN, --regexp=PATTERN
      使用模式 PATTERN 作为模式；在保护以 - 为起始的模式时有用。

-E, --extended-regexp 
      将模式 PATTERN 作为一个扩展的正则表达式来解释 (参见下面)。

-F, --fixed-strings
      将模式 PATTERN 视为一个固定的字符串的列表，用新行 (newlines) 分隔，只要匹配其中之一即可。
      
-G, --basic-regexp        
    PATTERN 是一个基本正则表达式(缩写为 BRE)

-P, --perl-regexp
      将模式 PATTERN 作为一个 Perl 正则表达式来解释。

-H, --with-filename
      为每个匹配打印文件名。

-h, --no-filename
      当搜索多个文件时，禁止在输出的前面加上文件名前缀。

-i, --ignore-case
      忽略模式 PATTERN 和输入文件中的大小写的分别。

-I                        
      equivalent to --binary-files=without-match

-m, --max-count=NUM      
      NUM 次匹配后停止      

-n, --line-number
      在输出的每行前面加上它所在的文件中它的行号。      

-o, --only-matching
      只显示匹配的行中与 PATTERN 相匹配的部分。

-q, --quiet, --silent     
      suppress all normal output
    --binary-files=TYPE   
      assume that binary files are TYPE; TYPE is 'binary', 'text', or 'without-match'

-R, -r, --recursive
      递归地读每一目录下的所有文件。这样做和 -d recurse 选项等价。

-s, --no-messages         
      suppress error messages
-T, --initial-tab         
      make tabs line up (if needed)

-L, --files-without-match 
      print only names of FILEs containing no match

-l, --files-with-matches  
      print only names of FILEs containing matches

--include=PATTERN
      仅仅在搜索匹配 PATTERN 的文件时在目录中递归搜索。

--exclude=PATTERN
      在目录中递归搜索，但是跳过匹配 PATTERN 的文件。

-U, --binary             
      do not strip CR characters at EOL (MSDOS/Windows)

-u, --unix-byte-offsets  
      report offsets as if CRs were not there (MSDOS/Windows)

-v, --invert-match
      改变匹配的意义，只选择不匹配的行。

-V, --version             
      display version information and exit

-w, --word-regexp
      只选择含有能组成完整的词的匹配的行。判断方法是匹配的子字符串必须是一行的开始，或者是在一个不可能是词的组成的字符之后。与此相似，
它必须是一行的结束，或者是在一个不可能是词的组成的字符之前。词的组成字符是字母，数字，还有下划线。

-x, --line-regexp
       只选择能匹配完整一行的匹配。

-z, --null-data          
        一个 0 字节的数据行，但不是空行
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


