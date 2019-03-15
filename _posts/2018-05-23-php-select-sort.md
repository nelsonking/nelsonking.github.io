---
layout: post
title:  "php 选择排序"
categories: php 
tags: php 选择排序
---

* content
{:toc}

## php 插入排序




```php
    $arr = array(9,8,7,0,1,6,5,4,3,3,2);
    $arr = select($arr);
    var_dump($arr);
    
    /**
     * 选择排序
     * @param $arr
     * @return mixed
     * 外层控制循环
     * 内层查找当前最小数据，每次外层循选择一个最小数
     *
     * 最差时间 O(n2)
     * 平均时间复杂度	O(n2)
     * 稳定
     * 空间复杂度	O(1)
     */
    function select($arr)
    {
        $len = count($arr);
    
        for ( $i=0; $i<$len; $i++) {
            $minIndex = $i;
            for ( $j=$i+1; $j < $len; $j++ ) {
                if ($arr[$minIndex] > $arr[$j]) {
                    $minIndex = $j;
                }
            }
    
            if ($minIndex != $i) {
                $tmp = $arr[$i];
                $arr[$i] = $arr[$minIndex];
                $arr[$minIndex] = $tmp;
            }
        }
    
        return $arr;
    }
```