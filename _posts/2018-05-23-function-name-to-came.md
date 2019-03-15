---
layout: post
title:  "php下划线大小驼峰命名转换"
categories: php 
tags: php cameCase snakeCase
---

* content
{:toc}

API场景中经常会使用下划线、大小驼峰 命名方式互转，抽离出来

```php
$result = dealHumpToUnderline("doDoTest");
var_dump($result);

$result = dealToHump($result);
var_dump($result);

$result = dealToHump($result, true);
var_dump($result);
```



```php
/**
 * 驼峰命名转下划线命名
 * @param $function
 * @return string
 *
 */
function dealHumpToUnderline($function)
{
    $str = "";

    for($i=0;$i<strlen($function);$i++){
        // 大写
        if ($function[$i] === strtoupper($function[$i])){
            $str .= "_". strtolower($function[$i]);
        } else {
            $str .= strtolower($function[$i]);
        }
    }

    return $str;
}

/**
 * 转驼峰命名
 * @param $function
 * @param $big
 * @return string
 */
function dealToHump($function, $big = false)
{
    $str = "";

    for($i=0;$i<strlen($function);$i++){
        if ($function[$i] == "_"){
            $str .= strtoupper($function[$i + 1]);
            $i ++;
        } else {
            $str .= $function[$i];
        }
    }

    if ($big) {
        return ucfirst($str);
    } else {
        return $str;
    }
}
```