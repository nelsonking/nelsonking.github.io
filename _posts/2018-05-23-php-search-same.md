---
layout: post
title:  "php 回文查询"
categories: php 
tags: php 回文查询
---

* content
{:toc}

## php 回文查询




```php
    /**
     * 回文数查询
     * 查找字符串中所有的驼峰数字 eg : 1234321
     */
    $str = "12343218901234543219821213214211235433231243234565432";
    
    // 计算字符串长度
    $len = strlen($str);
    // 声明查询存储数组
    $allStringArray = [];
    
    // 双层循环，外层控制循环
    for($i=0;$i<$len;$i++){
        // 内控控制拼接 每次拼接数为 len - i
        for($j=1;$j<=$len-$i;$j++){
            // 获取拼接字串
            $tmpStr = substr($str, $i, $j);
            // 计算拼接字串长度
            $tmpLen = strlen($tmpStr);
    
            // 只保留奇数即驼峰形似字串
            if ($tmpStr && $tmpLen % 2 != 0) {
                // 计算拼接字串中间量
                $midLen = intval(floor(strlen($tmpStr) / 2));
                // 从左获取零到中间位的数
                $leftStr = substr($tmpStr, 0, $midLen);
                // 翻转字符串后 同上
                $rightStr = substr(strrev($tmpStr), 0, $midLen);
    
                // 左右相等并且长度大于1即为所求
                if ($leftStr == $rightStr && strlen($tmpStr) > 1) {
                    $allStringArray[] = $tmpStr;
                }
            }
        }
    }
    
    dump($allStringArray);
```

### 结果如下

```php 
array:16 [
  0 => "1234321"
  1 => "23432"
  2 => "343"
  3 => "123454321"
  4 => "2345432"
  5 => "34543"
  6 => "454"
  7 => "212"
  8 => "121"
  9 => "323"
  10 => "43234"
  11 => "323"
  12 => "234565432"
  13 => "3456543"
  14 => "45654"
  15 => "565"
]
```