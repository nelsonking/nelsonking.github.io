---
layout: post
title:  "mysql 为什么InnoDB 一定要有主键"
categories: mysql
tags: mysql
---

* content
{:toc}

## 为什么InnoDB 一定要有主键
我们都知道每个InnoDB存储引擎表都有一个聚簇索引，在有主键的情况下，主键索引就是这个聚簇索引。MySQL 官方文档（14.6.2.1 Clustered and Secondary Indexes）有说明：
> 如果表没有主键，甚至都没有唯一键索引的话，InnoDB 内部会基于一个包含了 ROW_ID 值的列生成一个隐式的聚簇索引，行都会根据这个 ROW_ID 排序。ROW_ID 是一个6个字节，即48位的单调递增字段。有新数据插入时，就会生成一个新的递增的 ROW_ID。所以，根据 ROW_ID 排序的行，本质上是按照插入顺序排序。
* 需要说明的是，这个单调递增的 ROW_ID，和我们平时申明主键时指定 AUTO_INCREMENT 的实现逻辑是完全不一样的。
* 聚集索引上的值可以改动的话，那么也会触发物理磁盘上的移动，于是就可能出现page分裂，表碎片横生。
* 次级索引的叶子节点并不存储行数据的物理地址。而是存储的该行的主键值。[次级索引参见](https://www.cnblogs.com/lpfuture/p/4577247.html)
> * 所以：一次级索引包含了两次查找。一次是查找次级索引自身。然后查找主键（聚集索引）

### 隐式ROW_ID实现
在没有主键也没有一个非空唯一键的 InnoDB 表中自动添加的被称为 ROW_ID 的列，既不能被任何查询访问，也不能被内部（例如基于行的复制）使用。
* 所有用ROW_ID列的表，共享同一个被保存在数据字典中的全局序列数，且下一个将要使用的值被保存在系统表空间的page 7（type SYS），数据字段头里（字段名为 DICT_HDR_ROW_ID）。
这个全局序列计数器被dict_sys->mutex保护它的线程安全问题，在include/dict0boot.ic中的核心实现源码如下：
```php
UNIV_INLINE
row_id_t
dict_sys_get_new_row_id(void)
/*=========================*/
{
    row_id_t        id;
    mutex_enter(&(dict_sys->mutex));
    id = dict_sys->row_id;
    if (0 == (id % DICT_HDR_ROW_ID_WRITE_MARGIN)) {
            dict_hdr_flush_row_id();
    }
    dict_sys->row_id++;
    mutex_exit(&(dict_sys->mutex));
    return(id);
}
```

这段代码对row_id只是一味的递增，没有任何48位溢出的保护。事实上也没有必要，因为即使只有48位，假设每秒插入10万次，需要90年才会耗尽ROW_ID的48位空间。所以，基本上够用！

#### 如何保证不冲突
我们从这段代码可知，每生成256次ROW_ID，计数器就会被刷到磁盘持久化（dict_hdr_flush_row_id()），这个频率通过字段 DICT_HDR_ROW_ID_WRITE_MARGIN 定义，并且被保存在事务日志中。
在启动的时候，InnoDB 将保存在磁盘上的 DICT_HDR_ROW_ID 增加256，这样就能确保已经生成的ID，不管是否被持久化到磁盘上，都会小于新生成的值，所以生成的ID不会有任何冲突。

#### 性能问题
InnoDB中很多地方的代码，包括刚才提到的 ROW_ID的 生成都是通过保证线程安全问题，因此，我可以说任何用ROW_ID作为隐式聚簇索引键的表，都可能随机性的碰到插入停顿问题。
多张这种表并行插入就会遇到性能限制，因为共享计数器的共享互斥锁和缓存争用是串行的。此外，每生成256个ID就会需要日志写入和刷新，这些都会引起性能毛刺问题。
