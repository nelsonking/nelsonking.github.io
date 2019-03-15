---
layout: post
title:  "php 冒泡排序"
categories: php 
tags: php 冒泡排序
---

* content
{:toc}

## php 冒泡排序




```php
    $arr = array(9,8,7,0,1,6,5,4,3,3,2);
    $arr = bubble($arr);
    var_dump($arr);
    
    /**
     * 冒泡排序
     * @param $arr
     * @return mixed
     * 外层控制循环
     * 内容控制最大数归位，每次外层循环归位一个数
     *
     * 最差时间 O(n^2)
     * 平均时间复杂度 O(n^2)
     * 稳定
     * 空间复杂度 O(1)
     */
    function bubble($arr)
    {
    
        $len = count($arr);
    
        for ( $i=0; $i<$len; $i++) {
            for ( $j=0; $j<$len-$i-1; $j++) {
                if ($arr[$j] > $arr[$j+1]) {
                    $tmp = $arr[$j];
                    $arr[$j] = $arr[$j+1];
                    $arr[$j+1] = $tmp;
                }
            }
        }
    
        return $arr;
    }
```