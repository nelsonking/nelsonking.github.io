---
layout: post
title:  "Jekyll 搭建静态博客"
categories: jekyll
tags: jekyll RubyGems
---

* content
{:toc}

## 搭建过程
以Mac系统为例
主要环节有：安装Ruby，安装RubyGems，安装jekyll，安装代码高亮插件，安装node.js

### 安装Ruby

```bash
brew install ruby

ruby -v
```





得到ruby版本号，即安装成功

### 安装RubyGems
```bash
wget https://rubygems.org/rubygems/rubygems-3.0.6.zip
unzip rubygems-3.0.6.zip
cd rubygems-3.0.6
ruby setup.rb
```
安装完毕后会得到 gem 命令

### 用RubyGems安装Jekyll

```bash
gem install jekyll
gem install jekyll-paginate
jekyll -v 
```
得到jekyll版本号，jekyll就已经安装完毕了


### 创建博客

```bash
mkdir ~/workspace
cd ~/workspace
jekyll new blog
cd blog
# watch 参数用来监控文件变化自动更新服务器
jekyll serve --watch
```

## 后续
*  整个安装过程参考了jekyll官网，注意jekyll还有一个简体中文官网，不过比较坑（我就被坑了），有些内容没有翻译过来，有可能会走弯路，建议如果想看中文的相关资料，也要中英对照着阅读。[jekyll中文网 http://jekyllcn.com](http://jekyllcn.com), [jekyll英文网 http://jekyllrb.com](http://jekyllrb.com)
*  jekyll中的css是用sass写的，当然直接在`_sass/_layout.scss`中添加css也是可以的。
*  本文是用Markdown格式来写的，相关语法可参考： [Markdown 语法说明 (简体中文版) http://wowubuntu.com/markdown/](http://wowubuntu.com/markdown/)  
*  按照本文的说明搭建完博客后，用`github Pages`托管就可以看到了。注意，在github上面好像不支持rouge，所以要push到github上时，我将配置文件_config.yml中的代码高亮改变为`highlighter: pygments`就可以了
