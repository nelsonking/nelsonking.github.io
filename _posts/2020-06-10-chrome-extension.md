---
layout: post
title:  "Chrome 扩展"
categories: Chrome
tags: Chrome
---

* content
{:toc}


## Chrome 扩展
### 扩展导出 方法1
* Chrome 为了闭环自己的应用体系，下载的扩展不在不在下载列表显示。好不容易翻个墙，下载下载的扩展只能给自己用，以下方式可以导出扩展
> * 确定自己的需要导出的应用ID
> * 找到自己的扩展安装地址
```bash
# mac 下的地址
/Users/nelsonking/Library/Application Support/Google/Chrome/Default/Extensions/application_id
```




> * 打开网页 chrome://extensions/
> 加载已解压的扩展程序（这一步会忽略原有项目的私钥）选择上面的目录
> 打包扩展程序 选择上面给的目录
> 这个时候，还是上面的目录父级下会生成 .crx 和 .pem 文件
> .crx 文件可以共享了

### 扩展导出 方法 2
* 对于可以科学上网的用户,基础下载地址是 

```js 
// 打开浏览器 进入 Console
(function (){
    var url = "https://clients2.google.com/service/update2/crx?response=redirect&os=win&arch=x64&os_arch=x86_64&nacl_arch=x86-64&prod=chromecrx&prodchannel=&prodversion=77.0.3865.90&lang=zh-CN&acceptformat=crx2,crx3&x=id%3D{application_id}%26installsource%3Dondemand%26uc"
    
    if (window.location.href.match("chrome.google.com")) {
        var hrefMsg =  window.location.href.split("?")[0].split("/")
        var applicationId = hrefMsg[(hrefMsg.length)-1]
    } else {
        var applicationId = prompt("当前页面不是Chome商店页面，请输入应用ID")
    }
    
    if (applicationId.length == 32) {
        url = url.replace("{application_id}", applicationId)
        window.open(url)
    } else {
        alert("应用ID长度应为32位，当前为 "+ applicationId.length +"，请检测")
    }
})()

```

### 实用扩展

