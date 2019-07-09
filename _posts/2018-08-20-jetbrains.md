---
layout: post
title:  "jetbrains 功能记录"
categories: jetbrains
tags: jetbrains phpstorm pycharm idea webstorm clion goland 持续更新
---

* content
{:toc}

* [phpstorm文档](https://www.kancloud.cn/ervinhua/phpstorm/441837)

## 快捷键
### 编辑功能
>
| 快捷键名称  | 快捷键  |
| ------------ | ------------ |
|大小写切换|ctrl+shift+u  |
|格式化代码|ctrl+alt+l|
|恢复重做（redo）|ctrl+shift+z|
|跳转到某一行|ctrl+g|
|跳到上次操作跳转的地方 |ctrl + alt + <- | 
|跳到前一次操作跳转的地方 |ctrl + alt + -> |





### 重构功能
>
| 快捷键名称  | 快捷键  |
| ------------ | ------------ |
| 重构方法 | ctrl + alt + m|


## 编辑
### 对其
* typescript 设置等号对其
> Code Style -> Typescript -> Wrapping and Braces 
> 找到要设置的模板(例如设置对象) Objects -> Align

> 右侧的是一个选项卡，可以选择设置内容 
> (Do not align 不设置对其， On colon 冒号对其， On value 值对其)


## 杂项
### 忽略索引文件
庞大 node_modules 直接让你的电脑起飞，专业的编辑器干专业的事
 
#### 方法 1
右键左侧目录树 -> Mark Directory As -> Excluded

#### 方法 2 
菜单 -> Directories -> Excluded -> 添加忽略目录

#### 方法 3
菜单 -> Editor -> File Types -> Ignore files and Folders -> 添加忽略目录


## 优化
### 卡顿问题
```js
phpstorm.exe.vmoptions

-Dawt.usesystemAAFontSettings=lcd 
-Dawt.java2d.opengl=true 
```
* phpstorm 默认的 JAVA 环境没有利用机器的硬件加速技术去实现实时渲染.而只要在 JAVA 环境中让系统默认使用硬件加速，就可以解决占用系统资源过大，让 phpstorm 卡的问题了