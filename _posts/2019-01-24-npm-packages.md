---
layout: post
title:  "npm 实用扩展包"
categories: npm
tags: npm 持续更新
---

* content
{:toc}

## npm 实用扩展包，持续更新

### npm 扩展包搜索地址
* [https://www.npmjs.com/package/package](https://www.npmjs.com/package/package)




### 文档上传
#### webuploader 
* [webuploader 官网](http://fex.baidu.com/webuploader/)
https://www.npmjs.com/package/webuploader

### jQuery File Upload Plugin 
* [demo 演示](https://blueimp.github.io/jQuery-File-Upload/)
* https://www.npmjs.com/package/blueimp-file-upload

### 特效
#### 动画库 
* [动画](https://daneden.github.io/animate.css/)

### 手机端
#### 触摸滑动 
* [触摸滑动插件](https://www.swiper.com.cn)


 
### 微信
#### 微信分享
```html
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js" type="text/javascript" charset="utf-8"></script>
<script>
var wxdata = {
	title: 	'share title',
	desc: 	'share desc',
	link: 	location.href.split('#')[0],
	imgUrl: 'share image'
};

// ready
$.ajax({
	url : '/jssdk?url=' + encodeURIComponent(wxdata.link),
	type : 'get',
	success : function (response) {
		wx.config({
			debug: false,
			appId: response.appId,
			timestamp: response.timestamp,
			nonceStr: response.nonceStr,
			signature: response.signature,
			jsApiList: [
				'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
			]
		});
		
		wx.ready(function(){
        	wx.checkJsApi({
        		jsApiList: ['onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        		success: function (res) {}
        	});
        	// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        	wx.onMenuShareTimeline({
        		title: wxdata.title, // 分享标题
        		link: wxdata.link, // 分享链接
        		imgUrl: wxdata.imgUrl, // 分享图标
        		success: function (res) { },
        		cancel: function (res) { }
        	});
        
        	wx.onMenuShareAppMessage({
        		title: wxdata.title, // 分享标题
        		desc: wxdata.desc, // 分享描述
        		link: wxdata.link, // 分享链接
        		imgUrl: wxdata.imgUrl, // 分享图标
        		type: '', // 分享类型,music、video或link，不填默认为link
        		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        		success: function () { },
        		cancel: function () { }
        	});
        
        });
	}
});
</script>
```


