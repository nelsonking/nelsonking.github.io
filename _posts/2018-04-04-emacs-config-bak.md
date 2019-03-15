---
layout: post
title:  "eamcs config 备份"
categories: eamcs 
tags: eamcs
---

* content
{:toc}
## emacs org mode 维护 config 文件  




```
# -*- mode: org; coding: utf-8 -*-
#+TITLE: Emacs config using org-mode
#+AUTHOR: NelsonKing <gaoyansing@gmail.com>
#+DATE: 2013-08-15
#+STARTUP: hidestars
* Global Settings
** Common Lisp for Emacs

Some Common Lisp functions and macros can be used in Emacs Lisp programs.
#+begin_src emacs-lisp
(require 'org-install)
(require 'ob-tangle)

(defconst *hack-slime-p* nil)             ; turn off before slime working
(setq-default org-use-sub-superscripts nil); close org to html line to lowcase
(set-face-attribute 'org-level-1 nil :height 1.4 :bold t)
(set-face-attribute 'org-level-2 nil :height 1.3 :bold t)
(set-face-attribute 'org-level-3 nil :height 1.2 :bold t)
#+end_src

** User Info

My full name and mail address
#+begin_src emacs-lisp
  (setq user-full-name    "NelsonKing")
  (setq user-mail-address "gaoyansing@sina.com")
#+end_src

** Set load-path

The variable `load-path' lists all the directories where Emacs should look for Elisp files.
#+begin_src emacs-lisp
  ;; load path
  (let* ((my-lisp-dir "~/.emacs.d/site-lisp/")
         (default-directory my-lisp-dir))
    (setq load-path (cons my-lisp-dir load-path))
    (normal-top-level-add-subdirs-to-load-path))
#+end_src

** Declare global variables

#+begin_src emacs-lisp
  ;; global variables
  (defconst *is-mac-p* (eq system-type 'darwin))
  (defconst *is-win-p* (eq system-type 'windows-nt))
#+end_src

** Fonts and Encoding

#+begin_src emacs-lisp
  ;; unicad -  Universal Charset Auto Detector
  ;; http://www.emacswiki.org/emacs/Unicad
  (require 'unicad nil 'noerror)

  ;; enforce utf-8 as the default coding system
  (prefer-coding-system 'utf-8)
  (set-default-coding-systems 'utf-8)
  (set-terminal-coding-system 'utf-8)
  (set-keyboard-coding-system 'utf-8)
  (set-language-environment 'utf-8)

  (setq default-process-coding-system 
        '(euc-cn . euc-cn))
  (setq-default pathname-coding-system 'euc-cn)

  ;; backwards compatibility as default-buffer-file-coding-system
  ;; is deprecated in 23.2.
  (if (boundp 'buffer-file-coding-system)
      (setq-default buffer-file-coding-system 'utf-8)
    (setq default-buffer-file-coding-system 'utf-8))
  ;; Treat clipboard input as UTF-8 string first; compound text next, etc.
  (setq x-select-request-type '(UTF8_STRING COMPOUND_TEXT TEXT STRING))

  ;;;; 设置编辑环境
  ;; 设置为中文简体语言环境
  (set-language-environment 'Chinese-GB)
  ;; 设置emacs 使用 utf-8
  (setq locale-coding-system 'utf-8)
  ;; 设置键盘输入时的字符编码
  (set-keyboard-coding-system 'utf-8)
  (set-selection-coding-system 'utf-8)
  ;; 文件默认保存为 utf-8
  (set-buffer-file-coding-system 'utf-8)
  (set-default buffer-file-coding-system 'utf8)
  (set-default-coding-systems 'utf-8)
  ;; 解决粘贴中文出现乱码的问题
  (set-clipboard-coding-system 'utf-8)
  ;; 终端中文乱码
  (set-terminal-coding-system 'utf-8)
  (modify-coding-system-alist 'process "*" 'utf-8)
  (setq default-process-coding-system '(utf-8 . utf-8))
  ;; 解决文件目录的中文名乱码
  (setq-default pathname-coding-system 'utf-8)
  (set-file-name-coding-system 'utf-8)
  ;; 解决 Shell Mode(cmd) 下中文乱码问题
  (defun change-shell-mode-coding ()
    (progn
      (set-terminal-coding-system 'gbk)
      (set-keyboard-coding-system 'gbk)
      (set-selection-coding-system 'gbk)
      (set-buffer-file-coding-system 'gbk)
      (set-file-name-coding-system 'gbk)
      (modify-coding-system-alist 'process "*" 'gbk)
      (set-buffer-process-coding-system 'gbk 'gbk)
      (set-file-name-coding-system 'gbk)))

p  (setq system-time-locale "C")

  ;; 设置等宽字体
  (set-face-attribute 'default nil :font "MingLan_Code 14")

  (mapc
   (lambda (face)
     (set-face-attribute face nil :weight 'normal :underline nil))
   (face-list))

  ;; 设置标题序列号
  (setq org-export-with-section-numbers 2)
  ;; 关闭下划线转译
  (setq-default org-use-sub-superscripts nil)


#+end_src

** ELPA
ELPA is the Emacs Lisp Package Archive, now included in Emacs 24.
#+begin_src emacs-lisp
  (require 'package)
  (setq package-archives
        '(
          ("gnu" . "http://elpa.gnu.org/packages/")
          ("marmalade" . "http://marmalade-repo.org/packages/")
          ("org"       . "http://orgmode.org/elpa/")
          ("melpa" . "http://melpa.milkbox.net/packages/")
          ))
  (package-initialize)

#+end_src

#+RESULTS:
** Basic UI Settings

#+begin_src emacs-lisp
    (when window-system
      (setq frame-title-format '(buffer-file-name "%f" ("%b")))
      (tool-bar-mode -1)
      (tooltip-mode -1)
      (menu-bar-mode -1)
      (set-scroll-bar-mode nil)
      (mouse-wheel-mode t)
      (blink-cursor-mode -1))

    (setq frame-title-format "%f");; 设置标题栏
    (setq-default line-spacing 4);; 行距

    ;; clean mode line
    (defvar mode-line-cleaner-alist
      `((abbrev-mode    . "")
        (undo-tree-mode . "")
        (paredit-mode   . " Pa")
        ;; Major modes
        (lisp-interaction-mode . "λ")
        (cperl-mode            . "pl")
        (python-mode           . "py")
        (ruby-mode             . "rb")
        (emacs-lisp-mode       . "El")
        (js2-mode              . "js2")))
    (defun clean-mode-line ()
      (interactive)
      (loop for cleaner in mode-line-cleaner-alist
            do (let* ((mode (car cleaner))
                     (mode-str (cdr cleaner))
                     (old-mode-str (cdr (assq mode minor-mode-alist))))
                 (when old-mode-str
                     (setcar old-mode-str mode-str))
                   ;; major mode
                 (when (eq mode major-mode)
                   (setq mode-name mode-str)))))
    (add-hook 'after-change-major-mode-hook 'clean-mode-line)

    ;; display time on mode-line
    (setq display-time-day-and-date t)
    (setq display-time-format "%m/%d %H:%M")          ;; 11/10 15:26
    ;; (setq display-time-format "%a %d %b %I:%M %p") ;; Fri 10 Nov 3:26 PM
    ;; (setq display-time-format "%a %d %b %H:%M")    ;; Fri 10 Nov 15:26
    (display-time)

    (setq column-number-mode t)        ;; display column number
    (global-hl-line-mode t)            ;; highlight current line

  ;; 配色方案
  (when window-system
    (require 'color-theme)
    (color-theme-calm-forest)
    )

    ;; org mode style
    (setq org-html-head "<link rel=\"stylesheet\" type=\"text/css\" href=\"./orgstyle.css\" />")

    (require 'powerline)

    (custom-set-faces
     '(mode-line ((t (:foreground "#030303" :background "#3C94DE" :box nil))))
     '(mode-line-inactive ((t (:foreground "#f9f9f9" :background "#666666" :box nil)))))
#+end_src

** Window and Frame

#+begin_src emacs-lisp
  ;; frame demostration
  (defun set-frame-size-according-to-resolution ()
    (interactive)
    (when window-system
      (if (> (x-display-pixel-width) 1280)
          (add-to-list 'default-frame-alist (cons 'width 100))
        (add-to-list 'default-frame-alist (cons 'width 80)))
      (add-to-list 'default-frame-alist (cons 'height 35))))
  (set-frame-size-according-to-resolution)
  ;; frame postition
  (setq initial-frame-alist '((top . 30) (left . 100)))
  
  ;; Maximize emacs frames vertically or horizontally
  (when window-system
    (require 'maximize nil 'noerror)
    (global-set-key [f9]  'maximize-toggle-frame-vmax)
    (global-set-key [f11] 'maximize-toggle-frame-hmax))
#+end_src

** Usefull Packages
*** ibuffer

#+begin_src emacs-lisp
  ;; ibuffer
  (when (require 'ibuffer nil 'noerror)
    (global-set-key (kbd "C-x C-b") 'ibuffer)
    (setq ibuffer-saved-filter-groups
          (quote (("default"
                   ("dired" (mode . dired-mode))
                   ("perl"  (mode . cperl-mode))
                   ("erc"   (mode . erc-mode))
                   ("planner"
                    (or
                     (name . "^\\*Calendar\\*$")
                     (name . "^diary$")
                     (mode . muse-mode)))
                   ("emacs"
                    (or
                     (name . "^\\*scratch\\*$")
                     (name . "^\\*Messages\\*$")))
                   ("gnus"
                    (or
                     (mode . message-mode)
                     (mode . bbdb-mode)
                     (mode . mail-mode)
                     (mode . gnus-group-mode)
                     (mode . gnus-summary-mode)
                     (mode . gnus-article-mode)
                     (name . "^\\.bbdb$")
                     (name . "^\\.newsrc-dribble"))))))))
  (add-hook 'ibuffer-mode-hook
            (lambda ()
              (ibuffer-switch-to-saved-filter-groups "default")))
#+end_src

*** recentf
#+BEGIN_SRC emacs-lisp
  (when (require 'recentf nil 'noerror)
    (recentf-mode 1)
    (setq recentf-max-saved-items 500)
    (setq recentf-max-menu-items 60)
    (setq recentf-save-file "~/.emacs.d/recentf"))
#+END_SRC
*** undo-tree

#+begin_src emacs-lisp
  ;; undo-tree
  (when (require 'undo-tree nil 'noerror)
       (global-undo-tree-mode 1)
       (defalias 'redo 'undo-tree-redo)
       (global-set-key (kbd "C-z") 'undo)
       (global-set-key (kbd "C-S-z") 'redo))
#+end_src
*** Helm
#+BEGIN_SRC emacs-lisp
  ;; Locate helm 
  (require 'helm-config)
  (setq helm-mode t)

  ;; Locate the helm-swoop folder to your path
  (require 'helm)
  (require 'helm-swoop)

  ;; Change the keybinds to whatever you like :)
  (global-set-key (kbd "M-i") 'helm-swoop)
  (global-set-key (kbd "M-I") 'helm-swoop-back-to-last-point)
  (global-set-key (kbd "C-c M-i") 'helm-multi-swoop)
  (global-set-key (kbd "C-x M-i") 'helm-multi-swoop-all)
  (global-set-key (kbd "M-x") 'helm-M-x)
  (global-set-key (kbd "C-x C-b") 'helm-buffers-list)
  (global-set-key (kbd "C-x C-f") 'helm-find-files)
  (global-set-key (kbd "C-x rl") 'helm-bookmarks)
  (global-set-key (kbd "M-y") 'helm-show-kill-ring)

  ;; When doing isearch, hand the word over to helm-swoop
  (define-key isearch-mode-map (kbd "M-i") 'helm-swoop-from-isearch)
  ;; From helm-swoop to helm-multi-swoop-all
  (define-key helm-swoop-map (kbd "M-i") 'helm-multi-swoop-all-from-helm-swoop)
  ;; When doing evil-search, hand the word over to helm-swoop
  ;; (define-key evil-motion-state-map (kbd "M-i") 'helm-swoop-from-evil-search)

  ;; Instead of helm-multi-swoop-all, you can also use helm-multi-swoop-current-mode
  (define-key helm-swoop-map (kbd "M-m") 'helm-multi-swoop-current-mode-from-helm-swoop)

  ;; Move up and down like isearch
  (define-key helm-swoop-map (kbd "C-r") 'helm-previous-line)
  (define-key helm-swoop-map (kbd "C-s") 'helm-next-line)
  (define-key helm-multi-swoop-map (kbd "C-r") 'helm-previous-line)
  (define-key helm-multi-swoop-map (kbd "C-s") 'helm-next-line)

  ;; Save buffer when helm-multi-swoop-edit complete
  (setq helm-multi-swoop-edit-save t)

  ;; If this value is t, split window inside the current window
  (setq helm-swoop-split-with-multiple-windows nil)

  ;; Split direcion. 'split-window-vertically or 'split-window-horizontally
  (setq helm-swoop-split-direction 'split-window-vertically)

  ;; If nil, you can slightly boost invoke speed in exchange for text color
  (setq helm-swoop-speed-or-color nil)

  ;; ;; Go to the opposite side of line from the end or beginning of line
  (setq helm-swoop-move-to-line-cycle t)

  ;; Optional face for line numbers
  ;; Face name is `helm-swoop-line-number-face`
  (setq helm-swoop-use-line-number-face t)

  ;; If you prefer fuzzy matching
  (setq helm-swoop-use-fuzzy-match t)

#+END_SRC
*** recentf

#+begin_src emacs-lisp
  ;; recent files
  (when (require 'recentf nil 'noerror)
    (recentf-mode 1)
    (setq recentf-max-saved-items 500)
    (setq recentf-max-menu-items 60)
    (setq recentf-save-file "~/.emacs.d/recentf"))
#+end_src

** Misc Settings

#+begin_src emacs-lisp
  ;; quiet, please! No dinging!
  (setq visible-bell t)
  (setq ring-bell-function (lambda () t))

  ;; get rid of the default messages on startup
  (setq initial-scratch-message nil)
  (setq inhibit-startup-message t)
  (setq inhibit-startup-echo-area-message t)

  ;; make the last line end in a carriage return
  (setq require-final-newline t)
  ;; will disallow creation of new lines when you press the "arrow-down key"
  ;; at end of the buffer
  (setq next-line-add-newlines t)

  (setq x-select-enable-clipboard t) ;; use clipboard
  ;; 加大kill ring，防止出错后无法回滚文档
  (setq kill-ring-max 1024)
  (setq max-lisp-eval-depth 40000)
  (setq max-specpdl-size 10000)
  (setq undo-outer-limit 5000000)
  (setq message-log-max t)
  (setq eval-expression-print-length nil)
  (setq eval-expression-print-level nil)
  (setq global-mark-ring-max 1024)
  (setq history-delete-duplicates t)
  (setq default-fill-column 90)           ;; 每行填充的长度
  (setq tab-always-indent t)
  (setq-default indent-tabs-mode nil)     ;; use space instead of tab
  (setq default-tab-width 4)
  (setq-default major-mode 'text-mode)

  ;; disable line wrap
  (setq default-truncate-lines t)
  ;; make side by side buffers function the same as the main window
  (setq truncate-partial-width-windows nil)

  ;; get rid of yes-or-no questions - y or n is enough
  (fset 'yes-or-no-p 'y-or-n-p)
  ;; confirm on quitting emacs
  (setq confirm-kill-emacs 'yes-or-no-p)

  ;; sentence-end
  ;; 设置sentence-end可以识别中文标点
  (setq sentence-end
        "\\([。！？]\\|……\\|[.?!][]\"')}]*\\($\\|[ \t]\\)\\)[ \t\n]*")
  (setq sentence-end-double-space nil)

  ;; recursive minibuffers
  ;; 可以递归使用minibuffer
  (setq enable-recursive-minibuffers t)

  ;; 防止页面滚动时跳动，scroll-margin 1
  (setq scroll-step 1
        scroll-conservatively 10000)

  ;; text-mode default
  ;; 把默认的major mode设置为 text-mode
  (setq default-major-mode 'text-mode)

  ;; follow-mode allows easier editing of long files
  (follow-mode t)

  ;; show matched parentheses
  ;; 显示匹配的括号，而不是跳到另一个括号
  (show-paren-mode t)
  ;; highlight just brackets
  (setq show-paren-style 'parenthesis)
  ;; highlight entire bracket expression
  ;; (setq show-paren-style 'expression)
  ;; typing any left bracket automatically insert the right matching bracket
  ;; new feature in Emacs 24
  (electric-pair-mode t)
  ;; setting for auto-close brackets for electric-pair-mode
  ;; regardless of current major mode syntax table
  (setq electric-pair-pairs '(
                              (?\" . ?\")
                              (?\{ . ?\})
                              ))

  ;; mouse avoidance
  ;; banish, exile, jump, animate,
  ;; cat-and-mouse, proteus
  ;; 光标靠近鼠标指针时，让鼠标指针自动让开，别挡住视线
  (mouse-avoidance-mode 'animate)
  ;; 让emacs可以直接打开和显示图片
  (auto-image-file-mode)
  ;; 语法加量
  (global-font-lock-mode t)               ;; syntax
  ;; 高亮拷贝区域
  (transient-mark-mode t)                 ;; highlight mark area
  (setq shift-select-mode t)              ;; hold shift to mark area
  (delete-selection-mode 1)               ;; overwrite selection

  ;; enable some figures
  (put 'set-goal-column 'disabled nil)
  (put 'narrow-to-region 'disabled nil)
  (put 'upcase-region 'disabled nil)
  (put 'downcase-region 'disabled nil)

  ;; when in Mac OS X, alt is alt, command is meta
  ;; however, qq and some apps use command key frequently
  ;; drop it...
  ;; (when (string-equal system-type 'darwin)
  ;;   (setq mac-option-key-is-meta nil)
  ;;   (setq mac-command-key-is-meta t)
  ;;   (setq mac-command-modifier 'meta)
  ;;   (setq mac-option-modifier nil))

  ;; 把一些默认禁用的功能打开
  (put 'set-goal-column 'disabled nil)
  (put 'narrow-to-region 'disabled nil)
  (put 'upcase-region 'disabled nil)
  (put 'downcase-region 'disabled nil)
  (put 'LaTeX-hide-environment 'disabled nil)

  ;; 设置备份时的版本控制
  (setq version-control t)
  (setq kept-new-versions 3)
  (setq delete-old-versions t)
  (setq kept-old-versions 2)
  (setq dired-kept-versions 1)
  ;; 如果不想自动备份文件，可以把上面的配置注释
  ;; 打开下面的配置：
  ;;
  ;; 不自动生成备份文件
  (setq-default make-backup-files nil)

  ;; 让 dired 可以递归地拷贝和删除目录
  (setq dired-recursive-copies 'top)
  (setq dired-recursive-deletes 'top)

#+end_src

* Coding
** js2-mode

js2-mode by SteveYegge is arguably the best JavaScript mode available for emacs. It has very accurate syntax highlighting, supports newer JavaScript extensions implemented in SpiderMonkey, and highlights syntax errors as you type.
#+begin_src emacs-lisp
  ;;; js2-mode --- Improved JavaScript editing mode
  (autoload 'js2-mode "js2-mode")
  (add-to-list 'auto-mode-alist '("\\.js$" . js2-mode))
#+end_src
** c & cpp

Major mode for editing c and cpp files.
#+begin_src emacs-lisp
  (add-hook 'c-mode-common-hook
            (lambda ()
              (turn-on-auto-fill)
              (setq comment-column 60)
              (modify-syntax-entry ?_ "w")     ; now '_' is not considered a word-delimiter
              (c-set-style "ellemtel")         ; set indentation style
              (local-set-key [(control tab)]   ; move to next tempo mark
                             'tempo-forward-mark)))
  (setq auto-mode-alist
        (append '(("\\.h$" . c++-mode)) auto-mode-alist))
#+end_src

** php
#+BEGIN_SRC emacs-lisp
  ;;加载php-mode
  (require 'php-mode)
  ;;根据文件扩展名自动php-mode
  (add-to-list 'auto-mode-alist '("\\.php[34]?\\'\\|\\.phtml\\'" . php-mode))
  ;;开发项目时，php源文件使用其他扩展名
  (add-to-list 'auto-mode-alist '("\\.module\\'" . php-mode))
  (add-to-list 'auto-mode-alist '("\\.inc\\'" . php-mode))

  (define-key php-mode-map  
    [menu-bar php php-run]  
    '("Run PHP" . php-run))  

  (when (string-equal system-type 'darwin)
    (defun php-run ()  
      (interactive)  
      (message buffer-file-name)  
      (shell-command  
       (concat "php -f \""  
               (buffer-file-name)  
               "\"")))  
    )

  (when (string-equal system-type 'windows-nt)
    (defun php-run ()  
      (interactive)  
      (message buffer-file-name)  
      (shell-command  
       (concat "d:/php/php -f \""  
               (buffer-file-name)  
               "\"")))  
    )


  ;;这里是绑定函数到快捷键C+c r  

  (defun my-php-mode()  
    (define-key php-mode-map [(control x) (control e)] 'php-run)  
                                          ;(define-key php-mode-map [(control c) (d)] 'php-debug)  
    (hs-minor-mode t)  
    (linum-mode t)  
    (flymake-mode t) ;; 开启语法检测
    )  

  (add-hook 'php-mode-hook 'my-php-mode)

#+END_SRC

* org-mode

Org mode is for keeping notes, maintaining TODO lists, planning projects, and authoring documents with a fast and effective plain-text system.
#+begin_src emacs-lisp
  (require 'org)
  (require 'remember)
  (require 'org-mouse)

  ;; I want files with the extension ".org" to open in org-mode.
  (add-to-list 'auto-mode-alist
               '("\\.\\(org\\|org_archive\\|txt\\)$" . org-mode))

  ;; Some basic keybindings.
  (global-set-key "\C-cl" 'org-store-link)
  (global-set-key "\C-ca" 'org-agenda)
  (global-set-key "\C-cr" 'org-remember)

  ;; a basic set of keywords to start out
  (setq org-todo-keywords
        '((sequence "TODO(t)" "STRT(s)" "|" "DONE(d)")
          (sequencep "WAIT(w@/!)" "|" "CANL(c@/!)")))

  (setq org-todo-keyword-faces
        '(("TODO" :foreground "red" :weight bold)
          ("DONE" :foreground "forest green" :weight bold)
          ("WAIT" :foreground "orange" :weight bold)
          ("CANL" :foreground "forest green" :weight bold)))

  ;; I use org's tag feature to implement contexts.
  (setq org-tag-alist '(("OFFICE"  . ?o)
                        ("HOME"    . ?h)
                        ("SERVER"  . ?s)
                        ("PROJECT" . ?p)))

  ;; I put the archive in a separate file, because the gtd file will
  ;; probably already get pretty big just with current tasks.
  (setq org-archive-location "%s_archive::")

  (defun org-summary-todo (n-done n-not-done)
    "Switch entry to DONE when all subentries are done, to TODO otherwise."
    (let (org-log-done org-log-states)   ; turn off logging
      (org-todo (if (= n-not-done 0) "DONE" "TODO"))))
  (add-hook 'org-after-todo-statistics-hook 'org-summary-todo)

#+end_src

* Global-key-band
#+BEGIN_SRC emacs-lisp
  (global-set-key (kbd "C-S-E") 'recentf-open-files)
#+END_SRC
* Misc and Others
** MarkDown
#+BEGIN_SRC emacs-lisp
  (autoload 'markdown-mode "markdown-mode"
      "Major mode for editing Markdown files" t)
  (add-to-list 'auto-mode-alist '("\\.text\\'" . markdown-mode))
  (add-to-list 'auto-mode-alist '("\\.markdown\\'" . markdown-mode))
  (add-to-list 'auto-mode-alist '("\\.md\\'" . markdown-mode))
#+END_SRC
* emacs server
Allow access form emacsclient.
#+begin_src emacs-lisp
  (require 'server)
  (unless (server-running-p)
    (server-start))
#+end_src
```