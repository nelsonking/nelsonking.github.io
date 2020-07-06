---
layout: post
title:  "linux file overflow"
categories: linux
tags: linux
---

* content
{:toc}

## linux du

```bash
sudo du -a --max-depth=1 | sort -n -a表示显示目录下所有的文件和文件夹（不含子目录，max-depth表示目录的深度, sort -n 标识按数值大小排序

# 用于显示目录或文件的大小。
# 会显示指定的目录或文件所占用的磁盘空间。

-a或-all 显示目录中个别文件的大小。
-b或-bytes 显示目录或文件大小时，以byte为单位。
-c或--total 除了显示个别目录或文件的大小外，同时也显示所有目录或文件的总和。
-D或--dereference-args 显示指定符号连接的源文件大小。
-h或--human-readable 以K，M，G为单位，提高信息的可读性。
-H或--si 与-h参数相同，但是K，M，G是以1000为换算单位。
-k或--kilobytes 以1024 bytes为单位。
-l或--count-links 重复计算硬件连接的文件。
-L<符号连接>或--dereference<符号连接> 显示选项中所指定符号连接的源文件大小。
-m或--megabytes 以1MB为单位。
-s或--summarize 仅显示总计。
-S或--separate-dirs 显示个别目录的大小时，并不含其子目录的大小。
-x或--one-file-xystem 以一开始处理时的文件系统为准，若遇上其它不同的文件系统目录则略过。
-X<文件>或--exclude-from=<文件> 在<文件>指定目录或文件。
--exclude=<目录或文件> 略过指定的目录或文件。
--max-depth=<目录层数> 超过指定层数的目录后，予以忽略。
--help 显示帮助。
--version 显示版本信息。
实例
```




### Linux df

```bash
df [选项]... [FILE]...
# 用于显示目前在Linux系统上的文件系统的磁盘使用情况统计。

-a, --all 包含所有的具有 0 Blocks 的文件系统
--block-size={SIZE} 使用 {SIZE} 大小的 Blocks
-h, --human-readable 使用人类可读的格式(预设值是不加这个选项的...)
-H, --si 很像 -h, 但是用 1000 为单位而不是用 1024
-i, --inodes 列出 inode 资讯，不列出已使用 block
-k, --kilobytes 就像是 --block-size=1024
-l, --local 限制列出的文件结构
-m, --megabytes 就像 --block-size=1048576
--no-sync 取得资讯前不 sync (预设值)
-P, --portability 使用 POSIX 输出格式
--sync 在取得资讯前 sync
-t, --type=TYPE 限制列出文件系统的 TYPE
-T, --print-type 显示文件系统的形式
-x, --exclude-type=TYPE 限制列出文件系统不要显示 TYPE
-v (忽略)
--help 显示这个帮手并且离开
--version 输出版本资讯并且离开
```
