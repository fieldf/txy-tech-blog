---
title: 计算机网络
date: 2023-02-12
index: false
icon: laptop-code
category:
  - 计算机网络
  - 计算机基础
tag:
  - OSI七层模型
  - TCP/IP
  - HTTP/HTTPS
---

# ·七层模型
是ISO国家标准化组织制定的用于计算机通信系统间互联的<font style="background-color:#D3F5F0;">标准</font>体系。OSI七层模型包含一些抽象的概念和术语，也包括一些具体的协议。

应用层、表示层、会话层、传输层、网络层、数据链路层、物理层。

## 应用层
1. 应用层是构建的具体应用。
2. 我们应用软件都是在应用层实现的，是和用户的接口。
3. 应用层把数据传递给下一层TCP层。
4. 协议有HTTP,DNS,HTTPS,FTP文件上传下载,SMTP,POP3,TELNET,DHCP,TFTP。<font style="color:rgb(51, 51, 51);">发送的数据</font><font style="color:rgb(51, 51, 51);background-color:#FFE8E6;">写入</font><font style="color:rgb(51, 51, 51);">socket内核中的发送缓冲区SO_SNDBUF，</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">操作系统把发送缓冲区中的数据</font><font style="color:rgb(51, 51, 51);background-color:#FFE8E6;">取出来</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">进行发送。</font>

_<font style="color:#722ED1;">浏览器输入url首先对url进行解析，看它发送的服务器，端口，请求啥从而生成请求的信息，http请求报文。接下来根据服务器域名查询对应的ip地址，需要dns协议，之后就可以通过操作系统中的协议栈发送http请求。</font>_

1. <font style="color:#722ED1;">客户端浏览器发起一个HTTP请求到ip地址，Http协议是</font><font style="color:#722ED1;background-color:#FFE8E6;">基于</font><font style="color:#722ED1;">TCP的，TCP连接会建立TCP三次握手</font>
2. <font style="color:#722ED1;">发送HTTP请求，请求由请求头，请求行和请求体组成。</font>

<font style="color:#722ED1;background-color:#FADB14;">请求行</font><font style="color:#722ED1;">包含：请求方法，URL，协议版本。</font>

<font style="color:#722ED1;background-color:#FFE8E6;">请求方法</font><font style="color:#722ED1;">包含8种，GET，POST，PUT，DELETE，PATCH，HEAD，OPTIONS，TRACE	</font>

<font style="color:#722ED1;background-color:#FFE8E6;">URL</font><font style="color:#722ED1;">即请求地址，由协议://主机：端口/路径？参数组成</font>

<font style="color:#722ED1;background-color:#FFE8E6;">协议版本</font><font style="color:#722ED1;">即http版本号，POST /chapter17/user.html HTTP/1.1</font>

<font style="color:#722ED1;background-color:#FADB14;">请求头</font><font style="color:#722ED1;">：包含一些请求的附加信息，由键值对组成，关键字和值用：分隔。</font>

<font style="color:#722ED1;background-color:#FADB14;">请求体</font><font style="color:#722ED1;">：请求的参数</font>

3. <font style="color:#722ED1;">对于应用层来说，将发送的数据</font><font style="color:#722ED1;background-color:#FFE8E6;">写入</font><font style="color:#722ED1;">socket内核中的发送缓冲区SO_SNDBUF，</font><font style="color:#722ED1;background-color:rgb(243, 244, 244);">操作系统会将SO_SNDBUF中的数据</font><font style="color:#722ED1;background-color:#FFE8E6;">取出来</font><font style="color:#722ED1;background-color:rgb(243, 244, 244);">进行发送。</font>

### DNS
_<font style="color:#EB2F96;">域名是.分割的，越靠右层级越高，.根域DNS服务器，.com顶级域DNS服务器，下面server.com是权威DNS服务器。获取ip地址的流程首先浏览器看自身有没有这个域名的缓存，如果有，就直接返回，否则去hosts文件看，如果没有客户端会发出一个DNS请求，问域名对应的ip地址是啥，发送给本地dns服务器，也就是客户端TCP/IP设置中填写的DNS服务器，本地域名服务器收到以后，在缓存中找，如果能找到这个域名，那么返回它对应的ip，否则会问它的根域名服务器，根域名服务器会告诉他顶级域名服务器地址，然后本地dns服务器给顶级域名服务器发送请求，询问ip地址，顶级域名服务器再告诉它权威dns服务器的地址，然后本地服务器再去问权威dns服务器，一般来说，权威dns服务器就把ip地址给本地dns返回，然后本地dns再将ip地址返回给客户端，客户端和目标建立连接。</font>_

#### A记录/AAAA记录
IPv4：

示例：ns1.exmaple.com. IN A 198.51.100.2

解释：【domain】 IN A 【IP地址】

IPv6：

示例：ns1.exmaple.com. IN AAAA 8fe0::8f61:ac8:30cd:a16e

解释：【domain】 IN AAAA 【IP地址】

※IN的意思是「Internet」，不是IN/OUT的「IN」。

干什么用呢？



我们在浏览器输入域名后，需要向DNS服务器请求，找到这个域名对应的服务器IP。上面示例就是这么一条记录。

虽然域名和IP都可以变更，但是相比来说域名变更更加简单和随意。所以当网站更换自己域名的时候，就需要修改这条记录。

#### CNAME
示例：sub.example.com. IN CNAME hoge.example.com.

解释：【別名】 IN CNAME 【原名】

干什么用呢？

给某一个domain起多个名字。

类似于，jd.com,jd360.com,jingdong.com虽然是不同名字的域名，但是可以指向同一个原名jd.com。可以让企业的对外展示更加灵活。

举例：

jd360.com IN CNAME jd.com

jingdong.com IN CNAME jd.com

jd.com IN A 123.123.123.123 （这条是A记录例子）

#### MX记录
MX记录（Mail Exchange）：邮件路由记录

在DNS上设定，用于将邮箱地址@符号后的域名指向邮件服务器。

示例：example.com. IN MX 10 mail.example.com.

解释：【domain】 IN MX 【优先度】 【邮件服务器】

干什么用呢？

当发信侧服务器给受信侧发邮件时，首先会要求DNS服务器解析受信侧邮箱地址中@后面部分的域名对应的MX记录（DNS的写法可以理解成example.com 的A记录下面，有一行上面示例的MX记录，当然邮箱服务器也有对应的A记录）。

这样，邮件就直接发到对应的MX记录的A记录里的IP了。

例子：给test@exmaple.com发邮件的话，

DNS会返回给发信侧198.51.100.3这个IP



exmaple.com. IN A 198.51.100.2

example.com. IN MX 10 mail.example.com.

mail.example.com. IN A 198.51.100.3

※如果是普通用户通过【exmaple.com】浏览主页，那么DNS继续返回 198.51.100.2 。这个其实也需要DNS判断请求服务器是邮件服务器还是普通的访问。

#### #NS记录
指定域名解析服务器。

示例：example.com. IN NS ns1.example.com.

解释：【domain】 IN NS 【DNS服务器】

干什么用呢？

指定该域名由哪个DNS服务器来进行解析。

#### TXT记录
示例：ns1.exmaple.com. IN TXT "联系电话：XXXX"

解释：【domain】 IN TXT 【任意字符串】

干什么用呢？

一般指某个主机名或域名的说明，或者联系方式，或者标注提醒等等。

#### SPF记录
SPF记录是TXT记录的一个运用。后面的备注需要按照指定的格式才能有效。

示例：exmaple.com. IN TXT "v=spf1 ip4:198.51.100.1 ~all"

解释：【domain】 IN TXT 【送信侧邮件服务器确认规则】

干什么用呢？



从发信侧服务器设定到DNS上的这条记录中，读取信息，判断发信侧是否合法。

如果不符合规则，那么按照约定的规则处理掉。

跟MX记录正好相反。

MX：我是收件服务器，你找我时，请参考我设定到DNS服务器上的MX记录。

SPF：我是发信服务器，你接受邮件时，请参考我设定到DNS服务器上SPF规则。如果不是我发的信，你可以删掉或者接收。



SPF记录规则

格式：

版本 空格 定义 空格 定义 （空格 定义的循环）

跟着例子看的话，比较好理解。

example.com. IN SPF "v=spf1 ip4:192.0.2.1 -all"

## 表示层
1. 对数据进行加密、解密、压缩、解压缩。
2. 把计算机能够识别的转换成人能够识别的内容。图片声音文字等。

负责把数据转换成能兼容另一个系统能识别的格式，定义数据的表示、安全、压缩，格式有JPEG,ASCII,DECOIC,加密格式等

## 会话层
负责建立、管理、终止会话。对应主机进程，指本地主机和远程主机进行会话。

1. 建立连接，管理会话。
2. 登录验证、断点续传、数据粘包分包。

## 传输层
1. 定义数据传输的协议和端口号。
2. 传输层负责端到端的通信，协议有TCP，UDP。
3. 数据包一旦离开网卡就会进入传输层。
4. 作用是数据的分段、传输和重组。

### TCP
1. TCP传输效率低。
2. 可靠性强。
3. <font style="color:rgb(51, 51, 51);">会在</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">传输数据的前面</font><font style="color:rgb(51, 51, 51);background-color:#FFE8E6;">加上</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">TCP头，构成TCP报文。</font>
4. 用于传输可靠性强数据量小。比如支付宝转账。
5. 大部分使用TCP，比如HTTP。
6. 能进行流量控制、拥塞控制、超时重传等。



_<font style="color:#722ED1;">传输数据之前，需要先3次握手建立tcp连接，</font>__<font style="color:#EB2F96;">开始客户端和服务端都处于closed状态，服务端主动监听某个端口，处于listen状态，然后客户端主动发起连接syn，之后处于syn-sent状态，服务端收到这个数据包以后，返回syn，并且ACK=1代表确认收到客户端的SYN报文，之后处于syn-rcvd状态。客户端收到这个报文之后，会发送确认报文，之后处于established状态。服务端收到这个确认报文以后，处于established状态。3次握手保证双方都有发送和接收的能力。可以通过netstat -napt命令查看tcp连接状态。</font>_

_<font style="color:#722ED1;">如果http请求消息较长，超过了MSS，就会把http的请求数据拆解发送，每一块数据加上TCP头，</font>_<font style="color:#722ED1;background-color:rgb(243, 244, 244);">构成TCP报文。</font>_<font style="color:#722ED1;">tcp头就是会加端口号，源端口就是浏览器监听的端口，</font>_<font style="color:#722ED1;">客户端由</font><font style="color:#722ED1;background-color:#FFE8E6;">系统随机</font><font style="color:#722ED1;">选择一个端口，</font>_<font style="color:#722ED1;">目的端口号就是web服务器监听的端口，</font>_<font style="color:#722ED1;">比如服务器使用80端口</font><font style="color:#722ED1;background-color:#FFE8E6;">监听</font><font style="color:#722ED1;">客户端请求。</font>_<font style="color:#722ED1;">之后交给ip模块，</font>_<font style="color:#722ED1;">传输到网络层。</font>



### UDP
1. 不保证数据包可靠到达。
2. 实时性好，传输效率高。
3. 适合数据量大、实时性强的数据传输。
4. 例如抖音等视频服务。
5. UDP也可以实现可靠传输，把TCP的特性在应用层实现就可以。

### 分段
应用层传输的数据可能很大，如果直接传输不好控制，因此当传输层的数据包大小超过MSS（TCP最大报文段长度），就把数据包分段，如果中途有一个分段丢失，就重新发送这一个分段，而不用重新发送整个数据包。

## 网络层
1. 对数据包中的ip地址进行封装和解析。
2. 负责网络包分片。
3. 进行逻辑地址寻址，实现不同网络之间路径选择。
4. 协议有：ICMP IGMP **IP ARP **RARP。
5. 设备：路由器、交换机、防火墙。

### ip协议
最常用的就是IP协议，把传输层的报文作为数据部分，再加上IP头组成IP报文，如果IP报文大小超过MTU，就会再次分片。

<font style="color:#722ED1;">数据到达网络层时，</font>_<font style="color:#722ED1;">添加IP头，IP头包含源IP和目的IP，源IP就是客户端的ip地址，客户端的不同网卡对应不同的ip地址，目的ip就是web服务器的ip地址。</font>_<font style="color:#722ED1;">客户端的网络层根据ip地址查找目的端。主要就是通过路由表确定如何到达服务器，期间可能经过多个路由器，由这些路由器来查找路由表决定通过哪个路径到达服务器。</font>

#### 寻址
ip地址就是给设备编号，包括网络号和主机号，网络号负责标识ip地址属于哪个子网，主机号标识同一个子网下不同的主机。ip地址需要配合子网掩码算出ip地址的网络号和主机号。按位与运算。

#### 路由
两台设备并不是一条网线连起来的，期间可能经过多个路由器，由这些路由器来查找路由表去决定到达服务器走哪个路径。

## 数据链路层
1. 对数据包的MAC地址进行封装和解析。
2. 具体一点就是在数据包前面加上MAC头生成数据帧。
3. 作用是进行硬件地址寻址。
4. 功能具有差错校验等功能，能发现错误但不能纠正。
5. 设备：网卡、网桥、交换机。

_<font style="color:#722ED1;">接下来到数据链路层还需要加上</font>_<font style="color:#722ED1;">Datalink Header和FCS。</font>_<font style="color:#722ED1;">主要包含发送方和接收方的mac地址信息。在一般TCP/IP通信中，MAC头包含的协议类型一般只有IP协议和ARP协议。接收方的MAC地址是如何获取呢？首先我们知道包发送的接收方的ip地址，我们使用arp协议帮我们找到这一路上的路由器的mac地址，最终就可到达接收方。</font>_

## 物理层
1. 作用传输比特流。
2. 把要传输的数据复制到网卡缓存区，加上报头和起始帧分界符，帧校验序列。
3. 把0101码转化为电流强弱进行传输，到了以后把电流转化为0101码。
4. 从网卡发送出去，经过网线到达接收方。



接下来数据包经过交换机，交换机工作在mac层，也称为2层网络设备，电信号先到达交换机的接口，交换机将电信号转换为数字信号，然后进行FCS校验，如果没问题就放到缓冲区，交换机端口是没有mac地址这个概念的，接下来呢，交换机会查这个包的mac地址是否在我交换机的mac地址表中有，这个表记录的是mac地址和端口，如果存在，就找到对应的端口发出去，否则，就把数据发送到除了源端口的所有端口，那么其他设备接收到了，如果不是发给它的，他就直接丢掉这个包，广播地址：mac地址是FF:FF:FF:FF:FF:FF,ip地址是255.255.255.255。然后数据包经过交换机到达路由器。这一步的转发和交换机类似，也是通过查表判断包转发的目标，不过和交换机还是有区别的，因为路由器是基于ip涉及的，也就是属于三层网络设备，路由器的各个端口都具有mac地址和ip地址，而交换机是基于mac层，是属于二层网络设备，交换机的端口不具有mac地址的，路由器的端口是具有mac地址的，所以能够成为发送方和接收方，同时还具有ip地址，所以在某些层面来说路由器和电脑的网卡是一样的，当转发包的时候，路由器的端口会接收到数据包，接收到数据把电信号转成数字信号，对包末尾的fcs进行错误校验，然后看这个接收方的mac地址看是不是发给自己的包，如果是就放到接收缓存区，否则丢弃，然后路由表查询发送的目标，然后找到对应的端口作为发送方把数据包发送出去。发送给下一个路由器，经过层层转发，最终到达目的地，在这期间源ip和目标ip是不变的，而mac地址是一致变化的，因为需要mac地址在两个设备之间进行包的传输。

到达服务器之后，服务器先看mac地址是不是自己的mac地址，如果是就保留，然后继续看ip地址是否符合，根据ip头中的协议项，看上层是TCP协议，然后继续看tcp头，里面有序列号，看这个序列号是不是我想要的，如果是就放入缓存然后回复一个ack，如果不是就丢掉，tcp头还有端口号，http的服务器正在监听这个端口，那么服务器就是到时哪个应用进程想要这个包，于是把包发送给http进程。http进程看到这个请求时访问一个页面，于是把网页封装在http相应报文中，响应报文也是类似的层层传递，增加头，然后相反的传递给客户端，客户端收到以后拿到http响应报文之后，交给浏览器去渲染页面。



## 服务端
1. 最终到达服务端。服务器处理请求并<font style="background-color:#FFE8E6;">返回</font>http响应报文。服务器主要作用就是它属于是网络<font style="background-color:#FFE8E6;">环境</font>中高性能计算机。能够<font style="background-color:#FFE8E6;">侦听</font>网络中其他计算机的请求，提供相应的服务。如网页服务，邮件服务，视频服务。而客户端主要的功能是浏览网页。服务端根据用户的请求，结合配置文件，把请求<font style="background-color:#FFE8E6;">分配</font>给服务器上相应的程序进行处理，然后<font style="background-color:#FFE8E6;">返回</font>后台处理的<font style="background-color:#FFE8E6;">结果</font>作为响应。
2. 后台开发很多框架，大部分按照MVC的设计模式进行搭建的。MVC将应用程序分成三个核心部件：模型model-视图view-控制器controller，他们各自处理自己的任务，实现输入、处理和输出的分离。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654764693037-e1eabbe1-389b-4f57-9849-0eeace78a98a.png)

视图：提供给用户的操作界面，是程序的外科。

模型：模型主要负责数据交互，模型拥有最多的处理任务，一个模型可以为多个视图提供数据。

控制器：负责根据用户从视图层输入的指令，选取“模型层”中的数据，然后对其进行相应的操作，产生最终结果。

浏览器发送来的请求经过控制器，控制器进行一些逻辑处理和请求分支，接着会调用模型，这一阶段模型会获取redis db以及MySQL数据，获取数据后将页面以响应报文的形式返回给客户端，最后浏览器通过渲染引擎把网页呈现在用户面前。

响应报文一般包含状态行、协议版本号、成功或失败代码、消息体。

10. 客户端<font style="background-color:#FFE8E6;">接收</font>响应报文以后，进行页面<font style="background-color:#FFE8E6;">渲染</font>。根据HTML解析出<font style="background-color:#FFE8E6;">DOM树</font>，根据CSS解析生成<font style="background-color:#FFE8E6;">CSS规则树</font>。结合DOM树和CSS规则树生成<font style="background-color:#FFE8E6;">渲染树</font>。根据渲染树计算每一个节点的信息，根据计算好的信息<font style="background-color:#FFE8E6;">绘制</font>页面。
11. 断开连接：TCP四次挥手

# cookie和session
session保存在服务器端，实现是基于cookie实现的，然后向客户端返回一个sessionId，当客户端再次访问服务端时携带sessionId，根据sessionId找到对应的数据。

cookie是保存在浏览器的。比如说用cookie实现保存登录状态时，客户端点击登录的时候，服务端可以设置一个cookie返回给客户端，客户端会把cookie保存在本地。下次访问服务器时能够带上这个cookie，服务器根据这个cookie获取到用户的信息。



# ·TCP
## TCP和UDP区别
1. TCP是面向连接的，传输之前需要建立连接。UDP不需要连接。
2. TCP是保证可靠交付的，数据无差错、不丢失、不重复。UDP是尽最大努力交付，不保证数据可靠到达。
3. TCP是一对一的两点交付，一条tcp连接只有两个端点。UDP支持一对一、一对多、多对多的交互通信。
4. TCP有流量控制、拥塞控制，保证数据传输的安全性。UDP没有，即使网络堵塞，也不会影响UDP的发送速率。
5. TCP的首部较长，会增加一定量的开销，20+40选项。UDP的首部是8个字节。
6. TCP是流式传输的，没有边界，但是能保证顺序和可靠。UDP是一个包一个包的发送，有边界的，但可能会丢包和乱序。
7. TCP的数据大小如果大于MSS，会进行分片，拆分传输，如果丢失一个分片，则只需要重传丢失的分片。
8. TCP一般用于FTP文件传输，HTTP/HTTPS。UDP用于包数量较少的通信，如DNS、SNMP等；视频、音频等多媒体通信、广播通信等。

## 头【乱序、丢失】
20字节+40字节选项

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654764018737-31451104-29ce-4663-9b79-3fd10fda3d02.png)

### 序列号
是建立连接时发送syn数据包时发送一个由计算机随机初始的一个数值，之后每一次发送数据包都加一，作用是解决网络包乱序的问题。

### 确认号
是期望接收到的数据序列号，可以认为在这个序列号之前的数据包对面都接收到了。用来解决网络包丢失的问题。

### 控制位
1. ACK：为1表示确认数据包。除了最初建立连接的SYN包之外一直都是1。
2. RST：为1时表示TCP异常必须强制断开连接。
3. SYN：为1时表示建立连接。
4. FIN：为1时表示要断开连接。

## 三次四次
### 三次握手
在socket网络编程中，客户端执行<font style="background-color:#D3F5F0;">connect</font>()时，会触发三次握手。

#### 流程
3次握手是指，建立一个TCP连接时，需要<font style="background-color:#D3F5F0;">客户端和服务器</font>总共发送3个包。



![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654764030935-d5192862-706e-4baf-bbe3-68a2153a947c.png)

开始客户端和服务端都closed状态，服务端会绑定并监听某个端口，

第一次握手：

客户端发送一个TCP的SYN标志为1的包，表明要连接服务器端口，初始化序列号X，之后处于syn-sent状态。

第二次握手：

服务端收到后，发回确认包ACK应答。SYN和ACK<font style="background-color:#D3F5F0;">标志位</font>都置为1，将确认号设置为客户端序列号+1，即X+1。Seq序列号为y。之后处于syn-rcvd状态。

第三次握手：

客户端收到这个报文以后，客户端再次发送ACK确认包，SYN标志位0，ACK标志位为1，并且把服务器发来的序列号+1作为确认号。发完以后客户端处于established状态，服务端收到这个确认报文以后，也处于established状态。

#### 为什么3次？
为什么不是四次？

1. 三次握手的目的是和服务端<font style="background-color:#D3F5F0;">建立连接</font>，3次能让双方都具有发送和接收的能力，正常来说需要四次的，因为第二次的时候相当于2个作用，既能够确认又能够让服务端也发送请求连接syn=1的报文。
2. 3次也能够满足同步双方初始序列号和确认号的需求，并交换TCP接收窗口大小。

为什么不是两次？

3. 3次能避免历史连接，如果存在网络拥塞导致报文延迟到达，接收方接收以后发送确认，发送方发现不是自己想收到的确认，直接发送RST断开连接。2次做不到。
4. 如果2次：过期的SYN报文到达也会导致建立连接,避免资源浪费。



#### 半连接队列和SYN泛洪攻击？
服务端SYN半连接队列（三次握手尖角处），ACCEPT全连接队列（三次握手）。

SYN泛洪：属于DoS/DDoS攻击，服务端被攻击，伪造大量客户端向服务端发送SYN报文。

导致1. 服务端半连接队列占满。2. 服务器触发超时重发，消耗服务器资源。

解决：1. 增大队列大小 2. 减少重发次数 3. SYN Cookie技术，2步计算cookie返回给客户端，只有收到第三次握手携带cookie验证通过，才分配资源。

TFO：以后进行三次连接，第一次握手客户端发送缓存的cookie值+http请求，服务端：验证通过返回http响应。累积起来提升性能。



### TCP四次断开
TCP的连接断开需要发送4个包，所以叫4次挥手。客户端和服务器<font style="background-color:#D3F5F0;">均可主动发起</font>挥手动作，在socket编程中，任何一方执行<font style="background-color:#D3F5F0;">close</font>操作即可产生挥手操作。

#### 流程
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654764579424-1388502c-3561-4dc4-903c-02c5eeaa279a.png)

第一次断开：客户端发送一个FIN，用来关闭客户端到服务器端的数据传送，客户端进入FIN_WAIT_1状态。

第二次断开：Server收到FIN后，发送一个ACK给客户端，确认序号为收到的序号+1，服务端进入CLOSE_WAIT状态。

第三次断开：服务端发送一个FIN，用来关闭服务端到客户端的数据传送，服务端进入LAST_ACK状态。

第四次断开：客户端收到FIN后，发送一个ACK给服务端，确认序号为收到序号+1，客户端进入TIME_WAIT状态，服务端收到以后进入CLOSED状态，完成四次挥手。客户端也就是主动发起挥手的这一方等待2msl进入closed状态。

#### 为什么四次？
关闭连接时，客户端向服务端发送FIN，服务端返回ACK，这是2次，代表客户端不再发送数据了，但还能接收数据。

等服务端发送完数据以后，主动发起FIN，等待客户端的ACK，代表服务端这边也不发送数据了。这样才能2边都关闭连接，所以需要四次。



#### 为什么time_wait要经过2msl?
对于主动提出断开连接一方需要经过2msl，假设客户端主动断开连接，最后给服务端发送ack确认报文，需要确认服务端接收到确认报文。如果服务端没收到，会触发服务端超时重传，客户端就能在2msl时间内接收到重传的报文。

第一个msl保证最后发送方ACK到达

第二个msl保证若ack没到达，能够接收到接收方的重传报文。

#### time_wait过多有什么危害？
1. 占用系统资源。比如文件描述符、内存资源、CPU、线程。
2. 占用端口资源。端口资源是有限的。

客户端：

客户端如果time_wait过多，会占满端口资源，就无法对某一个服务器发起连接了。

服务端：

并不会导致端口资源受限，因为服务端只监听一个端口。但是TCP连接过多，会占用系统资源。

## TCP可靠性
### ip不可靠
ip不保证网络包的交付、不保证网络包的按序交付、也不保证网络包中的数据完整性。

### Tcp如何确保数据传输可靠性？
1. 连接和断开的可靠性

2. TCP的有状态的。报文校验，ACK确认机制，超时重传机制。

3. 可控制的。滑动窗口进行的流量控制。拥塞控制。

#### 校验和
数据包校验，检测数据在传输过程中是否出错，如果校验出包有错，则丢弃报文并且不给出响应，TCP发送端收不到确认会触发超时重传。

#### ACK确认应答机制
TCP收到另一端发送的数据，将发送一个确认。确认号等于接收报文的序列号+1.

#### 超时重传
TCP发出一个段后，启动一个定时器，等待目的端确认收到这个报文段。如果不能及时收到一个确认，将重发这个报文段。RTO。RTO略大于RTT(往返时延)。

两种情况：数据包丢失、确认应答丢失。

【失序数据包重排序+丢弃重复数据】



### 流量控制
<font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">TCP流量控制</font><font style="color:rgb(51, 51, 51);">主要是使用</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">滑动窗口协议</font><font style="color:rgb(51, 51, 51);">，</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">滑动窗口</font><font style="color:rgb(51, 51, 51);">是接收方接收数据使用的窗口大小，用来告诉发送端接收端的缓存大小，以此可以控制发送端发送数据的大小，从而达到</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">流量控制</font><font style="color:rgb(51, 51, 51);">的目的，控制发送方的发送速率，让接收方能够接收。</font>

（发送方、接收方）全双工：客服都可做发接

滑动窗口：大小=拥塞窗口和流量控制窗口最小值

<font style="color:rgb(51, 51, 51);">所有数据帧按顺序进行编号，只有落在发送窗口内的帧才允许被发送；</font>

<font style="color:rgb(51, 51, 51);">发送方发送数据分为4个部分。</font>

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654764587726-09c516b2-f5c1-499c-b05d-4c37ac0a2683.png)



### 拥塞控制
流量控制是避免发送方的数据填满接收方的缓存，控制发送方的发送速率，让接收方来得及接收。而拥塞控制是在网络出现拥堵时，如果继续发送大量的数据包，会导致数据包延迟、丢失等，这时TCP重传数据，但是一重传就会导致网络的负担更重，于是会导致更大的延迟和丢包，所以拥塞控制就是避免发送方的数据填满整个网络。发送窗口就是会根据网络的用拥塞程度动态变化的。

发送窗口=min（拥塞窗口cwnd，接收窗口rwnd）



慢开始、拥塞避免、快重传+快恢复（拥塞窗口）

慢开始：初始为1，RTT，窗口翻倍。到达阈值。窗口值呈指数增长。当到达慢启动门限ssthresh，执行拥塞避免。

拥塞避免：窗口+1。窗口大小呈线性增长。

一直增长肯定会导致网络慢慢的拥塞，于是会出现丢包的现象，

当一报文丢失，接收方发送3次确认，发送方执行快重传、快恢复。

· 拥塞阈值降为cwnd的一半

· cwnd大小变为拥塞阈值

· cwnd线性增加



## 粘包拆包
### TCP粘包拆包
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1655259793249-be978a16-68f7-4637-a2bf-2606f9ac25a0.png)

<font style="color:rgb(51, 51, 51);">假设</font><font style="color:rgb(51, 51, 51);background-color:#FAE1EB;">客户端</font><font style="color:rgb(51, 51, 51);">分别发送了两个数据包D1和D2给服务端，由于服务端</font><font style="color:rgb(51, 51, 51);background-color:#FAE1EB;">一次读取</font><font style="color:rgb(51, 51, 51);">到字节数是不确定的，故可能存在以下四种情况：</font>

1. <font style="color:rgb(51, 51, 51);">服务端分两次读取到了</font><font style="color:rgb(51, 51, 51);background-color:#FAE1EB;">两个独立</font><font style="color:rgb(51, 51, 51);">的数据包，分别是D1和D2，没有粘包和拆包</font>
2. <font style="color:rgb(51, 51, 51);">服务端一次接受到了两个数据包，</font><font style="color:rgb(51, 51, 51);background-color:#FAE1EB;">D1和D2粘合</font><font style="color:rgb(51, 51, 51);">在一起，称之为</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">TCP粘包</font>
3. <font style="color:rgb(51, 51, 51);">服务端分两次读取到了数据包，第一次读取到了完整的D1包和D2包的部分内容，第二次读取到了D2包的剩余内容，这称之为</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">TCP拆包</font>
4. <font style="color:rgb(51, 51, 51);">服务端分两次读取到了数据包，第一次读取到了D1包的部分内容D1_1，第二次读取到了D1包的剩余部分内容D1_2和完整的D2包。</font>

**<font style="color:rgb(51, 51, 51);">如果TCP的接受</font>****<font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">滑窗</font>****<font style="color:rgb(51, 51, 51);">非常小，而数据包D1和D2比较大，很有可能会发生第五种情况，即服务端分多次才能将D1和D2包完全接收，期间发生</font>****<font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">多次拆包</font>****<font style="color:rgb(51, 51, 51);">。</font>**

<font style="color:rgb(51, 51, 51);">当发生粘包，根据</font><font style="color:rgb(51, 51, 51);background-color:#FAE1EB;">协议的定义</font><font style="color:rgb(51, 51, 51);">，把数据包</font><font style="color:rgb(51, 51, 51);background-color:#FAE1EB;">拆开</font><font style="color:rgb(51, 51, 51);">。发生</font><font style="color:rgb(51, 51, 51);background-color:#FAE1EB;">拆包</font><font style="color:rgb(51, 51, 51);">问题，等待数据包接收到以后也是根据协议的定义，我们把数据包</font><font style="color:rgb(51, 51, 51);background-color:#FAE1EB;">合起来</font><font style="color:rgb(51, 51, 51);">。</font>

### <font style="color:rgb(51, 51, 51);">粘包、拆包发生原因</font>
<font style="color:rgb(51, 51, 51);">产生原因主要有这3种：</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">滑动窗口</font><font style="color:rgb(51, 51, 51);">、</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">MSS/MTU限制</font><font style="color:rgb(51, 51, 51);">、</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">Nagle算法</font>

#### <font style="color:rgb(51, 51, 51);">滑动窗口</font>
+ <font style="color:rgb(51, 51, 51);background-color:#FFE8E6;">粘包</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">:</font><font style="color:rgb(51, 51, 51);"> 假设发送方发送的数据会被放到</font><font style="color:rgb(51, 51, 51);background-color:#FFE8E6;">接收缓冲区</font><font style="color:rgb(51, 51, 51);">，如果接收方由于数据处理</font><font style="color:rgb(51, 51, 51);background-color:#FFE8E6;">不及时</font><font style="color:rgb(51, 51, 51);">，</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">接收方的接收缓存中可能会缓存多个报文，那么对于接收方而言，这就是粘包</font><font style="color:rgb(51, 51, 51);">。</font>
+ <font style="color:rgb(51, 51, 51);background-color:#FFE8E6;">拆包</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">：</font><font style="color:rgb(51, 51, 51);">如果</font><font style="color:rgb(51, 51, 51);background-color:#FFE8E6;">接收方的窗口</font><font style="color:rgb(51, 51, 51);">很小，意味着发送方的发送窗口也会变小，如果小于一个数据包的大小，不得不</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">只发送报文的前多少个字节，等到接收方ack 后，再能发送剩余字节。这就造成了拆包</font><font style="color:rgb(51, 51, 51);">。</font>

#### <font style="color:rgb(51, 51, 51);">MSS和MTU分片</font>
+ <font style="color:rgb(51, 51, 51);">MSS:数据报文中data部分的最大长度，是传输层对最大发送数据的限制。MSS=MTU-IP-TCP</font>
+ <font style="color:rgb(51, 51, 51);">MTU:最大传输单元MTU是数据部分+TCP头+IP头的最大长度。1500，是链路层对最大发送一次数据的限制。</font>

<font style="color:rgb(51, 51, 51);">发送方发送数据时，发送数据量大于MSS时，操作系统会将数据进行拆分，使得每一部分都小于MSS，这就是</font><font style="color:rgb(51, 51, 51);background-color:#FFE8E6;">拆包</font><font style="color:rgb(51, 51, 51);">。</font>

#### <font style="color:rgb(51, 51, 51);">Nagle算法</font>
<font style="color:rgb(51, 51, 51);">TCP/IP协议中，无论发送多少数据，总是要在数据(DATA)前面加上TCP、IP协议头，对方接收到数据，也需要发送ACK表示确认。</font>

<font style="color:rgb(51, 51, 51);">可能发送的数据只有一个字节，也需要进行这样的传输。TCP总是</font><font style="color:rgb(51, 51, 51);background-color:#FAE1EB;">希望</font><font style="color:rgb(51, 51, 51);">尽可能的发送一个大的数据，能够充分</font><font style="color:rgb(51, 51, 51);background-color:#FAE1EB;">利用</font><font style="color:rgb(51, 51, 51);">网络带宽。</font>

<font style="color:rgb(51, 51, 51);">Nagle算法就是为了尽可能发送大块数据，避免网络中充斥着许多小数据块。所以为了使发送缓冲区数据长度达到MSS，可能会</font><font style="color:rgb(51, 51, 51);background-color:#FFE8E6;">粘包</font><font style="color:rgb(51, 51, 51);">。</font>

<font style="color:rgb(51, 51, 51);">Nagle算法的规则：</font>

1. <font style="color:rgb(51, 51, 51);">如果SO_SNDBUF(发送缓冲区）中的数据长度达到MSS，则允许发送；</font>
2. <font style="color:rgb(51, 51, 51);">如果该SO_SNDBUF中含有FIN，表示请求关闭连接，则先将SO_SNDBUF中的剩余数据发送，再关闭；</font>
3. <font style="color:rgb(51, 51, 51);">设置了TCP_NODELAY=true选项，则允许发送。TCP_NODELAY是取消TCP的确认延迟机制，相当于禁用了Nagle 算法。</font>
4. <font style="color:rgb(51, 51, 51);">未设置TCP_CORK选项时，若所有发出去的小数据包（包长度小于MSS）均被确认，则允许发送;</font>
5. <font style="color:rgb(51, 51, 51);">上述条件都未满足，但发生了超时（一般为200ms），则立即发送。</font>

<font style="color:rgb(51, 51, 51);"></font>

# ·HTTP
## http基本概念
### http结构
<font style="background-color:#FADB14;">请求行</font>包含：请求方法，URL，协议版本。

<font style="background-color:#FFE8E6;">请求方法</font>包含8种，GET，POST，PUT，DELETE，PATCH，HEAD，OPTIONS，TRACE

<font style="background-color:#FFE8E6;">URL</font>即请求地址，由协议://主机：端口/路径？参数组成

<font style="background-color:#FFE8E6;">协议版本</font>即http版本号，POST /chapter17/user.html HTTP/1.1

<font style="background-color:#FADB14;">请求头</font>：包含一些请求的附加信息，由键值对组成，关键字和值用：分隔。

<font style="background-color:#FADB14;">请求体</font>：请求的参数

### http状态码
响应码

「<font style="color:rgb(48,79,254);">502 Bad Gateway</font>」通常是服务器作为网关或代理时返回的错误码，表示服务器自身工作正常，访问后端服务器发生了错误。

「<font style="color:rgb(48,79,254);">503 Service Unavailable</font>」表示服务器当前很忙，暂时无法响应服务器，类似“网络服务正忙，请稍后重试”的意思。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654764642376-de8c0883-bb4b-4014-8466-164082eda945.png)

### http常见字段
// 客

host: 客户端发送请求，用来指定服务器的域名。

connection：客户端要求服务器使用tcp持久连接。

accept-encoding：客户端在请求时，告诉可以接受哪些压缩方法。

// 服

content-length：服务端返回数据，表名本次数据的长度。

content-type：服务器回应时，告诉客户端本次数据是什么格式。text/html;charset=utf-8（网页，编码是utf8）

content-encoding：服务器返回的数据使用什么压缩格式。比如gzip。

### get和post
get请求一般是用于查，从服务器获取资源，可以是静态文本、页面、图片、视频等等。get请求参数写在url后面，而且浏览器对url长度有限制，所以参数数量不能太多。

post请求一般是改，携带的数据一般写在报文的body，请求体中，body中的数据可以是任意格式的数据，需要和客户端协商好，一般不会对body大小做限制，默认是json格式。

get请求是安全且幂等的，因为是只读，无论做多少次操作，请求的结果都是相同的，所以get请求的数据可以缓存，缓存到浏览器上。

post一般是改，新增等操作，所以是不安全的，不是幂等的，多次提交结果是不同的，而且不能缓存。

#### 幂等
幂等就是多次调用（方法/接口）不会改变业务状态，多次调用结果和单次结果一致。

如：

前端重复提交：注册/创建帖子，前端可能会重复提交，如果用户提交的数据相应的修改数据库，可能重复创建记录。产生bug。

接口超时重试：调用第三方接口，可能由于网络原因调用失败，一般都会涉及失败重试，如果第一次调用执行一半出现异常，再次调用就会产生脏数据。

消息重复消费：使用消息中间件，如果消费者消费了一半突然断开连接，那么没执行完的消息会重新放回队列，消费者再次消费，导致一些异常。

解决方案：

1. token机制：

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1664332460417-9788b232-2854-4a33-b7f1-081d069b4536.png)

客户端发一个请求获取token，服务端生成一个全局唯一id作为token，保存在redis中，然后返回给客户端。

然后客户端请求业务时会携带这个token。[然后服务端会验证token，如果存在，就业务处理并删除token]（可以用lua脚本保证原子性），如果不在，代表重复操作，直接返回。

2. mysql实现：

利用mysql的唯一索引。

建一张表，一个字段是唯一索引。客户端请求服务端，服务端会设定相应的key以及信息存入这张表。因为是唯一索引，如果插入成功，代表之前没有请求，然后执行业务逻辑。如果插入失败，代表已经请求过，直接返回。

3. redis实现

setnx key value，key不存在可以set成功返回1，否则返回0.

客户端请求服务端，然后setnx存入redis，并设置过期时间，如果设置成功，代表第一次访问，执行业务逻辑。否则代表请求过，直接返回。

## Http1.1和Http1.0和Http2和HTTP3
### HTTP/1.1
1. 提出长连接，不需要每次会话都新建一次tcp三次握手，4次挥手。
2. 管道网络传输，不必等服务端响应了再发下一个请求。队头阻塞（响应），服务端按请求顺序响应的，如果反应慢，就会导致客户端一直收不到数据。
3. 缓存处理：HTTP1.0主要使用header里的If-Modified-Since,Expires来作为缓存判断的标准，HTTP1.1则引入了更多的缓存控制策略如Entity tag，If-Unmodified-Since，If-Match，If-None-Match等更多可供选择的缓存头来控制缓存策略。
4. Host头处理：http1.0认为每台服务器绑定一个唯一的IP地址。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机，共享一个ip地址，所以http1.1的请求支持host头域。

### HTTP/2
1. 使用了HTTPS。
2. 会压缩头，1.1头带有大量信息，而且每次都需要重复发送，http2会消除重复的部分，减小传输的压力，hpack算法，客户端和服务器同时维护了一张头信息表，生成一个索引号，以后就只发索引号就可以了。
3. 报文2进制格式（叫头信息帧和数据帧），不像http1.1纯文本的形式，好处就是收到报文以后，不需要将明文转成二进制了，可以直接进行解析。
4. 响应请求数据包有标记，也就是根据标记找到是响应的哪个请求，也就是不需要按序了，而且可以对请求加优先级。
5. 多路复用，多个请求复用一个TCP连接，每个请求会对应一个id，一个连接可以有多个请求，接收方可以根据请求的id分配到不同的服务端请求里面。

http2也会有队头阻塞，不过是tcp层导致的队头阻塞，因为tcp按序到达，有确认重传机制，一旦发生丢包接收不到的会重传，因此可能会发生TCP层的队头阻塞。

### HTTP3
1. 采用UDP。
2. 解决TCP丢包超时重传那么后面的阻塞。
3. QUIC协议保证可靠。





## HTTP和HTTPS
HTTP：明文/无状态的。窃听、伪装、篡改。

HTTPS:混合加密、CA、摘要算法。

### 混合加密
https=http+ssl/tls，对数据进行加密和解密。是采用一种混合加密算法，非对称和对称加密结合的方式。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654764650634-2f82fa69-a69f-4e24-9915-8d0c4df5b997.png)

对称密钥加密，加密和解密使用同一密钥。优点运算速度快。缺点无法安全地将密钥传输给通信方。

非对称加密：又称公开密钥加密，加密和解密使用不同的密钥。

公开密钥所有人都可以获得，通信发送方获得接收方的公开密钥之后，就可以使用公开密钥进行加密，接收方收到通信内容后使用私有密钥解密。

### CA
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654764662473-7893f3f1-d0a9-446b-a081-b207442e47a7.png)

返回：服务器信息、域名、申请证书的公司、公钥、数据加密算法。

一般来说，非对称加密时用公钥加密，私钥解密，能保证数据的安全性，因为私钥只有一个人知道，只有他才能解密。而用私钥加密，公钥解密能保证消息发送方没有被冒充，因为私钥是不可泄密的，所以如果能够被公钥解密说明这个内容是来自于持有私钥身份的人发出的。

所以在CA认证时，就采用这种方式来确认消息的身份。

---------------------------------------------------------

### 摘要算法
一般摘要算法是哈希函数，根据内容计算出哈希值。虽然能保证内容没有被篡改，但是不能保证内容+指纹没有被替换。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654764658321-817c202e-715a-4153-97b1-f3ea9be36008.png)



# ·CDN
定义：

1. 内容分发网络。
2. 部署在各地的机房服务器。
3. 让用户能够就近获取所需内容，降低网络延迟。
4. 实现负载均衡、内容分发、调度的能力。

关键技术：

1. 内容发布：
2. 内容路由
3. 内容交换
4. 性能管理

负载均衡系统

1. 是CDN的核心。
2. 将用户请求负载到不同的中心机房或者服务器上。

## 负载均衡算法
### 轮询均衡
1. 将客户端请求轮流分配到1-N台服务器上。
2. 每台服务器被均等的分配一定数量的客户端请求。

### 权重轮询均衡
1. 按照每台服务器的不同配置和服务能力。
2. 每台服务器设置不同的权重值。
3. 按照设置的权重值轮询将请求分配到不同服务器上。

### 随机均衡
按照请求随机分配给服务器。

权重随机均衡

响应速度均衡

最少连接数均衡

处理能力均衡

DNS响应均衡

散列算法均衡

IP地址散列

URL散列

