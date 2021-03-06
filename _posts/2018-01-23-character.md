---
layout: post
title:  "字符编码"
categories: 字符编码
tags: 字符编码
---

* content
{:toc}

## utf8 和 utf8mb4 的区别
MySQL在5.5.3之后增加了这个utf8mb4的编码，mb4就是most bytes 4的意思，专门用来兼容四字节的unicode。utf8mb4是utf8的超集，除了将编码改为utf8mb4外不需要做其他转换。




### 为什么会出现 utf8mb4
最初的 UTF-8 格式使用一至六个字节，最大能编码 31 位字符。最新的 UTF-8 规范只使用一到四个字节，最大能编码21位，能够表示所有的 17个 Unicode 平面。
   
为了获取更好的兼容性，应该总是使用 utf8mb4 而非 utf8.  对于 CHAR 类型数据，utf8mb4 会多消耗一些空间，根据 Mysql 官方建议，使用 VARCHAR  替代 CHAR。   

> 简单来说数据库若设置为utf8则无法插入4字节的宽字符，一些小表情无法保存

### 知识点
* Unicode（万国码、国际码、统一码、单一码）是计算机科学领域里的一项业界标准。它对世界上大部分的文字系统进行了整理、编码，使得电脑可以用更为简单的方式来呈现和处理文字。

* Unicode的实现方式不同于编码方式。一个字符的Unicode编码是确定的。但是在实际传输过程中，由于不同系统平台的设计不一定一致，以及出于节省空间的目的，对Unicode编码的实现方式有所不同。
  Unicode的实现方式称为Unicode转换格式（Unicode Transformation Format，简称为UTF）。

* UTF-8 使用一至六个字节为每个字符编码 (一种变长编码，它将基本7位ASCII字符仍用7位编码表示，占用一个字节（首位补0)（2003年11月UTF-8被RFC 3629重新规范，只能使用原来Unicode定义的区域，U+0000到U+10FFFF，也就是说最多四个字节）。  

* Unicode 辅助平面  原有的16位元空间不足以应用，从 Unicode 3.1 版本开始，设立了16个辅助平面，使 Unicode 的可使用空间由六万多字增至约一百万字。原有的 Unicode 空间称为基本平面或基本多文种平面 (Basic Multilingual Plane, 简称 BMP)。辅助平面字符要用上4字节来储存。

* > 第一辅助平面，(Supplementary Multilingual Plane, 简称SMP)，摆放拼音文字（主要为现时已不再使用的文字）及符号。范围在 U+10000 - U+1FFFD 。以下是它们的编码表。
    10000-10FFF - 12000-12FFF - 1D000-1DFFF 
    
* > 第二辅助平面，又称为表意文字补充平面 (Supplementary Ideographic Plane, 简称SIP)，整个范围在 U+20000 - U+2FFFD 。现时摆放“中日韩统一表意文字扩展B区”，共43,253个汉字，以及中日韩兼容表意文字增补 (CJK Compatibility Ideographs Supplement)。以下是它们的编码表。
    20000-20FFF - 21000-21FFF - 22000-22FFF - 23000-23FFF - 24000-24FFF - 25000-25FFF - 26000-26FFF - 27000-27FFF - 28000-28FFF - 29000-29FFF - 2A000-2AFFF - 2F000-2FFFF
    

* 字符集（Character Set）

字面上的理解就是字符的集合，例如ASCII字符集，定义了128个字符；GB2312定义了7445个字符。而计算机系统中提到的字符集准确来说，指的是已编号的字符的有序集合（不一定是连续）。

* 字符码（Code Point）

指的就是字符集中每个字符的数字编号。例如ASCII字符集用0-127这连续的128个数字分别表示128个字符；GBK字符集使用区位码的方式为每个字符编号，首先定义一个94X94的矩阵，行称为“区”，列称为“位”，然后将所有国标汉字放入矩阵当中，这样每个汉字就可以用唯一的“区位”码来标识了。例如“中”字被放到54区第48位，因此字符码就是5448。而Unicode中将字符集按照一定的类别划分到0~16这17个层面（Planes）中，每个层面中拥有216=65536个字符码，因此Unicode总共拥有的字符码，也即是Unicode的字符空间总共有17*65536=1114112。
编码的过程是将字符转换成字节流。
解码的过程是将字节流解析为字符。

* 字符编码（Character Encoding）

是将字符集中的字符码映射为字节流的一种具体实现方案。例如ASCII字符编码规定使用单字节中低位的7个比特去编码所有的字符。例如‘A’的编号是65，用单字节表示就是0x41，因此写入存储设备的时候就是b’01000001’。GBK编码则是将区位码（GBK的字符码）中的区码和位码的分别加上0xA0（160）的偏移（之所以要加上这样的偏移，主要是为了和ASCII码兼容），例如刚刚提到的“中”字，区位码是5448，十六进制是0x3630，区码和位码分别加上0xA0的偏移之后就得到0xD6D0，这就是“中”字的GBK编码结果。

* 代码页（Code Page）一种字符编码具体形式

早期字符相对少，因此通常会使用类似表格的形式将字符直接映射为字节流，然后通过查表的方式来实现字符的编解码。现代操作系统沿用了这种方式。例如Windows使用936代码页、Mac系统使用EUC-CN代码页实现GBK字符集的编码，名字虽然不一样，但对于同一汉字的编码肯定是一样的。

* 大小端

大小端的说法源自《格列佛游记》。我们知道，鸡蛋通常一端大一端小，小人国的人们对于剥蛋壳时应从哪一端开始剥起有着不一样的看法。同样，计算机界对于传输多字节字（由多个字节来共同表示一个数据类型）时，是先传高位字节（大端）还是先传低位字节（小端）也有着不一样的看法，这就是计算机里头大小端模式的由来了。无论是写文件还是网络传输，实际上都是往流设备进行写操作的过程，而且这个写操作是从流的低地址向高地址开始写（这很符合人的习惯），对于多字节字来说，如果先写入高位字节，则称作大端模式。反之则称作小端模式。也就是说，大端模式下，字节序和流设备的地址顺序是相反的，而小端模式则是相同的。一般网络协议都采用大端模式进行传输，windows操作系统采用Utf-16小端模式。   

* Unicode是两个字节吗？

Unicode只是定义了一个庞大的、全球通用的字符集，并为每个字符规定了唯一确定的编号，具体存储为什么样的字节流，取决于字符编码方案。推荐的Unicode编码是UTF-16和UTF-8。   

* 带签名的UTF-8指的是什么意思？

带签名指的是字节流以BOM标记开始。很多软件会“智能”的探测当前字节流使用的字符编码，这种探测过程出于效率考虑，通常会提取字节流前面若干个字节，看看是否符合某些常见字符编码的编码规则。由于UTF-8和ASCII编码对于纯英文的编码是一样的，无法区分开来，因此通过在字节流最前面添加BOM标记可以告诉软件，当前使用的是Unicode编码，判别成功率就十分准确了。但是需要注意，不是所有软件或者程序都能正确处理BOM标记，例如PHP就不会检测BOM标记，直接把它当普通字节流解析了。因此如果你的PHP文件是采用带BOM标记的UTF-8进行编码的，那么有可能会出现问题。   

* Unicode编码和以前的字符集编码有什么区别？

早期字符编码、字符集和代码页等概念都是表达同一个意思。例如GB2312字符集、GB2312编码，936代码页，实际上说的是同个东西。但是对于Unicode则不同，Unicode字符集只是定义了字符的集合和唯一编号，Unicode编码，则是对UTF-8、UCS-2/UTF-16等具体编码方案的统称而已，并不是具体的编码方案。所以当需要用到字符编码的时候，你可以写gb2312，codepage936，utf-8，utf-16
