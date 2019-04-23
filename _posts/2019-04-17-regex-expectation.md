---
layout: post
title:  "正则前瞻"
categories: regex
tags: regex
---

* content
{:toc}
### 正则里面的前瞻记录
在正则表达式当中的前瞻，又叫零宽断言：






|表达式	|名称	|描述|
| --- | --- | --- |
|(?=exp)|	正向前瞻|	匹配后面满足表达式exp的位置|
|(?!exp)|	负向前瞻|	匹配后面不满足表达式exp的位置|
|(?<=exp)|	正向后瞻|	匹配前面满足表达式exp的位置（JS不支持）|
|(?<!exp)|	负向后瞻|	匹配前面不满足表达式exp的位置（JS不支持）|

#### 说人话
* (?=exp) 正向前瞻就是当前位置向前查找 exp 的内容 有则成立
* (?!exp) 负向前瞻就是当前位置向前查找不是 exp 的内容 没有就成立


### 前瞻的内容不会被 匹配 & 捕获
```js
var str = 'abcd';
var reg = /a(?=b)/g;
var str = str.replace(reg, "替换的内容");
console.log(str); // 替换的内容bcd
```
* 在正则表达式中我们写了 a(?=b) 但是替换的内容只有a


* 所以理所当然就有坑例如

```js
var str = 'abcd';
var reg = /(a(?=b))/g;
var str = str.replace(reg, "\$1替换的内容");
console.log(str); // a替换的内容bcd
```

* 按我们的理解 $1 应该是 ab 啊，所以请记住 前瞻表达式根本就没有捕获，也就没有引用



