---
layout: post
title:  "linux file"
categories: linux
tags: linux
---

* content
{:toc}

## linux 文件系统
inode 和 block 概述#
> * 文件是存储在硬盘上的，硬盘的最小存储单位叫做扇区sector，每个扇区存储512字节。
> * 操作系统读取硬盘的时候，不会一个个扇区地读取，这样效率太低，而是一次性连续读取多个扇区，即一次性读取一个块block。
> * 这种由多个扇区组成的块，是文件存取的最小单位。块的大小，最常见的是4KB，即连续八个sector组成一个block。

> * 文件数据存储在块中，那么还必须找到一个地方存储文件的元信息，比如文件的创建者、文件的创建日期、文件的大小等等。
> * 这种存储文件元信息的区域就叫做inode，中文译名为索引节点，也叫i节点。因此，一个文件必须占用一个inode，但至少占用一个block。




* 数据 → block

### 元信息 → inode 
inode包含很多的文件元信息，但不包含文件名，例如：字节数、属主UserID、属组GroupID、读写执行权限、时间戳等。
而文件名存放在目录当中，但Linux系统内部不使用文件名，而是使用inode号码识别文件。对于系统来说文件名只是inode号码便于识别的别称。

* 表面上，用户通过文件名打开文件，实际上，系统内部将这个过程分为三步：
> * 1.系统找到这个文件名对应的inode号码；
> * 2.通过inode号码，获取inode信息；
> * 3.根据inode信息，看用户是否具有访问的权限，有就指向对应的数据block，没有就返回权限拒绝。

* 文件名也就是文件一个链接
* 移动文件或重命名文件，只是改变文件名，不影响inode号码；
* 打开一个文件以后，系统就以inode号码来识别这个文件，不再考虑文件名。
* 所以文件名称不出来可以直接用 inode 删除

```bash
find ./* -inum 节点号 -delete
```
* 软件可以平滑热更，因为系统通过inode号码，识别运行中的文件，不通过文件名。更新的时候，新版文件以同样的文件名，生成一个新的inode，不会影响到运行中的文件。等到下一次运行这个软件的时候，文件名就自动指向新版文件，旧版文件的inode则被回收。
* 删除一个文件系统是根据inode 的引用次数判断是否删除，如果有程序在使用，系统就不会删除


#### 查看 inode 信息

```bash
ls -i /etc/passwd
1082273 /etc/passwd

stat /etc/passwd

$ stat /etc/passwd
  文件："/etc/passwd"
  大小：1218      	块：8          IO 块：4096   普通文件
设备：fd01h/64769d	Inode：1082273     硬链接：1
权限：(0644/-rw-r--r--)  Uid：(    0/    root)   Gid：(    0/    root)
最近访问：2020-06-23 17:31:01.074532572 +0800
最近更改：2020-05-12 17:30:27.045004616 +0800
最近改动：2020-05-12 17:30:27.047004684 +0800
创建时间：-
```

* inode也会消耗硬盘空间，所以格式化的时候，操作系统自动将硬盘分成两个区域。一个是数据区，存放文件数据；
* 另一个是inode区，存放inode所包含的信息。每个inode的大小，一般是128字节或256字节。通常情况下不需要关注单个inode的大小，而是需要重点关注inode总数。inode总数在格式化的时候就确定了
* 因为inode 的数量是固定的，所以服务器要对磁盘做限额，被攻击了，服务就运行不了了

```bash
df -h /data/www
## 可以查询哪些文件比较占用空间
df -hT /data/www/
文件系统       类型  容量  已用  可用 已用% 挂载点
/dev/vda1      ext4   40G   34G  3.3G   92% /

df -i /data/www 
## 可以查看节点占用
文件系统         Inode 已用(I) 可用(I) 已用(I)% 挂载点
/dev/vda1      2621440  513465 2107975      20% /
```

#### inode 定义

```c
struct inode {
	/* RCU path lookup touches following: */
	umode_t			i_mode;     //权限
	uid_t			i_uid;      //用户id
	gid_t			i_gid;      //组id
	const struct inode_operations	*i_op;
	struct super_block	*i_sb;
 
	spinlock_t		i_lock;	/* i_blocks, i_bytes, maybe i_size */
	unsigned int		i_flags;
	struct mutex		i_mutex;
 
	unsigned long		i_state;
	unsigned long		dirtied_when;	/* jiffies of first dirtying */
 
	struct hlist_node	i_hash;
	struct list_head	i_wb_list;	/* backing dev IO list */
	struct list_head	i_lru;		/* inode LRU list */
	struct list_head	i_sb_list;
	union {
		struct list_head	i_dentry;
		struct rcu_head		i_rcu;
	};
	unsigned long		i_ino;   //inode节点号
	atomic_t		i_count;
	unsigned int		i_nlink;
	dev_t			i_rdev;
	unsigned int		i_blkbits;
	u64			i_version;
	loff_t			i_size;   //文件大小
#ifdef __NEED_I_SIZE_ORDERED
	seqcount_t		i_size_seqcount;
#endif
	struct timespec		i_atime;  //最后一次访问(access)的时间
	struct timespec		i_mtime;  //最后一次修改(modify)的时间
	struct timespec		i_ctime;  //最后一次改变(change)的时间
	blkcnt_t		i_blocks;    //块数
	unsigned short          i_bytes;
	struct rw_semaphore	i_alloc_sem;
	const struct file_operations	*i_fop;	/* former ->i_op->default_file_ops */
	struct file_lock	*i_flock;
	struct address_space	*i_mapping;   //块地址映射
	struct address_space	i_data;
#ifdef CONFIG_QUOTA
	struct dquot		*i_dquot[MAXQUOTAS];
#endif
	struct list_head	i_devices;
	union {
		struct pipe_inode_info	*i_pipe;
		struct block_device	*i_bdev;
		struct cdev		*i_cdev;
	};
 
	__u32			i_generation;
 
#ifdef CONFIG_FSNOTIFY
	__u32			i_fsnotify_mask; /* all events this inode cares about */
	struct hlist_head	i_fsnotify_marks;
#endif
 
#ifdef CONFIG_IMA
	atomic_t		i_readcount; /* struct files open RO */
#endif
	atomic_t		i_writecount;
#ifdef CONFIG_SECURITY
	void			*i_security;
#endif
#ifdef CONFIG_FS_POSIX_ACL
	struct posix_acl	*i_acl;
	struct posix_acl	*i_default_acl;
#endif
	void			*i_private; /* fs or device private pointer */
}
```

#### 可以查看 文件信息

```bash
file /etc/passwd

/etc/passwd: ASCII text
```



