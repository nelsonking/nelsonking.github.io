---
layout: post
title:  "eamcs 折叠行"
categories: eamcs 
tags: eamcs 折叠行
---

* content
{:toc}

### emacs自带HideShow mode.
* 使用 M-x hs-minor-mode 开启 HideShow mode.




###主要的功能：

#### For Emacs 21 or latter:
* C-c @ C-M-s 显示所有的代码
* C-c @ C-M-h 折叠所有的代码
* C-c @ C-s 显示当前代码区
* C-c @ C-h 折叠当前代码区
* C-c @ C-c 折叠/显示当前代码区

#### For Emacs 20:
* C-c S show all 显示所有的代码
* C-c H hide all 折叠所有的代码
* C-c s show block 显示当前代码区
* C-c h hide block 折叠当前代码区

### 写入配置文件
```
(load-library "hideshow")
  (global-set-key (kbd "C-=") 'hs-toggle-hiding)
  (global-set-key (kbd "C-\\") 'toggle-selective-display)

  (add-hook 'c-mode-common-hook   'hs-minor-mode)
  (add-hook 'emacs-lisp-mode-hook 'hs-minor-mode)
  (add-hook 'java-mode-hook       'hs-minor-mode)
  (add-hook 'lisp-mode-hook       'hs-minor-mode)
  (add-hook 'perl-mode-hook       'hs-minor-mode)
  (add-hook 'sh-mode-hook         'hs-minor-mode)
  (add-hook 'php-mode-hook       'hs-minor-mode)
  (add-hook 'js2-mode-hook       'hs-minor-mode)
```

[source at https://www.emacswiki.org/emacs/HideShow](https://www.emacswiki.org/emacs/HideShow)