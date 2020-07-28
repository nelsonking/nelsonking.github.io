---
layout: post
title:  "php socket"
categories: php 
tags: php socket
---

* content
{:toc}

## php socket
Socket是应用层与TCP/IP协议族通信的中间软件抽象层，它是一组接口。在设计模式中，Socket其实就是一个门面模式，它把复杂的TCP /IP协议族隐藏在Socket接口后面。



### socket 相关函数
```php
socket_accept() 接受一个Socket连接
socket_bind() 把socket绑定在一个IP地址和端口上
socket_clear_error() 清除socket的错误或者最后的错误代码
socket_close() 关闭一个socket资源
socket_connect() 开始一个socket连接
socket_create_listen() 在指定端口打开一个socket监听
socket_create_pair() 产生一对没有区别的socket到一个数组里
socket_create() 产生一个socket，相当于产生一个socket的数据结构

socket_get_option() 获取socket选项
socket_getpeername() 获取远程类似主机的ip地址
socket_getsockname() 获取本地socket的ip地址

socket_iovec_add() 添加一个新的向量到一个分散/聚合的数组
socket_iovec_alloc() 这个函数创建一个能够发送接收读写的iovec数据结构
socket_iovec_delete() 删除一个已经分配的iovec
socket_iovec_fetch() 返回指定的iovec资源的数据
socket_iovec_free() 释放一个iovec资源
socket_iovec_set() 设置iovec的数据新值

socket_last_error() 获取当前socket的最后错误代码
socket_listen() 监听由指定socket的所有连接

socket_read() 读取指定长度的数据
socket_readv() 读取从分散/聚合数组过来的数据
socket_recv() 从socket里结束数据到缓存
socket_recvfrom() 接受数据从指定的socket，如果没有指定则默认当前socket
socket_recvmsg() 从iovec里接受消息

socket_select() 多路选择
socket_send() 这个函数发送数据到已连接的socket
socket_sendmsg() 发送消息到socket
socket_sendto() 发送消息到指定地址的socket
socket_set_block() 在socket里设置为块模式
socket_set_nonblock() socket里设置为非块模式
socket_set_option() 设置socket选项
socket_shutdown() 这个函数允许你关闭读、写、或者指定的socket
socket_strerror() 返回指定错误号的详细错误

socket_write() 写数据到socket缓存
socket_writev() 写数据到分散/聚合数组
```


#### socket 服务端 测试

```php
<?php
    //创建服务端的socket套接流,net协议为IPv4，protocol协议为TCP
    $socket = socket_create(AF_INET,SOCK_STREAM,SOL_TCP);

    /*绑定接收的套接流主机和端口,与客户端相对应;端口可以自定义，前提是没有被占用*/
    if(socket_bind($socket,'127.0.0.1',8888) == false){
        echo 'server bind fail:'.socket_strerror(socket_last_error());
        /*这里的127.0.0.1是在本地主机测试，你如果有多台电脑，可以写IP地址*/
    }

    //监听套接流
    if(socket_listen($socket,4)==false){
        echo 'server listen fail:'.socket_strerror(socket_last_error());
    }

    //让服务器无限获取客户端传过来的信息
    do{
        /*接收客户端传过来的信息*/
        $accept_resource = socket_accept($socket);
        /*socket_accept的作用就是接受socket_bind()所绑定的主机发过来的套接流*/

        if($accept_resource !== false){
            /*读取客户端传过来的资源，并转化为字符串*/
            $string = socket_read($accept_resource,1024);
            /*socket_read的作用就是读出socket_accept()的资源并把它转化为字符串*/

            echo 'server receive is :'.$string.PHP_EOL;//PHP_EOL为php的换行预定义常量
            if($string != false){
                $return_client = 'server receive is : '.$string.PHP_EOL;
                /*向socket_accept的套接流写入信息，也就是回馈信息给socket_bind()所绑定的主机客户端*/
                socket_write($accept_resource,$return_client,strlen($return_client));
                /*socket_write的作用是向socket_create的套接流写入信息，或者向socket_accept的套接流写入信息*/
            }else{
                echo 'socket_read is fail';
            }
0
            /*socket_close的作用是关闭socket_create()或者socket_accept()所建立的套接流*/
            socket_close($accept_resource);
        }
    }while(true);
    
    socket_close($socket); 
```

#### socket 客户端 测试
```php
<?php
    //创建一个socket套接流
    $socket = socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
    /****************设置socket连接选项，这两个步骤你可以省略*************/
     //接收套接流的最大超时时间1秒，后面是微秒单位超时时间，设置为零，表示不管它
    socket_set_option($socket, SOL_SOCKET, SO_RCVTIMEO, array("sec" => 1, "usec" => 0));
     //发送套接流的最大超时时间为6秒
    socket_set_option($socket, SOL_SOCKET, SO_SNDTIMEO, array("sec" => 6, "usec" => 0));
    /****************设置socket连接选项，这两个步骤你可以省略*************/

    //连接服务端的套接流，这一步就是使客户端与服务器端的套接流建立联系
    if(socket_connect($socket,'127.0.0.1',8888) == false){
        echo 'connect fail massege:'.socket_strerror(socket_last_error());
    }else{
        $message = 'l love you 我爱你 socket';
        //转为GBK编码，处理乱码问题，这要看你的编码情况而定，每个人的编码都不同
        $message = mb_convert_encoding($message,'GBK','UTF-8');
        //向服务端写入字符串信息

        if(socket_write($socket,$message,strlen($message)) == false){
            echo 'fail to write'.socket_strerror(socket_last_error());

        }else{
            echo 'client write success'.PHP_EOL;
            //读取服务端返回来的套接流信息
            while($callback = socket_read($socket,1024)){
                echo 'server return message is:'.PHP_EOL.$callback;
            }
        }
    }
    socket_close($socket);//工作完毕，关闭套接流
```


### socket 浏览器 测试
```html
<html>
    <head>
        <title>demo</title>
        <script src="https://cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
    </head>
    <body>
    <input type="text" id="content">
    <input type="button" value="send" id="send">
        <script type="text/javascript">
            var ws = new WebSocket("ws://localhost:8888");
            ws.onopen = function(){
                console.log("握手成功");
            }
            ws.onmessage = function(e){
                console.log("message:" + e.data);
            }
            ws.onerror = function(){
                console.log("error");
            }
            $("#send").click(function(){
                content = $("#content").val();
                console.log(content);
                ws.send(content);
            })
        </script>
    </body>
</html>
```