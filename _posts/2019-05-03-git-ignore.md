---
layout: post
title:  "git ignore"
categories: git
tags: git
---

* content
{:toc}
### git 忽略文件
Git忽略文件的原则
-  忽略操作系统自动生成的文件，比如缩略图等；
-  忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的.class文件；
-  忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。



#### git 忽略机制
.gitignore忽略规则的优先级
在 .gitingore 文件中，每一行指定一个忽略规则，Git检查忽略规则的时候有多个来源，它的优先级如下（由高到低）：
* 从命令行中读取可用的忽略规则
* 当前目录定义的规则
* 父级目录定义的规则，依次递推
* $GIT_DIR/info/exclude 文件中定义的规则
* core.excludesfile 中定义的全局规则

.gitignore忽略规则的匹配语法
* 空格不匹配任意文件，可作为分隔符，可用反斜杠转义
* 以“＃”开头的行都会被 Git 忽略。即#开头的文件标识注释，可以使用反斜杠进行转义。
* 可以使用标准的 glob 模式匹配。所谓的 glob 模式是指 shell 所使用的简化了的正则表达式。
* 以斜杠"/"开头表示目录；"/"结束的模式只匹配文件夹以及在该文件夹路径下的内容，但是不匹配该文件；"/"开始的模式匹配项目跟目录；如果一个模式不包含斜杠，则它匹配相对于当前 .gitignore 文件路径的内容，如果该模式不在 .gitignore 文件中，则相对于项目根目录。
* 以星号"*"通配多个字符，即匹配多个任意字符；使用两个星号"**" 表示匹配任意中间目录，比如`a/**/z`可以匹配 a/z, a/b/z 或 a/b/c/z等。
* 以问号"?"通配单个字符，即匹配一个任意字符；
* 以方括号"[]"包含单个字符的匹配列表，即匹配任何一个列在方括号中的字符。比如[abc]表示要么匹配一个a，要么匹配一个b，要么匹配一个c；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配。比如[0-9]表示匹配所有0到9的数字，[a-z]表示匹配任意的小写字母）。
* 以叹号"!"表示不忽略(跟踪)匹配到的文件或目录，即要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。需要特别注意的是：如果文件的父目录已经被前面的规则排除掉了，那么对这个文件用"!"规则是不起作用的。也就是说"!"开头的模式表示否定，该文件将会再次被包含，如果排除了该文件的父级目录，则使用"!"也不会再次被包含。可以使用反斜杠进行转义。

需要谨记：git对于.ignore配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效；


.gitignor忽略规则查看
git check-ignore命令检查：

```bash
git check-ignore -v HelloWorld.class
## .gitignore:1:*.class    HelloWorld.class
## HelloWorld.class 被忽略可以知道是那条规则气的作用
```

#### 使用示例
* 忽略 /admin 目录，同时 保留 /admin/build 目录

```bash
vim .gitignore

/admin/*
# 为什么这里是 /admin/* 而不是 /admin,因为取反机制会在上层文件夹被忽略时失效
!/admin/build

```

* .gitignore 只能忽略没有被track的文件，如果文件已经被纳入了版本，修改.gitignore是无效的
解决方法 先把本地缓存删除（改变成未track状态），然后再提交：

```bash
# 文件
git rm --cached <file>

# 目录
git rm -f --cached <dir>

# 在
git add 
git commit  
```

* 一堆配置示例

```bash
*.a       # 忽略所有 .a 结尾的文件
!lib.a    # 但 lib.a 除外

/TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/    # 忽略 build/ 目录下的所有文件
doc/*.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
 
bin/:           表示忽略当前路径下的bin文件夹，该文件夹下的所有内容都会被忽略，不忽略 bin 文件
/bin:           表示忽略根目录下的bin文件

/*.c:           表示忽略cat.c，不忽略 build/cat.c
debug/*.obj:    表示忽略debug/io.obj，不忽略 debug/common/io.obj和tools/debug/io.obj

**/foo:         表示忽略/foo,a/foo,a/b/foo等
a/**/b:         表示忽略a/b, a/x/b,a/x/y/b等

!/bin/run.sh    表示不忽略bin目录下的run.sh文件

## idea
*.iml 
.idea/ 
*.ipr 
*.iws 

# osx 
*~ 
.DS_Store 
```

