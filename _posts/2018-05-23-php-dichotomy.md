---
layout: post
title:  "php 二分法查找"
categories: php 
tags: php dichotomy
---

* content
{:toc}

## php 二分法查找




```php
array = [1,2,3,4,5,6,7,8,9];

var_dump(bin_search($array, 4));

/**
 * 二分法查找
 * @param $array
 * @return int
 */

function bin_search($array, $search)
{
    $len = count($array);
    $low = 0;
    $height = $len -  1;
    $index = 0;

    while ($height >= $low) {
        $midIndex = intval(($height + $low) / 2);

        if ($array[$midIndex] == $search) return $midIndex;

        if ($array[$midIndex] > $search) {
            $height = $midIndex - 1;
        } else {
            $low = $midIndex + 1;
        }

        $index += 1;
    }
}
```