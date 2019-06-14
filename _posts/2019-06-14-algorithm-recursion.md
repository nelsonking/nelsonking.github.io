---
layout: post
title:  "递归记录"
categories: 递归
tags: 算法 递归
---

* content
{:toc}
## 使用递归一些记录
* 函数递归实质上是一个入栈的过程
* 栈的特点是先入后出




### 运行机制
通过栈机制 把递归过程中的 函数 和 它的符号 入栈
出栈时对这些 符号 和 函数 返回值等进行运算

#### 实例分析
通过递归查找一个节点的子节点 

* 过程如下
>* 写一个函数
>* 在这个函数里面写终止条件
>* 通过一个符号来连接这些返回的函数


```php
$array = [
    ['id'  => 1, 'pid' => 0],
    ['id'  => 2, 'pid' => 1],
    ['id'  => 3, 'pid' => 2],
    ['id'  => 4, 'pid' => 3],
];

function findChild($array, $pidArray)
{
    $tmpArray = [];
    foreach ($array as $key => $value) {
        if (in_array($value['pid'], $pidArray)) {
            $tmpArray[] = $value['id'];
        }
    }

    // 这里是关键， 为什么会合并，递归的入栈保留所有结构，即已第一个入栈的方法为最终的返回方法
    if ($tmpArray) {
        dump($tmpArray);
        return array_merge($tmpArray, findChild($array, $tmpArray));
    }

    return [];
}

$result = findChild($array, [1]);
```

#### 我们来按入栈步骤一点点分析
```php
第一次运行  $tmpArray = [2] 非空 递归 入栈

| return array_merge[[2], ? ] |

第二次运行 $tmpArray = [3] 非空 递归 入栈

| return array_merge[[3], ? ] |
| return array_merge[[2], ? ] |

第三次运行 $tmpArray = [4] 非空 递归 入栈

| return array_merge[[4], ? ] |
| return array_merge[[3], ? ] |
| return array_merge[[2], ? ] |

第四次运行 $tmpArray = [] 空 结束 出栈 

从上到下依次执行 
类似这样 array_merge([2],array_merge([3], array_merge([4],[])))

结果为 【2，3，4，】

```




