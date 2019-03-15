---
layout: post
title:  "Twig 模板引擎"
categories: twig 
tags: twig
---

* content
{:toc}

## Twig 模板引擎添加扩展
* twig模板引擎中无法使用自定义的php函数，为方便调用自定义函数，需要把一些常用函数加载为扩展，记录如下




### 编写扩展类，继承\Twig_Extension
```php
class DumpExtension extends \Twig_Extension
{
    // 固定格式
    public function getFilters()
    {
        return array(
            // 这里定义自定义函数名
            new \Twig_SimpleFilter('dump', array($this, 'dump')),
        );
    }

    // 自定义函数
    public function dump($param)
    {
		var_dump($param)
        return $param;
    }
   // 固定格式
    public function getName()
    {
        return 'dump_extension';
    }
}
```

### 自身业务加载twig方式，不同框架各异

```php
$templateDir = "/var/www/web/dir/xxx";
$loader = new Twig_Loader_Filesystem( $templateDir );
$twig   = new Twig_Environment($loader, $options);
```

### 加载扩展
```php
$twig->addExtension(new DumpExtension);
```

### 模板中使用
```php
{{ "helloworld" | dump }}
```