---
layout: post
title:  "Jekyll 博客页面被浏览器缓存问题"
categories: jekyll 
tags: jekyll cache
---

* content
{:toc}

## Jekyll 博客页面器缓存问题描述
在博客页面中，大部分博客内容写完后不会再进行修改，被浏览器缓存后对可以减轻服务器压力的。
但是一旦内容发生错误，或者页面需要长期更新，缓存策略就显得多余了。




### 处理办法
知道了问题，我们只需要针对当前页面地址追加一个参数即可使浏览器的缓存策略失效

### 可以追加的参数

追加时间参数
```html
<a href="/page/id?t={ { site.time | date_to_xmlschema } }"></a>
```

追加文字数量参数
```html
<a href="/page/id?w={ { page.content | number_of_words } }"></a>
```

对于上诉的两个办法都有弊端 
* 追加时间参数 会导致页面一直没有缓存，每次都是从服务器请求
* 追加文字参数 假如文章中修修改一个错别字仍然会被缓存影响

### 终极处理办法
追加参数和时间的综合体，保证缓存生效一段时间，这里的颗粒度就自己按实际情况选择吧

```html
{ % assign w =  (page.content | number_of_words) % }
{ % assign t = (site.time | date: "%Y%m%d") % }
{ % assign v = t|append:w % }

<a href="/page/id?v={ {v} }"></a>
```
* 经过多次验证，无法在一次赋值语句中使用多个过滤器，所以还是分成多条语句来实现吧


### 参考资料
* [https://liquid.bootcss.com/](https://liquid.bootcss.com/)
* [https://ruby-doc.org/stdlib-2.6.1/libdoc/time/rdoc/Time.html#method-c-parse](https://ruby-doc.org/stdlib-2.6.1/libdoc/time/rdoc/Time.html#method-c-parse)
