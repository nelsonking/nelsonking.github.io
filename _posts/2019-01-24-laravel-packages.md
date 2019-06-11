---
layout: post
title:  "laravel 实用扩展包"
categories: laravel
tags: laravel 持续更新
---

* content
{:toc}

## laravel 实用扩展包，持续更新

### socialiteproviders/manager
- 社交媒体登录认证提供者，通过该扩展包可以实现 微博、微信、QQ ... 的第三方登录
* [github 地址 ](https://github.com/SocialiteProviders)
* [文档地址](https://socialiteproviders.netlify.com/about.html)




#### 微信客户端登录示例
```php
composer require socialiteproviders/weixin

# config/app.php

'providers' => [
    // a whole bunch of providers
    // remove 'Laravel\Socialite\SocialiteServiceProvider',
    \SocialiteProviders\Manager\ServiceProvider::class, // add
];

# app/Providers/EventServiceProvider.php

protected $listen = [
    \SocialiteProviders\Manager\SocialiteWasCalled::class => [
        // add your listeners (aka providers) here
        'SocialiteProviders\\Weixin\\WeixinExtendSocialite@handle',
    ],
];

# config/services.php
'weixin' => [
    'client_id' => env('WEIXIN_KEY'),
    'client_secret' => env('WEIXIN_SECRET'),
    'redirect' => env('WEIXIN_REDIRECT_URI')
],

# usage
return Socialite::with('Weixin')->redirect();
```


#### 网页微信扫码登录
```php
composer require socialiteproviders/weixin-web

# config/app.php

'providers' => [
    // a whole bunch of providers
    // remove 'Laravel\Socialite\SocialiteServiceProvider',
    \SocialiteProviders\Manager\ServiceProvider::class, // add
];

# app/Providers/EventServiceProvider.php

protected $listen = [
    \SocialiteProviders\Manager\SocialiteWasCalled::class => [
        // add your listeners (aka providers) here
        'SocialiteProviders\\WeixinWeb\\WeixinWebExtendSocialite@handle',
    ],
];

# config/services.php
'weixinweb' => [
    'client_id' => env('WEIXINWEB_KEY'),
    'client_secret' => env('WEIXINWEB_SECRET'),
    'redirect' => env('WEIXINWEB_REDIRECT_URI')
],

# usage
return Socialite::with('weixinweb')->redirect();
```

> 
* 微信客户端登录使用的公众平台
* 网页扫码登录使用的是开放平台


### 接口跨域请求
```php
composer require barryvdh/laravel-cors

# config/app.php
BarryvdhCorsServiceProvider::class,

# use 
# app/Http/Kernel.php $middleware

protected $middleware = [
    // ...
    BarryvdhCorsHandleCors::class,
];

# config 
php artisan vendor:publish --provider="BarryvdhCorsServiceProvider"

# config/cors.php
return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS
    |--------------------------------------------------------------------------
    |
    | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
    | to accept any value.
    |
    */

    'supportsCredentials' => false,
    'allowedOrigins' => ['*'],
    'allowedOriginsPatterns' => [],
    'allowedHeaders' => ['*'],
    'allowedMethods' => ['*'],
    'exposedHeaders' => [],
    'maxAge' => 0,
];
# 根据实际需求配置请求域名
```

### 发短信
* https://packagist.org/packages/overtrue/easy-sms
```php
overtrue/easy-sms

use Overtrue\EasySms\EasySms;

$config = [
    // HTTP 请求的超时时间（秒）
    'timeout' => 5.0,

    // 默认发送配置
    'default' => [
        // 网关调用策略，默认：顺序调用
        'strategy' => \Overtrue\EasySms\Strategies\OrderStrategy::class,

        // 默认可用的发送网关
        'gateways' => [
            'yunpian', 'aliyun',
        ],
    ],
    // 可用的网关配置
    'gateways' => [
        'errorlog' => [
            'file' => '/tmp/easy-sms.log',
        ],
        'yunpian' => [
            'api_key' => '824f0ff2f71cab52936axxxxxxxxxx',
        ],
        'aliyun' => [
            'access_key_id' => '',
            'access_key_secret' => '',
            'sign_name' => '',
        ],
        //...
    ],
];

$easySms = new EasySms($config);

$easySms->send(13188888888, [
    'content'  => '您的验证码为: 6379',
    'template' => 'SMS_001',
    'data' => [
        'code' => 6379
    ],
]);
```