---
layout: post
title:  "php 插入排序"
categories: php 
tags: php 插入排序
---

* content
{:toc}

## php 插入排序




```php
    $arr = array(9,8,7,0,1,6,5,4,3,3,2);
    $arr = insert($arr);
    var_dump($arr);
    
    /**
     * 插入排序
     * @param $arr
     * @return mixed
     * 外层控制循环
     * 内层每次选择一个当前循环最小的数插到固定位置，并对当前循环之前的所有数据排好序
     * O(n2)	O(n2)	稳定	O(1)
     */
    function insert($arr)
    {
        $len = count($arr);
    
        for ( $i=1; $i<$len; $i++ ) {
            $tmpNum = $arr[$i];
    
            for ($j=$i-1; $j>=0; $j--) {
                if ($tmpNum < $arr[$j]) {
                    $tmp = $arr[$j];
                    $arr[$j] = $arr[$j+1];
                    $arr[$j+1] = $tmp;
                }
            }
        }
    
        return $arr;
    }
```