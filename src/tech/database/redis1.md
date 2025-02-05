---
title: Redis(上)
date: 2023-02-12
index: false
icon: laptop-code
category:
  - Redis
tag:
  - 数据类型
  - AOF&RDB
  - 缓存一致性
  - redis实战
---

# ·为什么用redis
**<font style="color:rgb(77, 77, 77);">场景</font>**<font style="color:rgb(77, 77, 77);">：因为传统的关系型数据库如Mysql不能适用所有的</font><font style="color:rgb(77, 77, 77);background-color:#FADB14;">场景</font><font style="color:rgb(77, 77, 77);">了，比如秒杀的库存扣减（超卖->乐观锁），某些高并发访问（缓存击穿->分布式锁）等等，都很容易把数据库打崩，所以有必要引入缓存中间件。</font>

**<font style="color:rgb(77, 77, 77);">性能</font>**<font style="color:rgb(77, 77, 77);">：redis基于内存的</font><font style="color:rgb(77, 77, 77);background-color:#FADB14;">高性能</font><font style="color:rgb(77, 77, 77);">key-value数据库，速度快，具备高并发访问的特性。</font>

**<font style="color:rgb(77, 77, 77);">数据类型</font>**<font style="color:rgb(77, 77, 77);">：提供了多种数据类型。</font>

**<font style="color:rgb(77, 77, 77);">其他</font>**<font style="color:rgb(77, 77, 77);">：支持事务、持久化、集群、发布订阅、内存淘汰机制、过期删除机制等等。</font>

<font style="color:rgb(77, 77, 77);">Memcached和redis的区别？</font>

1. <font style="color:rgb(77, 77, 77);">都基于内存。都有过期策略。性能也都比较高。</font>
2. <font style="color:rgb(77, 77, 77);">Memcached只支持简单的key-value数据类型，redis支持的数据类型更丰富。</font>
3. <font style="color:rgb(77, 77, 77);">redis支持数据的持久化，可以将内存数据保存在磁盘，重启的时候可以再次加载使用。memcached没有持久化功能，数据全部保存在内存，memcached重启或者挂掉后，数据就没了。</font>
4. <font style="color:rgb(77, 77, 77);">redis支持集群，memcached没有原生的集群模式，需要依靠客户端支持实现。</font>
5. <font style="color:rgb(77, 77, 77);">redis支持发布订阅模型、lua脚本、事务等功能。</font>

<font style="color:rgb(77, 77, 77);"></font>

# ·数据结构
## <font style="color:rgb(77, 77, 77);">String</font>
<font style="color:rgb(77, 77, 77);">key-value键值对，可以存储字符串、整数或者浮点数。</font>

### <font style="color:rgb(77, 77, 77);">结构</font>
<font style="color:rgb(77, 77, 77);">底层机构是简单动态字符串SDS。redis是C语言写的，但是并没有直接用C语言的字符串。</font>

```c
struct sdshdr {
    int len;// 记录已使用的长度   
    int free; // 记录空闲未使用的长度
    char[] buf; // 字符数组
}
```

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654748250694-32d4c1c7-91f1-4ca3-9f4c-aa981245560a.png)

<font style="background-color:#E4F7D2;">优点</font>：1. 快速获取字符串长度O(1)。2. 拼接字符串时不会造成缓冲区溢出，追加机制，先看看空闲长度够不够，如果不够，会进行扩容，当小于1M，每次扩容加倍；否则每次扩容追加1M。

### 场景
String常见的应用场景：缓存对象、一些计数、分布式锁等。共享session信息等(什么？)。

<font style="color:rgb(77, 77, 77);">我项目中用到的string（验证码、登录凭证、点赞帖子时发帖人的总获赞数、缓存user信息）</font>

## Hash
### 结构
<font style="color:rgb(77, 77, 77);background-color:#FCFCCA;">字典Hash</font><font style="color:rgb(77, 77, 77);">：redis3.0：</font>哈希表或压缩列表，redis7.0：哈希表+listpack

如果哈希类型的元素个数小于512(hash-max-ziplist-entries)，所有值小于64字节(hash-max-ziplist-value)时，redis会使用<font style="background-color:#52C41A;">压缩列表</font>作为hash类型的底层数据结构。如果不满足上面条件，redis会使用<font style="background-color:#52C41A;">哈希表</font>作为hash类型的底层数据结构。

与java的hashmap类似，类似于数组+链表的结构，当发生哈希碰撞时把元素追加到链表上。

### 语法
hset key field value

hget key field

### 场景
<font style="background-color:#FCFCCA;">场景：</font>Hash也可以用来缓存对象。String存的对象信息是经过<font style="background-color:#FCFCCA;">序列化</font>后的字符串。如果想要修改某个用户字段必须将用户信息字符串全部查询出来，解析成相应的用户信息对象，修改完后在序列化成字符串存入。

Hash可以对用户信息的每个<font style="background-color:#FCFCCA;">字段单独存储</font>。而 hash可以只对某个字段修改，从而节约网络流量，不过hash内存占用要大于 String，这是 hash 的缺点。



## List
### 结构
<font style="color:rgb(77, 77, 77);background-color:#D3F5F0;">列表List</font><font style="color:rgb(77, 77, 77);">：redis3.0版本是</font>压缩列表或双向链表，redis3.2版本开始是quicklist。

<font style="background-color:#D3F5F0;">结构：</font>当数据量较<font style="background-color:#D3F5F0;">少</font>的时候，默认情况列表元素个数小于512个(可由list-max-ziplist-entries配置)，列表每个元素值都小于64字节(list-max-ziplist-value)，会使用压缩列表ziplist作为list的底层存储结构，它将所有的元素<font style="background-color:#D3F5F0;">紧挨</font>着一起存储，分配的是一块<font style="background-color:#D3F5F0;">连续</font>的内存；当不满足上面条件的时候将会使用双向链表作为list底层存储结构。

在redis3.2变成quicklist(<font style="background-color:#D3F5F0;">快速链表</font>)结构。ziplist+链表的混合结构，每一个节点存储prev和next指针，每个节点包含一个ziplist。

### 语法
<font style="background-color:#D3F5F0;">语法：</font>rpush key value1 value2...

<font style="color:rgb(77, 77, 77);">LPUSH/RPUSH/LPOP/RPOP/LREM(删除列表指定元素)/SMEMBERS(查询集合所有元素)</font>

### <font style="color:rgb(77, 77, 77);">场景</font>
<font style="background-color:#D3F5F0;">应用场景：</font>消息队列：lpop和rpush（或者反过来，lpush和rpop）能实现队列的功能。但是有2个问题：1. 生产者需要自行实现全局唯一ID，2. 不能以消费组形式消费数据。

## Set
### 结构
<font style="color:rgb(77, 77, 77);background-color:#FAE1EB;">集合Set: </font>哈希表或整数集合

如果集合的元素都是整数且元素个数小于512(set-maxintest-entries)个，redis会使用整数集合作为set的底层数据结构，否则会使用哈希表。

<font style="color:#000000;background-color:#FAE1EB;">结构：</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">Redis</font><font style="color:rgb(77, 77, 77);"> 中的 </font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">set</font><font style="color:rgb(77, 77, 77);">和</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">Java</font><font style="color:rgb(77, 77, 77);">中的</font><font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">HashSet</font><font style="color:rgb(77, 77, 77);"> 有些类似，它内部的键值对是</font><font style="color:rgb(77, 77, 77);background-color:#FAE1EB;">无序</font><font style="color:rgb(77, 77, 77);">的、</font><font style="color:rgb(77, 77, 77);background-color:#FAE1EB;">唯一</font><font style="color:rgb(77, 77, 77);">的。它的内部实现相当于一个特殊的字典，字典中所有的</font><font style="color:rgb(77, 77, 77);background-color:#FAE1EB;">value</font><font style="color:rgb(77, 77, 77);">都是一个值 </font><font style="color:rgb(77, 77, 77);background-color:#FAE1EB;">NULL</font><font style="color:rgb(77, 77, 77);">。</font>

### <font style="color:rgb(77, 77, 77);">语法</font>
sadd key value

smembers key: key集合所有元素

scard key：获取集合长度

spop key：弹出一个元素

srem key value: 删除指定元素

sismember key value: 是否存在某个value

sinter命令可以获得A和B两个用户的共同好友；

### 场景
比如在一些需要聚合计算（并集、交集、差集）场景，比如点赞、共同关注、抽奖活动等。

我项目中点赞时某个帖子的点赞人集合、帖子热度排行所需刷新的帖子id。

## Zset
<font style="color:rgb(77, 77, 77);">zset也叫SortedSet，它是个 set ，内部 的value 是唯一的，对于每个 value 会有一个分数score，代表这个value的排序权重。</font>

### 结构
<font style="color:rgb(77, 77, 77);">redis3.0版本：</font>压缩列表或跳表，redis7.0：跳表+listpack

如果有序集合的元素个数小于128个，每个元素的值小于64个字节时，使用压缩列表。否则使用跳表。

在redis7.0中，不用压缩列表了，改用listpack数据结构实现。

### 语法
zadd key score value

zcard key

zrange key start_index end_index: 获取下标范围内的元素列表，按score排序输出。

zscore key value: 获取元素的score

### 场景
<font style="color:#000000;">在一些需要排序的场景，比如排行榜等。</font>

<font style="color:#000000;">在我的项目中，</font><font style="color:#000000;">某个用户的关注，某个用户的粉丝，使用zset存储的原因是按照关注时间排列显示。</font>

## 其他数据类型
<font style="color:#000000;">还用到了hyperloglog统计uv独立访客，hyperloglog占用内存小，它是能够进行海量数据基数统计的，但是会有一定的误差。</font>

<font style="color:#000000;">实现：存储当日用户登录的ip，这样可以统计当日有多少独立ip，也可以合并日期统计一个时间范围内有多少uv。</font>

<font style="color:#000000;">bitmap用来统计dau，dau和uv的区别就是活跃用户数，统计的是登陆的用户。</font>

<font style="color:#000000;">实现：某个用户访问网站，对应userId位置存储上true，这样统计当日true的数量即可统计当日活跃用户数，也可以统计一个时间范围内的dau数。</font>

<font style="color:rgb(77, 77, 77);"></font>

## <font style="color:rgb(77, 77, 77);">跳表</font>
<font style="color:#000000;">对于一个单链表来说，即便链表存储的数据是有序的，我们查找其中一个元素，也是需要从头到尾遍历链表。这样查找效率会很低，时间复杂度会很高。O（n）。如果想提高查找的效率，可以考虑在链表上建立索引的方式，每几个节点提取出一个节点到上一级。这样我们查找一个节点，可以先遍历索引，比如我们要找8，索引有一个节点7，节点7的下一个索引节点是9，那我们就知道8在7和9之间，我们就下降到下一层继续遍历找到节点8。比原来提高了查找效率。当然如果索引链表也很长的话，我们可以相同的操作再索引链表的上一层再加一层索引。这样多级索引组成的结构就是跳表，能够提升查找效率。</font>

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654757589168-78b4a5dd-ae47-41f4-98b8-67e3349c7931.png)



# ·线程模型
## 单线程
redis的网络IO和执行命令是单线程的。接收客户端请求->解析请求->数据读写->发送数据给客户端，这个过程是由一个线程（主线程）来完成的。

定义：

1. 调用过程发送命令、执行命令、返回结果三个过程。
2. 在执行命令阶段，redis是按照单线程来处理的。
3. 命令到达服务端，不会立即执行，被放入队列里，然后逐个被执行。

好处：

1. 不会产生并发问题。

### redis单线程
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1658552584751-f02d2966-bc2f-4e27-af5b-6ed929be089b.png)

#### 初始化
1. 调用epoll_create()创建一个epoll对象。
2. 调用bind()绑定端口，调用listen()监听该socket
3. 然后调用epoll_ctl()把listen socket加入到epoll，同时注册[连接事件]处理函数

#### 事件循环函数
1. 先调用处理发送队列函数，看发送队列是否有任务，如果有，则通过write将客户端发送缓冲区的数据发送出去，如果这一轮数据没有发送完，就会注册写事件处理函数，等待epoll_wait发现可写后再处理。
2. 接着，调用epoll_wait函数等待事件的到来：
    1. 如果是连接事件，则会调用连接事件处理函数：调用accept获取已连接的socket->调用epoll_ctl将已连接的socket加入到epoll->注册读事件处理函数。
    2. 如果是读事件到来，则会调用读事件处理函数：调用read获取客户端发送的数据->解析命令->处理命令->将客户端对象添加到发送队列->将执行结果写到发送缓存区等待发送。
    3. 如果是写事件到来，则会调用写事件处理函数：通过write函数将客户端发送缓存区里的数据发送出去，如果这一轮数据没有发生完，就会继续注册写事件处理函数，等待epoll_wait发现可写后再处理。

### 单线程为什么快？
1. redis的大部分操作在内存中完成+高效的数据结构。所以redis的性能瓶颈是内存或者网络带宽，而不是CPU，所以采用单线程。
2. 单线程可以避免多线程的竞争，省去了线程切换带来的时间+性能上的开销，而且不会产生死锁。
3. redis采用IO多路复用处理客户端的socket请求，就是一个线程处理多个IO流，也就是一个线程监听多个socket连接或数据请求，如果有请求到达，就会交给redis线程处理。

## 后台线程
redis程序并不是单线程的，redis在启动时，是会启动后台线程的。

比如[关闭文件、AOF刷盘、释放redis内存]的任务是创建单独的线程来处理的，因为这些任务的操作是很耗时的。

比如[释放redis内存]，如果用删除一个大的key时，用del命令是在主线程处理的，会导致redis主线程卡顿。所以使用unlink key删除命令，会异步的由后台线程来执行删除操作，不会导致主线程卡顿。

### 执行流程
生产者把相关的任务放到任务队列中，后台线程相当于消费者，从消息队列拿任务执行对应的方法。

# ·Redis持久化
redis读写操作在内存，当redis重启后，内存数据就会丢失，所以redis具有持久化的机制，把数据存储到磁盘，这样redis重启后就能从磁盘恢复原有的数据。

## AOF日志
每执行一条写操作命令，就把该命令以追加的方式写入到一个文件里。在redis重启时，会读取该文件记录的命令，然后逐一执行进行数据恢复。

### 顺序
先执行命令，再把数据写入日志。

如果先把写命令记录到AOF日志，再执行命令的话，如果当前的命令语法有问题，那么错误的命令记录到日志后，在redis使用日志恢复数据时，可能会出错。

而且这样不会阻塞当前也操作命令的执行，因为只有执行完以后才记录到AOF日志中。

不过可能会产生一些风险，比如执行完命令，还没来得及把命令写入硬盘时，服务器宕机了，那么这个数据会有丢失的风险。

因为AOF也是在主线程执行的，虽然不会阻塞当前命令的执行，但是可能会阻塞其他的操作。

### 写回策略
1. redis执行完写操作命令后，会将命令追加到server.aof_buf缓冲区。
2. 通过write()系统调用，把aof_buf缓冲区的数据拷贝到内核缓冲区page cache，等待内核将数据写入硬盘也就是AOF日志文件。
3. 具体内核缓冲区的数据什么时候写入硬盘，由内核决定。redis.conf配置，appendfsync配置项。
    1. Always：总是，同步写回，意思是每次写操作命令执行完，同步将数据写回硬盘。可靠性高，但是每个写命令写回硬盘，性能开销大。
    2. Everysec：每次写操作命令执行完后，先将命令写入AOF文件内核缓冲区，然后每隔一秒将缓冲区的内容写回硬盘。性能适中，但是宕机时会丢失1秒内的数据。
    3. No：由操作系统控制写回的时机，也就是写操作执行完后，先将命令写入AOF文件的内核缓冲区，再由操作系统决定何时将缓冲区内容写回硬盘。性能好，宕机时可能会丢数据。

### AOF重写机制
AOF的文件过大会带来性能问题，恢复过程就会很慢。AOF重写机制就是当文件大小超过所设定的阈值，就会启用AOF重写机制，压缩AOF文件。

#### 方法
读取所有键值对，把一些重复的或者可以覆盖的命令用一条新的命令替换，记录到新的AOF文件。全部记录完后，把新的AOF文件替换掉现有的。

#### 子进程
重写AOF过程是后台子进程bgrewriteaof来完成的，子进程AOF重写期间，主进程可以继续处理命令请求，避免阻塞。

子进程带有主进程的数据副本，这里使用子进程而不是线程，是因为如果使用线程，多线程之间会共享内存，在修改共享内存数据的时候，需要通过加锁来保证数据安全，而这样会降低性能，使用子进程，父子进程是共享内存的，不过只能只读，当父子进程任意一方修改了共享内存数据，就会发生写时复制，于是父子进程就有了独立的数据副本，就不用加锁来保证数据安全。

##### 问题
重写AOF日志过程中，如果主进程修改了已经存在的key-value，那么会发生写时复制，此时数据在主进程内存数据和子进程的内存数据不一致了。

redis设置了一个AOF重写缓冲区，在重写AOF期间，当redis执行完一个写命令后，会将这个写命令写入AOF缓冲区和AOF重写缓冲区。当子进程完成AOF重写后，向主进程发送一个信号，主进程收到信号后，会调用一个信号处理函数，将AOF重写缓冲区的所有内容追加到新的AOF文件，新的AOF文件进行改名，覆盖现有AOF文件。



## RDB快照
将某一时刻的内存数据，以二进制的方式写入磁盘。

### 为什么有RDB？
因为AOF记录的是操作命令，所以做故障恢复时，需要全量把日志都执行一遍，那么如果AOF日志非常多，会造成数据恢复缓慢。

RDB快照就是记录某个瞬间的内存实际数据，所以恢复数据时，RDB恢复数据的效率会比AOF高，因为直接将RDB文件读入内存就可以，不需要像AOF那样执行额外的操作命令才能恢复数据。

### RDB命令
1. save：会在主线程生成RDB文件，阻塞主线程。
2. bgsave：创建一个子线程生成RDB文件，避免主线程阻塞。redis提供配置实现每隔一段时间自动执行bgsave。

### RDB修改数据
执行bgsave时，redis依然可以继续处理写数据命令，关键技术就是写时复制COW。

如果主线程执行写操作，被修改的数据会复制一份副本，然后bgsave子进程会把副本数据写入RDB文件，与此同时，主进程仍然可以修改原来的数据。

## 混合持久化
集成了AOF和RDB的优点。

RDB优点是恢复数据速度快，但是快照的频率，如果太低，那么可能会丢失数据，太高，会影响性能。

AOF优点是丢失数据少，但是数据恢复不快。

混合持久化就是继承两者的优点，既保证了重启的速度，又降低数据的丢失风险。

### 过程
在AOF重写日志时，fork出来的重写子进程会将于主线程共享的内存数据以RDB方式写入AOF文件，然后主线程处理的操作命令会被记录在重写缓冲区中，增量会以AOF方式写入AOF文件，写完后通知主进程把含有RDB格式和AOF格式的AOF文件替换旧的AOF文件。

在恢复数据的时候，前半部分是RDB内容，加载时速度很快，加载完才会加载后半部分AOF内容，减少数据的丢失。

# ·Redis集群
## 主从复制
写操作在主服务器进行，从服务器一般是只读，主服务器把数据同步给从服务器，从服务器接收主服务器同步过来的写操作命令，然后执行，保证主从服务器的数据一致。

### 非强一致性
主从服务器的命令复制是异步进行的，主服务器收到写命令，会发送给从服务器，主服务器执行完以后把结果返回给客户端，但这个时候从服务器可能还没执行，会导致主从服务器间的数据不一致。

## 哨兵模式
监控、提醒、故障转移。监控主从服务器，提供主从故障转移的功能。哨兵节点对其余的Sentinel节点进行监控，发现节点不可达会做下线的标识，如果被标识的是主节点，那么会和其他哨兵节点进行协商投票，当大多数哨兵认为主节点不可达时，会判定下线，并选举一个leader进行故障转移的操作。

## 切片集群模式
当redis缓存数据量大到一台服务器无法缓存时，就会使用redis切片集群，把数据分布到不同的服务器上，降低对单主节点的依赖，提高redis服务的读写性能。

### 方案
哈希槽，一个切片集群共有16384个哈希槽，数据会根据key，按照CRC16算法计算一个16bit的值，然后对16384取模，映射到一个哈希槽。

然后哈希槽映射到具体的redis节点。

方案一：平均分配，哈希槽会平均分布到集群节点上，比如有9个节点，每个节点的哈希槽个数就是16384/9。

方案二：手动分配，手动指定节点上的哈希槽，建立节点间的连接。

### 脑裂
redis主从架构中，主节点提供写操作，从节点提供读操作，如果主节点网络发生问题，与从节点失联，但是和客户端的网络是正常的，客户端继续向这个主节点写数据，但是这些数据没办法同步给从节点。哨兵也发现主节点失联了，认为主节点挂了，然后从从节点中选举一个leader作为主节点，这时集群出现了2个主节点。就是脑裂。然后网络突然好了，哨兵就会把旧主节点降级为从节点，然后这个节点向新主节点请求数据同步，第一次同步是全量同步，先清空自己本地数据，然后做全量同步，所以，旧主节点之前写入的数据就丢失了，也就是集群脑裂数据丢失的问题。

#### 解决方案
主节点连接的从节点个数如果小于一个设定的阈值或者进行主从数据复制时ACK延迟超过设定的阈值时，主库就不再接收客户端的写请求了。

这样新主库上线后，原主库会降为从库，即使数据被清空了，也不会有新数据丢失。



## 一致性hash算法
1. 主要是解决分布式缓存问题，比如分布式redis。
2. 在删除或者添加一个服务器时，能尽可能的减少改变对服务器请求和服务器的映射关系。

假如我们有3台服务器，我们对redis服务器进行访问时，需要把请求分到一台服务器上，可以通过hash，取模运算，%3计算结果映射到对应的服务器。

这样如果我们的服务器不够用了，需要增加服务器数量，那么在对请求重新分配时，取模运算计算的结果都和刚才不一样了，所以访问的缓存位置都要发生变化，那当我们无法在redis获取数据时，就需要向比如mysql数据库取请求数据。同理如果某一台服务器挂掉了。可能导致大量缓存失效，造成缓存雪崩，后端服务器将会承受巨大压力。所以出现了一致性hash算法。

一致性hash也是取模的方法，但是是对2^32取模。可以想象2^32个值按照顺时针的方向组成一个环，称为hash环。服务器使用hash函数取模，映射到hash环上的一个位置。数据访问时根据key计算hash值取模，然后确定在环上的位置，然后按照顺时针的方向，遇到的第一个服务器就是定位到的服务器。

如果哈希环上的服务器几点太少，可能会导致节点分布不均匀产生数据倾斜，很多缓存的对象都集中在某一台服务器上，可能会导致系统的崩溃。解决办法就是引入了虚拟节点。虚拟节点就是一个真实节点会对应到几个虚拟节点，增加哈希环上服务器的数量，尽量让服务器在环上的分布更均匀一些。在定位服务器的时候，根据定位到的服务器，可能是虚拟节点，再通过虚拟节点定位到真实节点。



# ·缓存设计
## 过期删除
### 过期
对某一个key设置过期时间时，redis会把key带上过期时间存储在一个过期字典里。

查询一个key时，先检查key是否在过期字典里，如果不在，正常读取键值，如果在，获取该key的过期时间，然后和当前时间比较，如果小于当前时间就没过期，否则就过期。

### 删除
#### 惰性删除
惰性删除：不会主动删除过期的键，查询某一个键时，如果过期了就删除key。

优点：访问数据时检查key是否过期，所以会占用少的系统资源。

缺点：如果一个key已经过期，但是很久都没有被访问，那么kkey一直存在内存中不被释放，造成内存空间的浪费。

#### 定期删除
流程：

1. 从过期字典中随机抽20个key。
2. 检查是否过期，并删除过期的key。
3. 如果过期数量超过5个，也就是占比大于25%，那么重复步骤一，否则停止。为了防止一直循环的情况，还设定了一个删除循环流程的时间上限，25ms。

优点：既能删除无用的key，同时也有最长执行时间的上限。

缺点：难以确定执行的频率，如果太频繁，对CPU不友好，如果执行的太少，那就和惰性删除一样，某些key不会被及时释放。

### 持久化|过期键
#### RDB
RDB文件生成阶段，会对key进行过期检查，如果过期不会背保存在RDB中。

RDB加载阶段，主服务器，加载RDB文件时，会对键进行检查，过期的不会被载入数据库中。如果是从服务器，不会判断是否过期，在主从服务器进行数据同步时，从服务器数据会被清空。

#### AOF
AOF文件写入阶段，如果某个过期的键没被删除，AOF会保留这个过期的键。当过期的键被删除后，Redis会向AOF文件中追加一条DEL命令删除这个键。

在AOF重写阶段：执行AOF重写时，如果键已过期，不会被保存在重写的AOF文件中。

#### redis主从模式
从库不会主动扫描，从库过期键的处理时依靠主服务器控制，主库key过期，会在AOF文件增加一条指令，同步到从库时，从库执行这条指令删除过期的key。

## 内存淘汰
**不进行数据淘汰**，当运行内存超最大限制，不再提供服务，返回错误。

**进行数据淘汰策略**：

在设置了过期时间的数据中进行淘汰：

1. 随机淘汰设置了过期时间的任意键值。
2. 优先淘汰更早过期的键值。
3. 淘汰设置了过期时间键值中最久未使用的键值。lru。【淘汰最近最少使用的数据】
4. 淘汰设置了过期时间键值中最少使用的兼职。lfu。

在所有数据范围内进行淘汰：

1. 随机淘汰任意键值。
2. 淘汰整个键值中最久未使用的键值。lru。
3. 淘汰整个键值中最少使用的键值。lfu。

LRU：

基于链表结构，最新操作的元素会被移到链表头，那么链表尾就是最久未使用的元素。

缺点：链表带来额外的空间开销。当数据被访问时，把数据移动到头，链表操作会比较耗时，降低redis性能。

LFU：

最近最不常用的。根据访问次数淘汰数据的，思想是：如果数据过去被访问多次，那么将来被访问的频率会更高。所以LFU会记录每个数据的访问次数，当一个数据被再次访问时，就会增加该数据的访问次数。这样就解决了可能某个key被偶尔访问了一次，数据却能留存很长时间的问题。

## 缓存更新
redis在使用过程中需要保证数据的<font style="background-color:#1890FF;">一致性</font>和<font style="background-color:#1890FF;">可用性</font>，所以要做<font style="background-color:#1890FF;">缓存更新</font>的操作，缓存更新可以分为。

### 旁路缓存
1. 读更写删

一般在<font style="background-color:#EFE1FA;">读</font>的时候，如果缓存未命中，则查数据库，然后<font style="background-color:#EFE1FA;">更新</font>缓存。

在<font style="background-color:#EFE1FA;">写</font>数据库的时候，去<font style="background-color:#EFE1FA;">删除</font>缓存。

2. 旁路更新

<font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">（旁路缓存：采用先</font><font style="color:rgb(77,77,77);background-color:#EFE1FA;">更新数据库再删除缓存</font><font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">）</font>

3. <font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">写更</font>

<font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">如果选择在</font><font style="color:rgb(77,77,77);background-color:#EFE1FA;">写数据库</font><font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">的同时</font><font style="color:rgb(77,77,77);background-color:#EFE1FA;">更新缓存</font><font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">。那么无论是先更新数据库再更新缓存，还是先更新缓存再更新数据库，在多线程并发更新的情况下，很容易产生数据库数据和缓存数据不一致的情况。而且在某些更新操作频繁的场景下容易产生更新了几次缓存，而期间没有人查的情况，浪费了资源。</font>

4. <font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">先删除缓存在更新数据库</font>

<font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">如果先</font><font style="color:rgb(77,77,77);background-color:#EFE1FA;">删除缓存</font><font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">，再</font><font style="color:rgb(77,77,77);background-color:#EFE1FA;">更新数据库</font><font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">，可能会发生这样的问题。一个线程负责更新，另一个线程查询，更新的线程先删除了缓存，负责查询的线程发现缓存没有，那么去数据库查询并且把旧数据更新到了缓存中。然后更新数据库的线程更新了数据库。这会导致缓存中的数据库是一个脏数据。</font>

<font style="color:rgb(77,77,77);background-color:rgb(255,255,255);"></font>

<font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">旁路缓存适合读多写少的场景，不适合写多的场景，因为写入较多，缓存中的数据会被频繁的清理，这样会对缓存的命中率有一些影响，两种解决方案。</font>

1. <font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">更新数据时也更新缓存，在更新缓存前先加一个分布式锁，只允许一个线程更新缓存，就不会产生并发问题，但是影响写入性能。</font>
2. <font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">也是更新数据时更新缓存，只是给缓存加一个较短的过期时间，这样即使缓存不一致，缓存的数据页很快过期，对业务影响也是可以接受。</font>

## 一致性缓存问题
### 方案
对于写，一共有四种方案。我选择的方案是先删除缓存再更新DB，再异步的将数据刷新回缓存。

旁路缓存是对并发问题比较友好，但是容灾问题我不知道怎么解决。但是我所说的都有对应的解决并发和容灾问题的方案。对于先更新数据库，再删除缓存的方法，如果说删除缓存失败了，确实是可以通过再异步更新缓存的方式，但是这段时间内用户去访问数据时，拿到的是旧数据，很奇怪，对于用户来说更新数据库是成功的，并不会告诉用户更新失败。而拿到的确实旧数据，对用户来说是很奇怪的一件事。

### 方案一
写：第一步删除缓存，删除之后再更新DB，之后再异步将数据刷回缓存。

读：第一步先读缓存，如果缓存没读到，则去读DB，之后再将数据异步刷回缓存。

对于写流程：【不采用xxx】

1. 如果先更新缓存，再更新数据库。那么如果缓存更新成功，而数据库更新失败，就会导致缓存中的是错误数据，那么数据错误我们是无法忍受的。
2. 如果先更新数据库，再更新缓存。那么如果我们数据库更新成功，缓存更新失败，则会导致缓存中的数据是旧数据。也不合理。
3. 同时对于上述两种情况，如果有2个线程并发更新，拿先更新数据库，再更新缓存为例。A线程要把数据更新为1，B线程要把数据更新为2。下面他们的执行顺序如果是这样的，A先更新数据库为1，然后B线程也更新了数据库为2，然后B线程更新了缓存为2，然后A线程更新缓存为1。导致数据库中的数据是2，而缓存中的数据是1这种缓存和数据的不一致。
4. 异步刷新：无论是redis还是mysql，在操作数据失败的时候都是会报错返回错误信息的，但是业务中缓存只是辅助，对缓存操作失败不应该影响主程序。也就是缓存操作失败了，我们可能try...catch处理一下，还是让程序继续运行。那么对于先删除缓存，再更新数据库，如果第一步缓存删除失败了，而数据库更新成功了，我们可以加一个第三步异步的更新缓存，从而降低第一步失败造成的后果。而如果缓存删除成功了，而数据库更新失败了，那么我们对数据库操作是相当于主要的操作，那么我们就不继续向下执行了，这时的状态是缓存中没有数据，而数据库更新失败，那么用户使用时也不会有缓存和数据库数据不一致的情况，因为缓存中拿不到数据就可以去数据库中拿了。
5. 而如果先更新数据库，再删除缓存，可能会导致如果数据库更新成功了，而缓存更新失败了的情况，导致缓存的是旧数据，数据库是新数据这种情况。

也存在缺点：

1. 容灾：如果删除缓存失败了，继续向下执行，而数据库更新成功了，但是第三步异步刷新缓存也有可能失败，那就会导致redis中的数据始终是旧数据，而数据库是新数据，造成数据不一致。【方案二解决】
2. 并发：【方案三解决】
    1. 写写并发，如果两个线程现在都更新完了数据库，之后进行异步的刷新缓存，而异步操作是无法保证顺序的，所以存在刷新数据不准确的情况。那也会导致缓存和数据库数据不一致。
    2. 读写并发：<font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">一个线程负责更新，另一个线程查询。写的线程先删除了缓存，负责读的线程发现缓存没有，那么去数据库查询，查到了旧数据。之后写线程把新数据写到数据库并且更新了缓存，之后读线程把刚读到的旧数据写到缓存。这会导致缓存中的数据库是一个旧数据，而数据库的数据是新数据。</font>

<font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">方案一总结：</font>

1. <font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">适用场景：并发量、一致性要求都不是很高的情况。</font>
2. <font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">这个方案在容灾方面，如果删除缓存失败了，数据库更新成功了，而异步刷新缓存时也失败了，就会导致缓存中的数据始终是旧数据，数据库是新的，那怎么解决这个问题呢？</font>

### <font style="color:rgb(77,77,77);background-color:rgb(255,255,255);">方案二</font>
为了保证数据最终一致性，我们引入binlog，这样即使第三步刷新失败，也能通过binlog来进行日志回放，然后再刷新缓存。

写流程：先删除缓存，再更新DB，监听从库的binlog，通过binlog解析出需要刷新的数据，然后把数据刷新到redis。但是这种方式和前面说的异步刷新到redis有什么区别吗？这样也有可能刷新不成功啊？如何保证呢？这样刷新如果刷新不成功是可以重试的，重试直到成功。但是之前那种方式，异步刷新如果不成功就不能重试了，因为在这个时间段内，可能有其他线程对数据库进行了修改，重试刷新回去的数据可能是旧数据。但是读取binlog是能够得到最新的数据库数据的，所以可以不断重试直到刷新缓存成功。

读流程：先读缓存，如果缓存没读到，则去读DB，然后异步将数据刷回缓存。

特点：

1. 如果异步刷新失败，可以进行binlog日志回放，重试刷新。
2. 也就是说无论删除缓存是否成功，后续的刷新缓存都是有保障的。

缺点是并发安全没法保障，也是方案一中的并发问题，并发问题其实是读数据库和写缓存的操作不一致造成的，那么下面的方案三可以解决并发问题。

### 方案三
写流程：先删除缓存，删除以后更新DB，监听从库的binlog，通过binlog解析出需要刷新的数据，然后把数据写入MQ，接下来消费者消费MQ把数据刷新到缓存。

读流程：先读缓存，如果没读到，就去读DB，然后异步的把数据写入MQ，消费者消费MQ获取数据写入缓存。

容灾分析：

写：如果删除缓存失败，那么由MQ保证缓存数据刷新。如果写入MQ失败，由重试获取binlog数据保证成功。如果消费MQ失败，重新消费即可。

读：如果异步写MQ失败，没关系，缓存是空的，其他来的读数据库就行。

并发分析：

这个方案通过MQ的介入，让读数据库+刷新缓存的操作串行化，这样就不存在读和刷新缓存顺序不一致导致的并发问题进而导致数据库和缓存数据不一致的情况了。





## 缓存穿透、雪崩、击穿
![](https://cdn.nlark.com/yuque/0/2023/png/22839467/1672576549582-67c81a8c-a816-4358-9dda-08584c9833d7.png)

![](https://cdn.nlark.com/yuque/0/2023/png/22839467/1672576701844-8666de64-1747-4517-a3db-9e371b31bebe.png)

<font style="background-color:#1890FF;">而在查询时可能会产生一些缓存穿透、缓存雪崩、缓存击穿的问题。（查）</font>

### 缓存穿透
访问的数据在缓存和数据中都不存在，请求直达数据库。

解决：缓存空对象-->额外内存消耗(设置ttl)，短期数据不一致(ttl短)

布隆过滤(bitmap实现)：先找布隆过滤，看看要查的数据存不存在，存在->redis->数据库



### 缓存雪崩
我们为了保证数据库和缓存中数据一致性，会为redis的key设置过期时间，如果过期时间相同，可能会导致大量key同时失效，或者redis服务器宕机，大量请求直达数据库。

【我第一个项目中验证码的存储设置了60秒的过期时间。登录设置一个30分钟的key过期时间，在每次拦截时除了要获取用户的信息，还刷新这个key的生存时间，那么效果就是如果30分钟都没有访问这个网站，那么下次访问的时候就需要重新登录了，如果在30分钟内访问了网站，会保证不掉线。】

#### 解决
1. 给不同key添加ttl随机值，那么缓存失效时间就不同了。
2. Redis集群（哨兵）
3. 多级缓存
4. 缓存业务添加降级限流策略

令牌桶算法：限流。

1. 请求在处理之前会拿到一个令牌。
2. 根据限流的大小，按照一定的速率往桶里添加令牌。
3. 桶设置最大令牌数，超过了就不允许新添加令牌。
4. 只有拿到令牌的请求才能处理业务逻辑。

### 缓存击穿
<font style="background-color:#EFE1FA;">高并发</font>访问并且<font style="background-color:#EFE1FA;">缓存重建业务复杂</font>的key失效了，大量请求在瞬间给数据库带来大量冲击。（可能是这种场景：线程1访问缓存未命中，会进行缓存重建，缓存还没有重建完，期间线程2访问也未命中，也会重建...，如果两个线程并发访问可能会产生问题）

#### 解决
1. yzx使用互斥锁，分布式环境下采用分布式锁，使用setnx设置一个状态位，表示是一种锁定状态，同一时间只有一个业务线程请求，其他线程需要等待，过程：（重试{未命中，加锁}）能够保证一致性，可能会产生死锁。
2. kyx逻辑过期：不设置ttl。不保证一致性。如果一个线程查询到数据发现过期了，那么尝试获取锁，如果获取到锁了，那么新开一个线程去做缓存重建的工作，然后把逻辑过期的旧数据返回。这样另外一个线程在缓存重建未成功时进去了，也发现过期了，那么他也尝试获取锁，不过没获取到，那么它就知道有其他线程在做缓存重建的工作，那么它也是直接把旧数据返回。它不能保证数据的一致性，但是能保证可用性。

#### 分布式锁
##### <font style="color:rgb(77, 77, 77);">场景</font>
<font style="color:rgb(77, 77, 77);background-color:#EFE1FA;">乐观锁：</font><font style="color:rgb(77, 77, 77);">在实际应用场景中，例如秒杀的超卖问题，执行的是查询库存并更新库存（库存-1），这两个操作需要是原子性的，否则多线程并发执行会产生超卖问题，解决方式乐观锁，sql语句更新的同时可以判断库存的数量。</font>

<font style="color:rgb(77, 77, 77);background-color:#EFE1FA;">分布式锁</font><font style="color:rgb(77, 77, 77);">就是在分布式部署环境下多进程可见并互斥的锁。</font>

<font style="color:rgb(77, 77, 77);">比如一人一单的问题，首先需要查询这个人关于这个商品的订单数量，如果订单数量为0则可以添加一个订单。那么这两个操作也是需要原子性的，可以使用setnx的方式获取锁。</font>

##### <font style="color:rgb(77, 77, 77);">加锁方式</font>
<font style="color:rgb(77, 77, 77);">set nx，如果key不存在，那么加锁成功，否则加锁失败。lock_key和不同的使用场景需要有关系，对于1人1单问题，key是和用户有关的。还需要一个unique_value参数区分不同的客户端。同时最好设置一个过期时间防止某些原因造成一个线程获得锁后没有释放锁，其他线程一直没法获得锁的情况。还有redisson的分布式锁，它是基于hash实现的，hash的key分别是，线程id，value：锁重入的次数。他是支持可重入锁的。</font>

<font style="color:rgb(77, 77, 77);">分布式加锁是不可以使用synchronized的，因为分布式集群部署的环境下，不同的服务器是不共享堆栈内存的，如果用synchronized那么访问不同服务器获取到的锁是不同的。</font>

##### <font style="color:rgb(77, 77, 77);">解锁</font>
解锁时要判断unique_value是否是当前的客户端，如果是，才能删除，所以需要Lua脚本来保证解锁的原子性。

```lua
// 释放锁时，先比较 unique_value 是否相等，避免锁的误释放
if redis.call("get",KEYS[1]) == ARGV[1] then
  return redis.call("del",KEYS[1])
else
  return 0
end
```

<font style="color:rgb(77, 77, 77);"></font>

```java
@Component
public class RedisClient {
    private StringRedisTemplate stringRedisTemplate;

    public RedisClient(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    // 存redis带过期时间
    public <ID, R> void cunWithGqtime(String keypreix, ID id, R r, Long time, TimeUnit unit) {
        String key = keypreix + id;
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(r), time, unit);
    }

    // 存redis逻辑过期时间
    public <ID, R> void cunWithLjtime(String keypreix, ID id, R r, Long time, TimeUnit unit) {
        String key = keypreix + id;
        RedisData redisData = new RedisData();
        redisData.setData(r);
        redisData.setExpireTime(LocalDateTime.now().plusSeconds(unit.toSeconds(time)));
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(redisData));
    }

    // 缓存穿透
    public <R, ID> R huancunchuantou(
            String keypreix, ID id, Class<R> rClass, Function<ID, R> function, Long time, TimeUnit timeUnit) {
        // 从redis获取商铺信息
        String r = stringRedisTemplate.opsForValue().get(keypreix + id);

        // 如果不为空返回
        if (StrUtil.isNotBlank(r)) {
            return JSONUtil.toBean(r, rClass);
        }
        if (r != null) {
            // 如果从缓存中获取到了""值，代表访问到了空缓存，不访问数据库.
            return null;
        }
        // 如果为null从数据库中查询
        R r1 = function.apply(id);
        if (r1 == null) {
            // redis缓存空值,避免缓存穿透
            stringRedisTemplate.opsForValue().set(keypreix+id, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
            return null;
        }
        // 存入redis
        cunWithGqtime(keypreix, id, r1, time, timeUnit);
        return r1;
    }


    private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10);

    public  <ID, R> R huancunjichuanluojiguoqi(
            String keypreix, ID id, Class<R> type, Function<ID, R> function, Long time, TimeUnit timeUnit) {
        // 从redis获取商铺信息
        String rstring = stringRedisTemplate.opsForValue().get(keypreix + id);

        // 如果为空返回空
        if (StrUtil.isBlank(rstring)) {
            // 因为热点数据默认缓存里都有，如果没有说明数据库里应该也没有
            return null;
        }
        // 如果不为空，判断expiretime是否过期
        RedisData redisData = JSONUtil.toBean(rstring, RedisData.class);
        JSONObject data = (JSONObject) redisData.getData();
        R r1 = JSONUtil.toBean(data, type);
        LocalDateTime expireTime = redisData.getExpireTime();
        if (expireTime.isAfter(LocalDateTime.now())) {
            // 如果没过期直接返回
            return r1;
        }
        // 如果过期了,看是否能获取锁
        boolean b1 = tryLock(LOCK_SHOP_KEY+id);
        // 如果获取不到锁,把旧的返回
        if (b1) {
            // 如果能获取锁,开一个线程去重建redis
            CACHE_REBUILD_EXECUTOR.submit(() -> {
                try {
                    R r2 = function.apply(id);
                    cunWithLjtime(keypreix, id, r2, time, timeUnit);
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    unLock(LOCK_SHOP_KEY+id);
                }
            });
        }
        // 重建还是没获取到锁都返回旧的值
        return r1;
    }

    private boolean tryLock(String key) {
        Boolean aBoolean = stringRedisTemplate.opsForValue().setIfAbsent(key, "1", LOCK_SHOP_TTL, TimeUnit.SECONDS);
        return BooleanUtil.isTrue(aBoolean);
    }
    private void unLock(String key) {
        stringRedisTemplate.delete(key);
    }

}
```

##### 全局唯一id
UUID

数据库自增id

雪花算法：64位，最高位代表正负，41位时间戳，10位计算机id，12位id序列号。

百度uidgenerator

美团leaf

```java
// 全局唯一id
private static final Long BEGIN_TIMESTAMP = 1640995200L;
/**
 * 获取全局自增id
 * keyPreix: 不同的业务选择不同的key前缀
 */
public long getIncId(String keyPreix) {
    // 时间戳
    LocalDateTime now = LocalDateTime.now();
    long nowSecond = now.toEpochSecond(ZoneOffset.UTC);
    long timeStamp = nowSecond - BEGIN_TIMESTAMP;

    // 根据key和日期的一个redis自增数字
    String yyyyMMdd = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    long num = stringRedisTemplate.opsForValue().increment("inc:"+keyPreix+":"+yyyyMMdd);
    return timeStamp << 32 | num;
}
```

<font style="color:rgb(77, 77, 77);"></font>

# redis实战
## redis实现延迟队列
延迟队列就是把当前要做的事情，往后推迟一段时间再做。

### 场景
1. 购物平台下单，超过一定时间未付款，订单会自动取消。
2. 打车的时候规定时间没有车主接单，平台会取消订单并提示暂时没有车主接单。
3. 点外卖的时候如果5分钟不接单，就自动取消订单。

### 实现
使用zset有序集合的方式实现延迟消息队列，zset的score存储延迟执行的时间。

使用zadd score1 value1命令往内存中生产消息，然后利用zrangebyscore找到符合条件的待处理任务。



## redis大key如何处理
一般来说如果String类型的值大于10KB，或者hash、list、set、zset的元素个数超过5000个就是大key。

### 获取大key
1. 可以通过redis-cli --bigkeys命令查找大key，最好在从接单执行。
2. 使用scan命令对数据库扫描，然后用TYPE命令获取返回每一个key的类型。对String类型，用STRLEN命令获取字符串长度。对于集合类，可以从业务层获取平均元素大小。获取集合长度List:LLEN,Hash:HLEN,Set:SCARD,SortedSet:ZCARD。然后用集合长度乘以元素大小获取集合占用的内存。如果不能知道每个元素大小，可以使用MEMORY USAGE命令，查询一个键值对占用的内存空间。

### 删除大key
删除本质就是释放键值对占用的内存。释放内存是把空闲内存插入一个空闲内存的链表，方便后续的管理和再分配。这个过程本身需要时间，而且操作链表也耗费时间。所以一下子释放大量的内存，可能会造成redis主线程阻塞，导致其他请求的超时，超时越来越多，造成redis连接耗尽，产生各种异常。

我们采用分批次删除的方式。

1. 对于hash，使用hscan扫描法。
2. 对于set，采用srandmember每次随机取数据删除。
3. 对于zset，使用zremrangebyrank命令直接删除。
4. 对于list，直接pop。

也可以采用一步删除，用unlink命令放入一个异步线程进行删除不会阻塞主线程。

## redis管道有什么用？
管道是客户端提供的一种批处理技术，用于一次处理多个redis命令，从而提高整个交互的性能。普通的模式是客户端发送一个命令，redis处理结果返回客户端，客户端再发送一个命令，redis返回结果。管道模式是客户端发送多个命令，然后redis处理命令并返回多个结果给客户端。提高整个系统的交互能力，减少网络等待的时间。

## redis事务支持回滚吗
mysql是支持回滚的，当事务执行发生错误的时候，事务中的操作会回滚到事务执行前的状态。

redis中并没有提供回滚机制，discard命令是主动放弃事务的执行，把暂存的命令队列清空，但不会回滚。

不支持回滚的原因：因为事务执行时，一般错误是编程错误造成的，在生产环境中很少出现，所以没有必要开发事务回滚功能。第二就是事务回滚复杂和redis追求的简单高效设计主旨不符合。

## 如何实现分布式锁？












