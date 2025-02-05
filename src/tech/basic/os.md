---
title: 操作系统
date: 2023-02-12
index: false
icon: laptop-code
category:
  - 操作系统
  - 计算机基础
tag:
  - 内存管理
  - 进程与线程
  - IO模型
  - CPU
  - 零拷贝
---
# 内存
## 虚拟内存
虚拟内存，就是虚拟出来的内存，可以把外存当做内存来使用，是为了解决程序运行时内存不足的问题。

每个程序拥有<font style="background-color:#E4F7D2;">自己的</font>地址空间，也就是虚拟内存地址。在编译期间，为变量<font style="background-color:#E4F7D2;">分配</font>一个虚拟地址。虚拟地址空间被分成多个固定大小的<font style="background-color:#E4F7D2;">页</font>。物理空间也就是内存空间，<font style="background-color:#E4F7D2;">也</font>被分成大小相同的页。在运行期间，内存管理单元MMU，用于获取虚拟地址对应的物理地址，是通过内存中的<font style="background-color:#E4F7D2;">页表</font>获取虚拟地址对应的实际内存物理地址，但是这个时候如果变量还<font style="background-color:#E4F7D2;">未分配</font>物理地址，MMU就会<font style="background-color:#E4F7D2;">查不到</font>它对应的物理地址是什么，此时发生了<font style="background-color:#E4F7D2;">缺页中断</font>。需要为它在内存上分配一块物理地址，并将该地址<font style="background-color:#E4F7D2;">写回页表</font>供以后使用。发生缺页中断时，若物理内存空间<font style="background-color:#E4F7D2;">满了</font>，需要将物理空间中的一部分数据和磁盘对换来腾出空间，称为页面置换，根据换出页面的不同有不同的页面置换算法。

好处：

1. 扩大地址空间。
2. 虚存<font style="background-color:#FADB14;">共享</font>实现进程通信。不同进程使用同样代码，可以把自己虚拟内存映射过去，节省内存。
3. 内存<font style="background-color:#FADB14;">保护</font>：进程运行在各自的虚拟内存地址空间，互不干扰。
4. 虚拟内存分配连续空间，不需要实际物理内存连续。

缺点：

1. 页表需要额外的内存
2. 地址转换增加了指令执行时间。
3. 页面换入换出需要磁盘IO
4. 按页存取，如果不足一页也是一页，浪费内存。

### 分页分段
<font style="background-color:#FA8C16;">分页：</font>

虚拟内存被分割成大小固定的页，称为虚拟页VP，物理内存也被分成大小固定的页，叫物理页PP，虚拟页的大小和物理页的大小相同，每一页和物理内存进行映射。虚拟内存包括未分配虚拟地址的、已分配未缓存到内存的、已分配缓存到内存的。分页对程序员是透明的，分段是需要程序员显示的划分每个段。

<font style="background-color:#FA8C16;">分段：</font>  
分段是把地址空间划分为多个段，为每个程序都能划分为<font style="background-color:#E4F7D2;">独立的地址空间</font>有助于共享和保护。对于分页，页面大小是固定的，存储一些动态增长的数据时可能会发生覆盖，但是分段每个段的大小可以不同而且可以动态增长，所以相较于分页有这样的一个优点。  
<font style="background-color:#FA8C16;">段页式：</font>  
程序的地址空间划分为多个拥有独立地址的段，每个段上的地址空间划分成大小相同的页，这样**既拥有分段系统的共享和保护，又拥有分页系统的虚拟内存功能，实现更大的内存地址空间。**分页是一维的，分段是二维的。

<font style="background-color:#FA8C16;">快表：</font>  
快表是为了加快根据虚拟地址查找物理地址的速度，建立在虚拟地址和内存页表之间的一个缓存Cache，当需要查询物理地址时，先访问快表，若快表中存在，则直接访问内存地址数据，当快表中不存在，再去访问内存页面，并把内存中对应的物理地址写回到快表中，若快表满了，则会通过一定的置换算法进行置换。

### 页面置换算法
1. 最佳替换（OPT,Optimal replacement algorithm）  
   是一种理论上的算法，将置换未来最长时间不会访问到的页面。实际中并不会知道未来最长不会被访问到的页面是什么。
2. 先进先出（FIFO）  
   字面意思。但是容易将频繁访问的对象置换出去，而导致缺页率上升。
3. 最近最久未使用（LRU,Least Recently Used）  
   将置换最近最久未使用的页面，维护一个访问链表，新访问的页面添加到链表的头部，那么链表的尾部就是最近最久未使用的页面。但是每次访问都需要更新链表，维护的代价较高。
4. 最近未使用（NRU,Not Recently Used）  
   每个页面有2个状态位R、M，R为1表示被访问，M为1表示最近被修改，R会定时清0。优先置换被修改而不是被访问的页面，也就是（0,1）要比（1,0）先被置换。
5. 第二次机会算法  
   单纯的先进先出可能会将频繁访问的页面置换出去，所以这里有一个机制，就是被访问的页面设置一个状态位R=1，当需要置换时从链表头部开始，若该元素的R为0，说明他是先进来的又没有被访问那么就直接把它置换掉。但是如果它的R是1，那么把R置为0并放到链表尾部，重新从链表头部寻找需要被置换的页面。
6. 时钟（Clock）  
   第二次机会算法需要在链表中移动页面，降低了效率。所以时钟算法将链表连成了一个环，指针指向最老的页面，当需要置换时，如果R=0，直接置换，如果R=1，把R置为0，指针后移。

## OS程序内存结构
操作系统中程序的内存结构：

BSS段：未初始化数据区。存放程序中未初始化的全局变量和静态变量。静态分配：程序结束后由系统自动释放资源。

data段：存放已初始化的全局变量。静态分配。

代码段：存放程序执行代码的区域。

text段和data段编译时已经分配了空间，BSS段不占用可执行文件大小。

栈区：存放函数的参数值、局部变量等。

堆区：用于动态分配内存。



空闲内存管理方式

位图和空闲链表

# ·进程和线程
## 进程状态
### <font style="color:#000000;">进程状态的切换（生命周期）</font>
+ <font style="color:#000000;">就绪状态（ready）：可运行，但其他进程正在运行，等待被调度。</font>
+ <font style="color:#000000;">运行状态（running）：正在占用CPU时间片运行。</font>
+ <font style="color:#000000;">阻塞状态（waiting）：不具备运行条件，等待资源</font>

![进程状态](https://cdn.nlark.com/yuque/0/2022/png/22839467/1657084830403-000c9e16-1eee-42ca-86ce-0cd5ef72f8bc.png)

<font style="color:#000000;">就绪态和运行态可以相互转换。就绪状态的进程通过调度算法获得 CPU 时间，会转为运行状态；而运行状态的进程，在分配给它的 CPU 时间片用完之后就会转为就绪状态。</font>

<font style="color:#000000;">阻塞状态是缺少运行需要的资源从运行状态转换而来，但是该资源不包括 CPU 时间。</font>

<font style="color:#000000;">新建态：分配资源和空间。设置进程为就绪态。</font>

<font style="color:#000000;">终止态：等待操作系统或者相关进程进行善后处理。回收资源并被系统删除。</font>

### <font style="color:#000000;">进程终止方式</font>
1. 正常退出（<font style="background-color:#E4F7D2;">自愿</font>）
   1. 编译器完成程序编译后，会执行一个系统调用告诉操作系统完成了工作。
   2. 点×
2. 错误退出（<font style="background-color:#E4F7D2;">自愿</font>）
   1. 例如用户执行编译某个文件，但这个文件不存在，就会退出。
3. 严重错误（<font style="background-color:#FFE8E6;">非自愿</font>）
   1. 进程执行过程中发生错误。如除数为0。
4. 被其他进程杀死（<font style="background-color:#FFE8E6;">非自愿</font>）
   1. 某进程执行系统调用告诉操作系统杀死某进程。

## 进程和线程的区别？
### 区别
进程是正在执行的程序的实例，web程序。线程是属于进程的，相当于进程的单条流向，进程是资源调度的基本单位，线程是CPU调度的基本单位，比如浏览器看成是进程，那么一个tab页可以看做线程。

操作系统是负责管理运行中的进程的，负责为每个进程分配特定的时间片来占用<font style="background-color:#FADB14;">CPU</font>，并且为每个进程分配一定的<font style="background-color:#FADB14;">资源</font>。每个进程有一个PCB是一个用来描述进程的数据结构，包含一些基本信息和运行状态。操作系统为了跟踪进程的状态，维护了一个进程表，列出了每个进程的状态和每个进程占有的资源。

进程包括，地址空间、全局变量，打开的文件，子进程。

线程包括，程序计数器，堆栈，寄存器，状态信息。



**创建线程**的开销比进程小的多，因为只需要一些<font style="background-color:#FADB14;">堆栈指针</font>和<font style="background-color:#FADB14;">程序计数器</font>。创建进程分配新的地址空间，数据、资源等，开销比较大。

### 上下文切换
对于单核CPU来说，在某一时刻只能执行一条CPU指令，上下文切换就是把<font style="background-color:#FADB14;">CPU资源</font>从一个进程分配给<font style="background-color:#FADB14;">另一个</font>进程的机制。那么这样从用户角度看，就好像很多个进程在一起执行一样。切换过程中需要保存当前进程的状态，比如内存空间的指针，执行到哪条指令等，再读入下一个进程，然后执行。线程不像进程那样具有很强的独立性，线程之间是会共享数据。上下文切换会导致用户态和内核态的切换。

这篇文章是一片结合上下文切换+IO模型+用户内核切换之间关系的文章。等整理完IO模型以后再来看看整理一下。[https://www.cnblogs.com/wangshaowei/p/14358774.html](https://www.cnblogs.com/wangshaowei/p/14358774.html)

上下文切换的原因：(当前线程阻塞会让出cpu)

1. 系统CPU调度。
2. 遇到I/O阻塞，挂起当前任务，调度下一个。
3. 当前任务没有抢到锁。
4. 线程执行sleep等方法。
5. 硬件中断。

### 用户态、内核态
用户态和内核态是操作系统的两种运行状态。内核态的cpu可以访问任何数据，包括外围设备如网卡、硬盘等。用户态：用户态的cpu只能受限的访问内存。用户进程是运行在用户态的，但是权限有限，一些重要的操作需要内核态才能去做。比如磁盘读取数据、键盘键入。操作系统执行系统调用可以切换到内核态。从用户到内核叫trap进内核，也叫陷阱指令。

内核：内核是一个计算机程序，是操作系统的核心，可以控制操作系统所有的内容。

## 进程通信
进程同步就是控制多个进程按一定顺序执行。进程通信是进程之间传输信息，每个进程有自己的用户地址空间，一个进程的全局变量，其他进程是看不到的，所以需要进程通信。

管道：匿名管道，调用pipe函数创建，只支持半双工，只能在父子进程中使用。命名管道没有父子进程这样的限制。

消息队列：是一种间接的，生产者向队列中添加数据，消费者从中取数据。

信号量：是一个计数器，为多个进程或者多线程提供对共享变量的访问。

信号：发送信号通知进程某个事件已经发生。

共享内存：多个进程共享一个给定的存储区。因为数据不需要在进程之间复制，所以速度很快。

Socket：用于不同主机间进程通信。



**线程通信：**

Synchronized

While轮询

Wait/notify



## 进程调度算法
进程调度算法：先来先服务FCFS，短作业优先SJF，时间片轮转，高响应比优先，优先级调度，多级反馈队列。

不同环境的调度算法目标不同，因此需要针对不同环境来讨论调度算法。

批处理系统没有太多的用户操作，在该系统中，调度算法目标是保证吞吐量和周转时间（从提交到终止的时间）。

<font style="background-color:#FADB14;">先来先服务</font>first-come first-serverd（FCFS）

按照请求的顺序进行调度。

有利于长作业，但不利于短作业，因为短作业必须一直等待前面的长作业执行完才能执行，而长作业又需要执行很长时间，造成了短作业等待时间过长。

<font style="background-color:#FADB14;">短作业优先</font> shortest job first（SJF）

按运行时间最短的顺序进行调度。

可能会导致长作业饥饿，处于一直等待短作业执行完毕的状态。因为如果一直有短作业到来，那么长作业永远得不到调度。

<font style="background-color:#FADB14;">最短剩余时间优先</font> shortest remaining time next（SRTN）

按估计剩余时间最短的顺序进行调度。

交互式系统有大量的用户交互操作，在该系统中调度算法的目标是快速地进行响应。

<font style="background-color:#FADB14;">时间片轮转</font>算法

将所有就绪进程按 FCFS （先来先服务） 的原则排成一个队列，每次调度时，把 CPU 时间分配给队首进程，该进程可以执行一个时间片。当时间片用完时，由计时器发出时钟中断，调度程序便停止该进程的执行，并将它送往就绪队列的末尾，同时继续把 CPU 时间分配给队首的进程。

的效率和时间片的大小有很大关系。因为进程切换都要保存进程的信息并且载入新进程的信息，如果时间片太小，会导致进程切换得太频繁，在进程切换上就会花过多时间。

<font style="background-color:#FADB14;">优先级调度</font>

为每个进程分配一个优先级，按优先级进行调度。

为了防止低优先级的进程永远等不到调度，可以随着时间的推移增加等待进程的优先级。

<font style="background-color:#FADB14;">多级反馈队列调度算法</font>

“多级”在于有多个不同优先级的队列，“反馈”在于如果有进程加入优先级高的队列时立即停止当前任务，转去执行优先级高的队列中进程，上述过程循环调度就形成多级反馈队列调度算法。

如果一个进程需要执行 100 个时间片，如果采用时间片轮转调度算法，那么需要交换 100 次。

多级队列是为这种需要连续执行多个时间片的进程考虑，它设置了多个队列，每个队列时间片大小都不同，例如 1,2,4,8,..。进程在第一个队列没执行完，就会被移到下一个队列。这种方式下，之前的进程只需要交换 7 次。

每个队列优先权也不同，最上面的优先权最高。因此只有上一个队列没有进程在排队，才能调度当前队列上的进程。

可以将这种调度算法看成是时间片轮转调度算法和优先级调度算法的结合。

## 死锁
死锁：多个进程或者线程对共享资源争抢或者互相依赖，产生的一种不经过外力无法破除的一种现象。

四个必要条件：

互斥：资源是互斥访问的，如果被某个线程持有，其他线程只能等待。

请求和保持：发生阻塞时，当前持有的资源保持不放。

不可剥夺：当前进程未执行完时，所持有的资源不能被剥夺。

循环等待：进程之间循环等待资源。



解决死锁：

1. 鸵鸟策略

2. 死锁检测与恢复

3. 死锁预防

4. 死锁避免



鸵鸟策略就是发生死锁时不去管他，因为处理死锁的代价很高，反而不处理会带来更高的性能，当死锁不易发生或者产生死锁对用户的影响不大时采取这种策略。



死锁检测和恢复：

死锁检测算法：深度搜索进程资源有向图，如果进程资源有向图中存在环路，表明发生死锁，检测方式是dfs，对搜索的节点做标记，若遍历到存在标记的节点，表明有向图中存在环路，会发生死锁。

第二种死锁检测算法是标记法：向量E代表资源总数，向量A代表剩余资源，矩阵C代表各进程持有资源数，矩阵R代表各进程要请求的资源数，R中找到某个进程请求的资源数小于剩余资源，标记该进程，意味着该进程可以请求到自己需要的资源，之后释放持有资源，将C中该进程持有的资源加到剩余资源A中，完成释放资源，直到最后如果R中存在没有被标记的进程代表会发生死锁。



死锁恢复算法：资源剥夺法，进程回滚法，杀死进程。



死锁预防：

破坏互斥条件：如果资源是共享资源，则不会发生死锁。但是有些资源是不允许共享访问的，比如键盘，可写文件，有些资源是可以共享访问的，比如只读文件和磁盘。所以破坏互斥条件只适合一部分资源。

破坏请求和保持条件：如果进程持有一部分资源且申请其他资源的时候由于它不会释放自己持有的资源，可能会发生死锁。可以在程序运行前把所有它需要的资源都分配给该进程，但是会造成资源的浪费。

破坏不可剥夺条件：方案一：当持有资源申请不到其他资源时，可以强迫其释放所持有的资源，需要时再次申请。方案二：当进程请求的资源被其他进程占有，由操作系统协调剥夺其他进程占有的资源。方案一是释放自己的，可能导致前期所做的工作失效。方案二是释放其他的，可能会导致其他进程前期所做的工作失效。



破坏循环等待条件：将资源按顺序编号，申请资源按顺序递增的方式申请。缺点是不易增加新的设备，用户编程麻烦。



死锁避免：

先说一下安全状态，安全状态就是现在进程占有的资源，请求的资源，剩余的资源，进程申请资源并释放，能够保证最后所有的进程都执行，那么该状态就是安全状态。

银行家算法：思想就是为进程分配资源，分配以后是否为安全状态，如果是就分配，否则就不分配，直到所有进程满足资源的申请条件，就不会发生死锁。并且会产生一个对应的安全序列，也就是进程分配资源的顺序。

# ·IO模型
## IO模型
IO模型：

假设我们两个主机上的应用进程进行通信，<font style="background-color:#FCFCCA;">A应用向B应用发送一条消息</font>，<font style="background-color:#D3F5F0;">应用A</font>把数据<font style="background-color:#EFE1FA;">发送</font>到内核的<font style="background-color:#D3F5F0;">TCP缓冲区</font>，TCP缓冲区把数据发送到网络上，然后经过网络的传输，到达接收方主机的<font style="background-color:#D3F5F0;">TCP接收缓冲区</font>，然后<font style="background-color:#D3F5F0;">应用B</font>再从接收缓冲区<font style="background-color:#EFE1FA;">读取</font>自己的数据。

### 阻塞IO
应用B发起recvfrom系统调用准备读取数据，在从TCP接收缓冲区中拿数据的时候，接收缓冲区可能<font style="background-color:#FCFCCA;">还没有准备好</font>，应用B<font style="background-color:#FCFCCA;">阻塞</font>的等待，直到TCP接收缓冲区中的数据准备好了，拿到数据以后再从TCP接收缓冲区也就是内核<font style="background-color:#FCFCCA;">拷贝</font>到应用进程用户空间再返回。也就是从进程调用到返回这段时间都是阻塞的，称为阻塞IO。

例如data=socket.read();如果内核数据没有就绪，Socket线程就会一直阻塞在read()中等待内核数据就绪。

### 非阻塞IO
非阻塞IO就是应用进程B发起系统调用读取数据，如果TCP缓冲区也就是内核数据还没有准备好，会<font style="background-color:#FCFCCA;">直接返回</font>一个_EWOULDBLOCK_错误，应用进程不用一直等待，但是要<font style="background-color:#FCFCCA;">不断的调用</font>recvfrom请求，直到内核数据准备好为止，准备好以后再从内核拷贝到用户空间。返回成功提示。也就是发起recvfrom系统调用不会阻塞进程，而是立即返回，但是需要进行忙等，用轮询的方式询问数据是否准备好。

比如：

```java
while(true) {
    data=socket.read();
    if(data==true) {
        // 获取并处理
        break;
    } else {
        // 内核未就绪，处理其他任务。
    }
}
```

### IO多路复用
多线程并发编程用的较多，例如Java NIO就是基于IO多路复用

在并发的环境下，可能有N个人向应用B发送消息，刚才说的那两种IO模型需要我们<font style="background-color:#E4F7D2;">创建多个线程</font>去读取对应的数据，每个线程都会发起recvfrom系统调用去<font style="background-color:#E4F7D2;">读取</font>数据，这个时候假设我们并发的规模很大，也就是说应用B需要创建很多的线程去读取数据，对于非阻塞IO模型来说，这些线程需要不断的向内核发送recvfrom系统调用来读取数据。我们的系统可能没办法<font style="background-color:#E4F7D2;">创建出这么多线程</font>，而且严重<font style="background-color:#E4F7D2;">浪费系统资源</font>。IO多路复用就可以解决这个问题，解决的思路就是采用1个或者多个线程<font style="background-color:#FFE8E6;">监控多个网络请求</font>，也就是fd文件描述符，linux系统把所有<font style="background-color:#FFE8E6;">网络请求用fd</font>来标识。这样就可以只用一个或者几个线程去做<font style="background-color:#FFE8E6;">询问内核数据状态</font>的操作，也就是监视多个描述符，当数据准备就绪了再分配对应的线程去读取数据，这样就可以节省大量的线程资源。

IO多路复用是<font style="background-color:#FFE8E6;">select、poll、epoll</font>来监控fd。

Select：select会阻塞程序，由内核<font style="background-color:#FFE8E6;">轮询</font>多个fd，当有fd准备就绪了，select返回。然后应用进程分配线程调用<font style="background-color:#D4EEFC;">recvfrom</font>读取数据。支持跨平台，缺点是调用select需要把fd集合从用户态拷贝到内核态，需要通过<font style="background-color:#FCFCCA;">遍历</font>fdset，来找到<font style="background-color:#EFE1FA;">就绪</font>的fd；第二就是单线程监控的文件描述符<font style="background-color:#FCFCCA;">数量</font>有限制1024；

Poll：描述fd集合的方式不同，poll使用<font style="background-color:#EFE1FA;">pollfd指针</font>，而不是fd_set结构，链式的没有fd最大连接数限制。轮询的缺点：很多时候就绪状态的fd可能很少，那么轮询的效率也比较低。

Epoll：查看可读写事件时epoll采用<font style="background-color:#EFE1FA;">事件驱动</font>避免轮询，当<font style="background-color:#FCFCCA;">事件</font>准备好了以后，内核会采用回调机制通知应用进程。不需要轮询获取准备好的数据。

3个api，epoll_create(int size)，创建一个epoll对象，传回它的id，size是告诉它监听的数目多大，并不是限制fd的个数，而是对内核初始分配数据结构的一个建议。Epoll_ctl，事件注册函数，把需要监听的fd或者事件交给epoll对象，就是注册一个fd，并且为每个fd指定一个回调函数，当某个fd准备就绪，把就绪的fd加入一个就绪的队列。Epoll_wait：等待，就绪队列中有没有就绪的fd，如果有就唤醒就绪队列上的等待者，然后调用回调函数。当注册的事件被触发时会得到通知。

### 信号驱动IO模型
思想就是，前面说的IO多路复用需要select去轮询监控多个fd，信号驱动的思想就是应用进程发起<font style="background-color:#FCFCCA;">系统调用</font>等你内核数据准备好了就通知我这样的一种思想，通过系统调用<font style="background-color:#FCFCCA;">sigaction</font>执行信号处理函数，请求会立即返回，<font style="background-color:#FCFCCA;">当数据准备就绪</font>了，就会生成对应的<font style="background-color:#FCFCCA;">SIGIO</font>信号，通知应用进程，分配对应的线程去<font style="background-color:#FCFCCA;">调用recvfrom读取数据</font>。

### 异步IO
不管是IO多路复用还是异步IO，读取数据总是要发起<font style="background-color:#FCFCCA;">两阶段请求</font>，第一次发送<font style="background-color:#FFE8E6;">select</font>请求，询问数据是否准备好，第二步再发起<font style="background-color:#FFE8E6;">recvfrom</font>请求读取数据。异步IO就是应用只需要向内核发送<font style="background-color:#D3F5F0;">一个read请求</font>，告诉内核要读取数据然后立即返回，也就是内核数据准备就绪，内核会主动把数据从<font style="background-color:#D3F5F0;">内核拷贝到用户空间</font>。操作都完成之后，内核会发起一个通知告诉应用进程。

BIO：ServerSocket

NIO：ServerSocketChannel

## Java
### Java.io
Java.io包中5个类是File、OutputStream、InputStream、Writer、Reader，1个接口是Serializable。

### Java NIO
定义：

1. Java NIO的实现主要涉及三大核心内容：Selector(选择器)、Channel(通道)和Buffer(缓冲区)。

特点：

1. 数据从Channel读取到Buffer中。
2. 或者从Buffer写入Channel中。

区别：

1. 传统I/O基于数据流进行I/O读写。阻塞。
2. NIO基于Channel和Buffer进行I/O读写。非阻塞。

#### selector
作用：

1. 一个线程监听多个Channel的事件，比如连接打开或数据到达。

#### Channel
定义：

1. 和I/O中的Stream（流）类似，只不过Stream是单向的。
2. 而Channel是双向的，既可以用来读，也可以用来写。

实现：

1. FileChannel、DatagramChannel、SocketChannel、ServerSocketChannel。
2. 文件I/O、UDP、TCP I/O的Socket Client、Socket Server

#### Buffer
定义：

1. Buffer是一个容器，内部通过连续的字节数组存储I/O上的数据。
2. Channel对数据读取和写入需要经过Buffer。

流程：客户端->服务端

1. 客户端把输入写入Buffer。
2. 将Buffer中的数据写道服务端对应的Channel。
3. 服务端通过Channel将数据读取到服务端Buffer。
4. 然后从Buffer读取数据并处理。



## 零拷贝
### 传统IO流程
<font style="background-color:#FFE8E6;">用户应用进程</font>调用<font style="background-color:#D4EEFC;">read</font>函数，向操作系统发起IO调用，从用户态切换到内核态。

<font style="background-color:#D4EEFC;">DMA</font>控制器把数据从磁盘读取到内核缓冲区。

<font style="background-color:#D4EEFC;">CPU</font>把内核缓存区的数据拷贝到用户应用缓冲区，上下文切换从内核态转为用户态，read函数返回。

<font style="background-color:#FFE8E6;">用户应用进程</font>通过<font style="background-color:#D4EEFC;">write</font>函数，发起IO调用，上下文从用户态转为内核态。

<font style="background-color:#D4EEFC;">CPU</font>将应用缓冲区的数据拷贝到socket缓冲区，

<font style="background-color:#D4EEFC;">DMA</font>控制器把数据从socket缓冲区拷贝到网卡设备，上下文从内核态切换回用户态，write函数返回。

<font style="background-color:#EFE1FA;">传统的IO读写流程包括4次上下文切换和4次数据拷贝。</font>



### Mmap+write实现的零拷贝
Mmap使用了虚拟内存，把<font style="background-color:#D4EEFC;">内核空间</font>和<font style="background-color:#D4EEFC;">用户空间</font>的虚拟地址映射到同一个物理地址，从而减少了数据拷贝次数。

<font style="background-color:#FFE8E6;">用户进程</font>通过<font style="background-color:#D4EEFC;">mmap</font>方法向操作系统内核发起IO调用，从用户态切换到内核态。

CPU利用<font style="background-color:#D4EEFC;">DMA</font>控制器，把数据从磁盘拷贝到内核缓冲区。

上下文从内核切换回用户态，mmap方法返回。

<font style="background-color:#FFE8E6;">用户进程</font>通过write方法向操作系统内核发起IO调用，上下文从用户态切换为内核态。

<font style="background-color:#D4EEFC;">CPU</font>将内核缓冲区的数据拷贝到socket缓冲区

CPU利用<font style="background-color:#D4EEFC;">DMA</font>控制器，把数据从socket缓冲区拷贝到网卡，上下文从内核切换回用户态，write调用返回。

<font style="background-color:#EFE1FA;">IO发生了4次上下文切换以及3次数据拷贝。3次拷贝包括2次DMA拷贝和1次CPU拷贝。</font>

Mmap实现<font style="background-color:#E4F7D2;">内核缓冲区</font>和<font style="background-color:#E4F7D2;">用户缓冲区</font>的虚拟地址映射到同一个物理地址，节省了一次CPU拷贝。用户进程内存是虚拟的，只是映射到内核读缓冲区，可以节省一半的内存空间。



### Sendfile实现的零拷贝
<font style="background-color:#FFE8E6;">用户进程</font>发起<font style="background-color:#D4EEFC;">sendfile</font>系统调用，上下文从用户态切换为内核态

<font style="background-color:#D4EEFC;">DMA</font>控制器把数据从磁盘拷贝到内核缓冲区。

<font style="background-color:#D4EEFC;">CPU</font>将读缓冲区中的数据拷贝到socket缓冲区

<font style="background-color:#D4EEFC;">DMA</font>控制器把数据从socket缓冲区拷贝到网卡

上下文从内核态切换回用户态，<font style="background-color:#D4EEFC;">sendfile调用返回</font>。

<font style="background-color:#EFE1FA;">Sendfile实现的零拷贝3次数据拷贝和2次上下文切换。</font>



### sendFile linux2.4
Linux2.4版本又做了优化升级，引入SG-DMA技术，直接从内核缓冲区将数据通过DMA的方式读取到网卡，减少了一次CPU拷贝。

<font style="background-color:#FFE8E6;">用户应用进程</font>发起<font style="background-color:#D4EEFC;">sendfile</font>系统调用，上下文从用户态切换到内核态。

<font style="background-color:#D4EEFC;">DMA</font>控制器把数据从磁盘拷贝到内核缓冲区，

<font style="background-color:#D4EEFC;">CPU</font>把内核缓冲区的文件描述符信息发送到socket缓冲区。

<font style="background-color:#D4EEFC;">DMA</font>控制器根据文件描述符信息把数据从内核缓冲区拷贝到网卡。

上下文从内核切换回用户态，<font style="background-color:#D4EEFC;">sendfile调用返回</font>。



在消息队列中间件中，<font style="background-color:#FCFCCA;">rocketMQ消费消息采用mmap</font>，<font style="background-color:#FCFCCA;">kafka采用sendFile</font>。

## DMA
直接内存访问，在不需要CPU参与的情况下读取、写入内存。设备直接送入主存，或者从主存直接输出到设备上。



# ·CPU
## <font style="color:#000000;">中断</font>
### 缺页中断
1. 保护CPU现场
2. 分析中断原因
3. 转入缺页中断处理程序进行处理
4. 恢复CPU现场，继续执行

和一般中断的区别是缺页中断返回时执行产生中断的一条指令，而一般的中断返回时执行下一条指令。一条指令可能产生多次缺页中断。

### 中断
外中断：

由 CPU 执行指令以外的事件引起，如 I/O 事件完成产生中断，表示设备输入/输出处理已经完成，处理器能够发送下一个输入/输出请求。

异常：

由 CPU 执行指令的内部事件引起，如地址越界、算术溢出等。

陷入：

在用户程序中使用系统调用。



## 伪共享
### 缓存行
cpu和内存之间有好几级缓存，因为cpu直接访问内存是非常慢的。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1657601933561-aa080e0f-96f6-4227-87f0-d9cf3236cd11.png)

越靠近CPU缓存越快也越小。



缓存由缓存行组成，通常是64字节。也就是可以存储8个long类型变量。缓存会从主存中加载数据会加载完整的缓存行，比如加载long类型的数组，后面的7个元素都会被加载进来。

### 伪共享
假设有一个变量a，另外还有一个变量b紧挨着a。现在如果有一个线程对变量a进行修改，另一个线程对变量b进行读取，当前者修改a时，会把a和b加载到缓存中，更新完a以后所有包含a的缓存行将失效。当后者读取b时发现这个缓存行已经失效了，需要从主内存中进行读取。这就出现了问题，更新a却导致b的查询变慢了，也就是互相独立的变量，但是因为共享同一个缓存行，无意中影响了彼此的性能。就是伪共享。

【一般a，b用volatile关键字，保证可见性（修改a，b能感知）】



### 如何避免伪共享
1. 如果是两个long类型，中间可以加7个long类型，让他们在不同缓存行。
2. 创建自己的Long类型。volatile long value; long p1,p2,p3,p4,p5,p6,p7;
3. 使用@sun.misc.Contended注解并且修改JVM参数：-XX:-RestrictContended

# ·linux命令
常用linux命令

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1652252550015-b34e9809-e4b5-4f91-9e54-6f07d8504bfc.png)![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1652252560363-7e61352c-28c8-4766-bb01-ce10da55954a.png)![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1652252569056-8ed87704-8ef2-4010-a99a-01fd1fb78545.png)![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1652252576429-cb08f5d1-e398-43ee-a75e-95f300dacbaa.png)![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1652252589044-98824e79-cdda-4c93-9ef9-0d8358c29364.png)

