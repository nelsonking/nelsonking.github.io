---
layout: post
title:  "git 清空仓库"
categories: git
tags: git
---

* content
{:toc}

### git 在不删除仓库的情况下清空仓库（小众需求）

```
# 1.切换到新的分支
git checkout --orphan tmp
## 创建一个新的 “孤儿“ 分支 该分支不继承任何分支的历史





# 2.清空文件夹下的所用东西，用新建文件夹然后移动 .git 方式比较快捷
cd ..
mv local_dir local_dir_bak
mkdir local_dir
cd local_dir
mv local_dir_bak/.git local_dir/

# 3.缓存所有文件（除了.gitignore中声名排除的）
... 各种操作之后
git add -A


# 4. 提交跟踪过的文件（Commit the changes）
git commit -am "rebuild local_dir"


# 5.删除master分支（Delete the branch）
git branch -D master

# 6.重命名当前分支为master
git branch -m master

# 7.提交到远程master分支
git push -f origin master
```

* 主要用到的功能就是 --orphan 参数
* 使用 git checkout --help 进行详细查看