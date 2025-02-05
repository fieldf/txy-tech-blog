---
title: MYSQL
date: 2023-02-12
index: false
icon: laptop-code
category:
  - MYSQL
tag:
  - 索引
  - 事务
  - mysql日志
  - mysql锁
---

# 基础
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1667314175631-0ca0a803-49a4-4380-9fd9-96727c4aad59.png)

## myisam和innodb
myisam：

1. myisam不支持行锁，读取数据只能加表锁。写入时加排他锁。
2. 不支持事务。
3. 不支持外键。
4. 适合select密集型表。

innodb：

1. 支持行锁，采用mvcc支持高并发。
2. 支持事务。
3. 支持外键。
4. 适合insert和updata密集型的表。



## 参数
1. max_user_connection: 最大连接数。
2. wait_timeout: 数据库连接闲置时间。

# ·索引
索引相当于目录，能够通过索引快速获取相关的数据，空间换时间。索引和数据位于存储引擎层。

## 索引分类
### 按数据结构分
1. b+树索引
2. hash索引(Innodb不支持hash索引，但是有一个自适应hash索引)，mysql没有显式的支持hash索引，作为内部的一种优化。怎么优化？就是二级索引被频繁访问，就会建立hash索引。某些热点数据会自动生成hash索引。

### 按字段特征分类
1. 主键索引、primary key
2. 唯一索引、unique
3. 普通索引、index
4. 全文索引、fulltext
5. 前缀索引、index(column_name(length))

#### 前缀索引
index(column_name(length))

对字符类型的字段前几个字符建立索引，而不是在整个字段建立索引，例如char、varchar、binary、varbinary列。

作用是减少索引占用的存储空间，提升查询效率。

### 按物理存储分类
1. 聚集索引（主键索引->unique索引->rowid）
2. 二级索引（非聚集索引）[要回表]

聚簇结构：索引的关键字和记录是存放在一起的。仅Innodb的主键索引为聚簇结构。其他的索引包括Innodb的非主键索引都是典型的BTree结构。

#### 回表和索引覆盖
二级索引叶子结点存放的是主键值。查询时，如果查询的数据能够在二级索引查询得到，就不需要回表，这个过程就是索引覆盖。如果查询的数据不在二级索引，会先检索二级索引，找到叶子结点获取主键值，再检索主键索引，就能查询到数据了，这个过程就是回表。

### 按字段个数来分
1. 单列索引、联合索引

#### 联合索引
alter table table_name add index index_name(prodect_no, name);

最左匹配原则：按照最左优先的方式进行索引匹配。如创建了(a,b,c)联合索引，如果查询条件是一下几种，可以匹配。

+ where a=1;
+ where a=1 and b=2 and c=3;
+ where a=1 and b=2;

先按a排序，a相同的情况下按b排序，b相同的情况再按c排序。所以b和c是全局无序，局部相对有序。所以在没有遵循最左匹配原则的情况下，是无法利用索引的，因为利用索引的前提是key是有序的。

##### 索引下推（using index condition）
select * from table where a>1 and b=2

如果where a>1 and b=2，a是可以用到联合索引的，b用不到，因为a>1时，b值不是有序的，所以b用不上联合索引。除了a>1，在<,between,like等也会导致后面的列用不到索引。

那么在mysql5.6之前，对于满足a>1条件的记录，需要一个一个的回表查看是否满足下面的条件b=2。

在mysql5.6引入了索引下推，也就是在联合索引遍历时，会对联合索引中的字段先做判断，直接过滤掉不满足条件的也就是b！=2的记录，从而减少回表次数。

因为后面的很可能索引失效，如果索引失效需要根据前面满足条件的，然后再去找后面满足条件的，如果前面的数据多，那么查找效率会低。所以一般把区分度高的索引列放到前面。区分度=distinct(col)/count(*)

#### 联合索引实例↑
select * from order where status=1 order by create_time asc

可以给status和create_time建立联合索引，这样当status满足条件时，create_time就是有序的了。

如果只给status建立索引，那么还需要对create_time排序，这时就要用到文件排序filesort，extra列。

## mysql的b+树和b树的区别
B+树：B+树叶子结点存储数据，非叶子节点存储指针，非叶子节点数据冗余了一份在叶子结点。B+树叶子结点用<font style="background-color:#FADB14;">双向链表</font>进行连接。

B树：b树非叶子结点会存储数据。

1. b+树通过索引能够定位到在哪个或者哪些叶子结点，b树查数据时节点内数据时存储在磁盘中的，每次和叶子结点内数据比对看是不是自己需要的数据时都需要进行一次磁盘io。
2. b+树非叶子节点存储的是指针，指针占据存储空间很小，也就是每一页可以存很多指针，b+树的树高就相对比较<font style="background-color:#FADB14;">矮</font>，不需要进行那么多次磁盘io。
3. 而且<font style="background-color:#FADB14;">范围查询b树需要对树进行中序遍历，b+树直接在叶子结点链表遍历即可。</font>

## mysql数据库页
Mysql数据存储在磁盘，用页来存储，一页存多条数据的，这样避免了每查一行数据就进行一次磁盘io，是一下子能查出一页数据，减少磁盘io的次数。<font style="background-color:#FADB14;">页内数据通过链表</font>连接，每个页有一个<font style="background-color:#FADB14;">页目录</font>，一页数据分成多个<font style="background-color:#FADB14;">组</font>，通过页目录可以定位到对应的组。再在对应的组里找到想要查的数据。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1650684070725-98041b14-35ea-4364-ada2-daa1d80b2f2e.png)



存多少数据？

1页16k，一个索引大概也就几B，算成10B。一页大概存1000多个索引。

数据比索引大一些，叶子结点1页存储数据大概有几百条。

如果3层，1000*1000*几百条，能存上亿条数据。



## 建立索引的原则
建立：

1. 经常作为<font style="background-color:#FADB14;">查询条件</font>的where字段建立索引，可以提高查询速度。
    1. where条件尽量避免对null值判断，可能会导致<font style="background-color:#1890FF;">索引失效</font>->全表扫描。
    2. 可以用0代表null。
2. 为经常需要order by，group by（）的字段建立索引。
    1. 这些字段需要排序操作，会浪费时间。建立索引，可以避免排序。
3. 选择<font style="background-color:#FADB14;">唯一</font>性索引
    1. 因为值是唯一的有助于快速定位数据。给学号字段建立唯一索引，比给姓名建立索引强。
4. 字段值如果很稀少不适合做索引，比如性别。
    1. count(distinct col)/count(*)，越接近1越好。如果值为0.1，代表找一条数据需要扫描10条。
    2. 比如性别没有很多个值没必要建索引。

联合：

1. 查询条件数据列较多，考虑建立联合索引。
    1. 查询时不使用select * from t.用具体的字段代替。
2. 最左前缀匹配原则
    1. 从左向右匹配直到遇到范围查询(>,<,between,like)时会停止匹配。
    2. 比如a="1"and b="2" and c>"3" and d=4，建立(a,b,c,d)，d是用不到索引的。如果建立(a,b,d,c)的索引则都可以用到。abd顺序可调。优化器

前缀：

1. 选择字段长度小的做索引，如果长，查询速度受影响。
    1. 例如CHAR(100)检索的时间肯定比CHAR(10)时间更少。
    2. 或者长字段考虑建立前缀索引。

注意：

1. 索引不是越多越好
    1. 存储索引占用磁盘空间，索引越多磁盘空间越大。
    2. 修改表时，对索引的更新都很麻烦。索引越多，更新表越慢。
    3. 一个表的索引最好不要超过6个。
2. 索引不用就删了。
3. 查询时用<font style="background-color:#FADB14;">>=不用＞。</font>
    1. select * from emp where deptno>=4,而不用select * from emp where deptno>3
    2. 大于等于直接跳到位置，大于先定位到数字再扫描第一个比它大的记录。

查询原则：

1. sql尽可能简单。可以减少锁时间。
2. or改成in。or是O(n)，in是O(logn)。

## 索引失效
1. 尽量避免where条件判断null，或者使用<font style="background-color:#FADB14;">!=</font>，可能导致引擎使用全表扫描。
2. 尽量避免在where子句中使用<font style="background-color:#FADB14;">or来连接条件</font>，否则导致引擎放弃使用索引而进行全表扫描。如：select id from t where num=10 or num=20可以select id from t where num=10 union all select id from t where num=20;
3. <font style="background-color:#FADB14;">模糊匹配</font>可能会索引失效select id from t where name like '%三'模糊匹配
4. where条件字段使用<font style="background-color:#FADB14;">函数或者表达式</font>。
    1. 表达式select id from t where num/2=100;
    2. select id from t where substring(name,1,3)='abc', like 'abc%'；
    3. 比如from_unixtime(create_time)='2014-05-29'就不能使用到索引。
        1. 索引是存的是字段值。
        2. 如果用函数，检索时每个数据的字段值都得用函数才能比较。所以改成create_time=from_unixtime('2014-05-29');
8. 用between不用in和not in要慎用，否则会导致全表扫描。select id from t where num in(1,2,3)，尤其对于连续的数值，能用between就不要用in了，select id from t where num between 1 and 3;

# ·性能优化
由于系统的吞吐量瓶颈往往出现在数据库的<font style="background-color:#FADB14;">访问速度</font>上；而且随着应用程序的运行，数据库中的数据会越来越多，处理时间会相应变慢；数据是存放在磁盘上的，读写速度无法和内存相比。因此需要进行性能优化。

## 设计数据库
### <font style="color:rgb(255,0,0);">字段设计</font>
需要遵循：

1. 尽量用tinyint，smallint，medium_int做整形，而非int。如果非负用unsigned。
2. 尽量用<font style="background-color:#FADB14;">定长</font>，比如varchar长度只分配需要的空间。因为非定长的空间会随着数据的增大而增大。
3. 避免用null设置字段，占用额外的索引空间，而且很难进行查询优化。
4. 尽量用timestamp而不是datetime。
5. 某些情况下如果能用<font style="background-color:#FADB14;">整形</font>就用整形表示字符串。

### <font style="color:rgb(255,0,0);">表的设计</font>：范式
第一范式：字段<font style="background-color:#FADB14;">原子性</font>不可分割。一个字段不能以逗号分割，存多个值。（关系型数据库，默认满足第一范式）。

第二范式：消除字段对主键的部分依赖。新增一个独立字段作为主键。第二范式是<font style="background-color:#FADB14;">字段和主键是直接相关</font>的，员工，部门，部门领导。指表描述一件事情。

第三范式：消除字段对主键的传递依赖。<font style="background-color:#FADB14;">非主键外字段之间互不依赖</font>，员工，部门id， 部门名称，部门。。。数据冗余。能够避免冗余。

### <font style="color:rgb(255,0,0);">索引</font>
关键字<font style="background-color:#FADB14;">（字段）与数据的映射关系</font>称为索引。（包含关键字和对应的记录在磁盘中的地址）。关键字是从数据当中提取的用于标识、检索数据的特定内容。

索引检索为什么快？关键字相对于数据本身，数据量小。关键字是有序的，二分查找可快速确定位置。

在where、order by、join字段上建立索引。基于业务逻辑优化、组合索引：如果条件经常性出现在一起，那么可以考虑将多字段索引升级为复合索引。如果通过增加个别字段的索引，就可以出现索引覆盖，那么可以考虑为该字段建立索引。查询时，不常用到的索引，应该删除掉。

## <font style="color:rgb(255,0,0);">缓存</font>
配置文件中开启缓存：Windows上使my.ini，linux上是my.cnf。mysqld段中配置<font style="background-color:#FADB14;">query_cache_type</font>: 0不开启，1开启默认缓存所有，需要在sql语句中增加select sql-no-cache提示来放弃缓存，<font style="background-color:#FADB14;">2：开启</font>，默认都不缓存，需要在sql语句中增加<font style="background-color:#FADB14;">select sql-cache</font>来主动缓存（常用）

将查询结果缓存：

select sql_cache * from user;

重置缓存

reset query cache;

<font style="background-color:#FADB14;">不建议使用</font>查询缓存，因为对一个表更新，这个表上所有的查询缓存都会被清空。静态表才适合使用查询缓存。Mysql8.0版本将查询缓存的整块功能彻底删掉了。

## <font style="color:#E8323C;">慢查询日志</font>
记录查询时间超过某阈值(long_query_time)的sql语句的日志。

配置：/etc/my.cnf，查看日志位置：<font style="background-color:#FADB14;">/var/lib/mysql/localhost-slow.log</font>

开关: show variable like ‘slow_query_log’;



## <font style="color:rgb(255,0,0);">分区</font>
一般情况下我们创建的表对应一组存储文件，使用myisam存储引擎时是一个.myi和.myd文件。使用Innodb存储引擎时是一个.ibd和.frm（表结构）的文件。

当数据量较大（千万条记录级别以上），mysql性能下降，这时我们需要将数据分散到多组存储文件，保证单个文件的执行效率。

最常见分区方案：<font style="background-color:#FADB14;">id分区</font>，将id的哈希值对10取模将数据均匀分散到<font style="background-color:#FADB14;">10个.ibd存储文件</font>中。Create table article (id int auto_increment primary key)partition by hash(id) partitions 10



<font style="background-color:#E4F7D2;">mysql提供的</font>分区算法：

分区依据的字段必须是<font style="background-color:#FADB14;">主键的一部分</font>，分区是为了<font style="background-color:#FADB14;">快速定位</font>数据。

Hash(field): 相同的输入得到相同的输出。仅适用于整型字段。

Key(field):和上面的性质一样。只不过key是处理字符串的，比hash多了一步从字符串中计算出一个整形再做取模操作。

Range算法，条件分区算法，按照数据大小范围分区。将数据使用某种<font style="background-color:#FADB14;">条件</font>，分散到不同的分区中。比如文章的发布时间8月、9月、10月分区存放。



## <font style="color:#E8323C;">分库分表</font>
### 为什么要分库分表？
1. 数据存储在磁盘中的。
    1. 我们的硬件存储数据比较有压力的。
    2. 表中数据量较大时，查询/对数据的操作效率会比较低。
2. 索引的操作，索引是存储在内存中的。
    1. 数据较多可能意味着索引较大，可能导致内存没办法存储这么多数据。

### 分表
如果单表的数据量很大，就可以考虑分表，几千万？分表可以分为垂直分表和水平分表。

垂直分表：

1. 把一个表中的字段分到不同的表中。
2. 根据业务需要，把一个表中不常使用的或者是长度比较长的分到一个表。
3. 在数据库设计之初就应该考虑到，避免后续数据量很大时再做这种操作。

水平分表：

1. 把一个表中的数据按照一些规则分到多个表中。
2. 方式可以选择取模，比如按照某一个字段比如id，id对表的数量取模，得到余数代表存到对应的表中。
    1. 优点就是比较均匀，但是想要扩展会比较麻烦。
    2. 比如原先分成两个表，后来数据多了想要分成3个表，那数据的位置都会变。
3. 除了取模还可以按照时间来分，比如哪些时间段的分到哪张表，这种操作。
    1. 好处就是操作简单，缺点就是数据分布不会特别均匀。

### 分库
1. 分库就是把数据库分成多个数据库。
2. 可以按照业务来分库。
    1. 根据这些表的功能来分，分出不同的业务数据库。
    2. 比如订单数据库、评论数据库等等。

常用的组件：Mycat/ShardingSphere

执行流程：sql解析，查询优化，sql路由，sql改写，sql执行，结果归并



## <font style="background-color:rgb(0,255,0);">集群</font>
<font style="background-color:rgb(0,255,0);">（读写分离、主从复制、负载均衡、高可用）</font>

横向扩展：从根本上提升数据库性能，由此而生的相关技术：读写分离、负载均衡。

### <font style="color:rgb(255,0,0);">主从复制</font>
1. 配置主从节点，master，slave。
2. 从库读，主库写。

主从同步：

1. 主服务器<font style="background-color:#FCFCCA;">提交事务之后</font>，它的修改ddl、dml会保存在<font style="background-color:#FCFCCA;">Bin log日志中</font>。
2. 主库的二进制日志传到从库中，然后<font style="background-color:#FCFCCA;">从库</font>对这些日志<font style="background-color:#FCFCCA;">重新执行</font>。
3. 具体：
    1. <font style="background-color:#FCFCCA;">从服务器</font>上启动一个<font style="background-color:#FCFCCA;">I/O thread</font>。它向主服务器请求读取binlog日志，
    2. 然后把读取到的二进制日志写到本地的一个<font style="background-color:#FCFCCA;">Realy log中继日志</font>里面。
    3. 从服务器上面开启一个<font style="background-color:#FCFCCA;">sql thread</font>定时检查realy log，如果发现有更改立即把<font style="background-color:#FCFCCA;">更改的内容</font>在本机上<font style="background-color:#FCFCCA;">执行一遍。</font>

一主多从

1. 主库既要负责写又要负责为几个从库提供二进制日志。
2. 可以把二进制日志只给某一从。
3. 从库同时也可以作为其他从服务器的主库，把二进制日志发给其他从。
4. 这样的架构性能会好很多，数据之间的延迟也会稍微好一些。

好处

1. 实现<font style="background-color:#FCFCCA;">读写分离</font>，降低主库的访问压力（增删改主库，查询从库）
2. 可以在<font style="background-color:#FCFCCA;">从库中执行备份</font>，以避免备份期间影响主库业务。
3. <font style="background-color:#FCFCCA;">主库出现问题</font>，可以快速<font style="background-color:#FCFCCA;">切换到从库</font>提供服务



![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1650705122557-4a061f6e-1994-4823-b74e-e332f0a0d7ee.png)

### <font style="color:#E8323C;">读写分离</font>
1. 基于主从复制
2. 写：<font style="background-color:#FCFCCA;">连主库</font>，读：<font style="background-color:#FCFCCA;">连从库</font>。程序员控制，麻烦。
3. 把数据库的读和写操作分开，以应对不同的数据库服务器。
4. 主数据库提供写操作，从数据库提供读操作，这样能有效的减轻单台数据库的压力。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1650706448534-8053e3df-677b-4727-b7a2-f7bcfb360d30.png)

方案一：定义两种连接，就像我们在jdbc时定义的database一样，我们可以抽取出ReadDataBase，WriteDataBase implements DataBase，但是这种方式无法利用优秀的线程技术如DruidDataDource帮我们管理连接，也无法利用spring AOP让连接对DAO层透明。

方案二、使用Spring AOP。如果能够使用spring AOP解决数据源切换的问题，那么就可以和mybatis、druid整合到一起了。读数据源对应连接master而写数据源对应连接slave，那么就可以做到读写分离了。

### <font style="color:rgb(255,0,0);">负载均衡</font>
负载均衡算法：

1. 轮询：按用户请求进入的时间顺序依次将请求分配给各个服务器。
2. 加权轮询：按照处理能力来加权。
3. 负载分配：依据服务器的空闲状态来分配用户请求。
    1. 每个节点的内存使用率，CPU利用率。
    2. 选出最闲的那个，效率太低。

### <font style="color:rgb(255,0,0);">高可用</font>
在服务器架构时，为了保证服务器7*24不宕机在线状态，需要为每台单点服务器（由一台服务器提供的服务器，如写服务器、数据库中间件）提供冗余机。

对于写服务器来说，需要提供一台同样的写-冗余服务器，当写服务器健康时（写-冗余通过心跳检测），写-冗余作为一个从机的角色复制写服务器的内容与其做一个同步；当写服务器宕机时，写-冗余服务器便顶上来作为写服务器继续提供服务。对外界来说这个处理过程是透明的。即外界仅通过一个IP访问服务。

# ·事务
## 事务的四大特性
A原子性：事务是原子的，要么全部执行，要么全部不执行。原子性由undolog保证。也叫做回滚日志。用于记录数据被修改前的信息。可以提供回滚也可以用于MVCC。它不同于redolog，undolog是一种<font style="background-color:#FADB14;">逻辑日志</font>。可以认为当删除一条记录的时候，undolog记录一条新增记录，当更新一条记录的时候，它记录一条相反的更新操作。undolog在<font style="background-color:#FFFB8F;">事务执行时产生</font>，事务<font style="background-color:#FFFB8F;">提交时不会立即删除</font>，会用于MVCC。

C一致性：事务执行前后数据是一致的。是由原子性隔离性持久性一起保证的。

I隔离性：事务之间是相互隔离的。数据库有不同的隔离级别，会产生不同的并发问题。隔离性是锁和MVCC保证的。

D持久性：事务一旦<font style="background-color:#FFFB8F;">提交或回滚</font>，都会持久化到磁盘中。持久性是由redolog保证的，也叫重做日志，记录的是事务提交时数据页的物理修改，用来实现事务的持久性。该日志文件由两部分组成：重做日志<font style="background-color:#FFFB8F;">buffer</font>（redolog buffer）在内存中。和重做日志<font style="background-color:#FFFB8F;">文件</font>（redolog file）在磁盘中，当事务提交之后会把所有修改信息都存在日志文件中，用于在<font style="background-color:#FFFB8F;">刷新脏页到磁盘</font>发生错误时，<font style="background-color:#FFFB8F;">恢复数据</font>使用。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1654697927568-bd0e0def-e486-4f7a-b937-b93d58682265.png)



## 并发事务问题
### 脏读
一个事务读取到另一个事务未提交的数据。

### 不可重复读
一个事务2次读取到的数据不一致。

在一个事务提交前读一次，提交后读一次，读到的不一样。

### 幻读
2次数据总数变了。一个事务查询数据得到n条，另一个事务可能增加或者删除了几条数据，这样当第一个事务再进行查询时得到的数据发生了变化。

innodb在可重复读隔离级别就能防止幻读，原因是next-key lock，对间隙也会加锁，所以并发插入的时候会被阻塞，防止幻读。

## 隔离级别
### 读未提交
1. 限制两个数据不能同时修改。
2. 修改数据时，事务未提交，其他事务是可以读的。（脏读，不可重复读，幻读）
3. 锁
    1. 读不加锁。写加排他锁，事务提交释放锁。
    2. 一个事务写操作还没提交事务，其他事务能够读取到未提交的数据。但是其他事务也去写，会阻塞。说明读未提交在写的时候会加锁，而且在事务提交的时候释放锁。

### 读已提交
1. 当前事务只能读取到其他事务提交的数据。
2. 解决了脏读。（不可重复读，幻读）
3. 锁和读mvcc
    1. 读不加锁，写加行锁，事务提交释放锁。
    2. 其他事务读的时候利用MVCC读取到其他事务已提交的数据。
    3. 每次读操作都更新一遍readview，所以可能导致两次读的数据不一致。

### 可重复读
1. 限制读取数据时不能进行修改。
2. 所以解决了重复读的问题。
3. 但是读取数据时可以插入数据，所以会（幻读）。
4. 锁
    1. <font style="color:rgb(51, 51, 51);">读不加锁，写加next-key lock，解决幻读。</font>
    2. <font style="color:rgb(51, 51, 51);">其他事务读取事务创建时的readview，所以不会发生不可重复读。</font>
5. 读MVCC
    1. <font style="background-color:#FADB14;">可重复读</font>隔离级别下是快照读。
    2. 创建事务的时候创建一个readview快照。
    3. 事务执行期间都是用这一个快照，不会看到其他事务插入的数据的，所以不会发生幻读。
    4. 在当前读中，mysql通过next-key避免幻读。
        1. 当前读就是读取最新数据。
        2. select...lock in share mode, select... for update
        3. 或者增删改都进行当前读。
        4. 类似volatile，也就是读取最新值。

### 串行化
1. 所有事务是串行执行的。
2. <font style="color:rgb(51, 51, 51);">读表加读锁，写表加写锁，让事务的操作串行执行。</font>
3. 事务执行很耗性能。



1. <font style="background-color:#FADB14;">可重复读</font>隔离级别下是快照读。
2. 创建事务的时候创建一个readview快照。
3. 事务执行期间都是用这一个快照，不会看到其他事务插入的数据的，所以不会发生幻读。因此<font style="background-color:#FADB14;">幻读</font>只在当前读中发生（当前读就是读取最新数据，加锁的select...lock in share mode, select... for update，或者增删改都进行当前读，类似volatile），也就是读取最新值。

## <font style="color:rgb(77, 77, 77);">MVCC</font>
m_ids:创建视图时当前数据库中活跃且未提交的事务的事务id列表。

creator_trx_id:创建该readview的事务id。

min_trx_id:创建readview时当前数据库中活跃且未提交事务的最小id。

max_trx_id:创建readview时当前数据库中应该给的下一个事务的id。

---------------------------------------------------------------

每条数据有2个隐藏列：trx_id：事务id和回滚指针。



核心就2句话：

1、找到的数据trx_id和m_ids比较，如果不在m_ids，说明可读，否则都需要沿着版本链找。

2、读提交是每次读更新readview，可重复读是事务启动时创建readview不变。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1652600680214-c5a54bd2-5038-4086-a544-51969fb2ed52.png)

# ·日志
## redo log
1. redolog是innoDB引擎特有的；
2. redolog是物理日志，记录的是“在某个数据页上做了什么修改”；
3. redolog是循环写，空间固定。会用完会覆盖之前的日志。
4. <font style="background-color:#FADB14;">redolog</font>是只会记录未刷盘的日志，已经刷盘的会从日志中删除，具有crash-safe能力。

### 为什么binlog没有crash safe
1. 当数据库crash后，想要恢复数据时，binlog是无法恢复的。
2. 虽然binlog有全量的日志，但innodb不能判断哪些数据已经刷盘，哪些数据还没有。
3. 但redolog不一样，只要刷入磁盘的数据，都会从redolog中抹去。
4. 数据库重启后，直接把redolog中的数据都恢复至内存就可以了。

## binlog
1. 用来实现主从同步，高可用。
2. binlog是Mysql的server层实现的，所有引擎都可以使用。
3. binlog是逻辑日志，记录的是sql语句，ddl（数据定义语言）语句和dml（数据操纵语言）语句。比如“给ID=2这一行的c字段加1”
4. binlog是可以追加写入的，保存的是全量日志。“追加写”是指binlog文件写到一定大小后会切换到下一个，并不会覆盖以前的日志。

binlog作用：

1. 灾难时的数据恢复 。
2. mysql的主从复制，mysql8版本中， 默认binlog是开启的。

参数：show variables like '%log_bin%'



binlog和redolog可能会导致io影响到性能，可以通过设置参数，建设binlog和redolog的写入次数，不是每次事务提交都写。可能会有丢失数据的风险。

## undo log
事务回滚，实现MVCC

1. 原子性由undolog保证。
2. 也叫做回滚日志，可用于事务回滚。会记录数据被修改前的信息。
3. 可以用于MVCC，undolog在<font style="background-color:#FFFB8F;">事务执行时产生</font>，事务<font style="background-color:#FFFB8F;">提交时不会立即删除</font>，会用于MVCC。。
4. 是一种<font style="background-color:#FADB14;">逻辑日志</font>，当删除一条记录的时候，记录一条新增记录；当更新一条记录的时候，它记录一条相反的更新操作。

# ·锁
## 分类/特点
分类：

1. <font style="color:rgb(51, 51, 51);">锁可以分为</font><font style="color:rgb(51, 51, 51);background-color:#FADB14;">共享锁</font><font style="color:rgb(51, 51, 51);">和</font><font style="color:rgb(51, 51, 51);background-color:#FADB14;">排他锁</font><font style="color:rgb(51, 51, 51);">。</font>
2. <font style="color:rgb(51, 51, 51);">按照加</font><font style="color:rgb(51, 51, 51);background-color:#FADB14;">锁粒度</font><font style="color:rgb(51, 51, 51);">分可以有行锁、表锁、gap锁、next-key lock。</font>

<font style="color:rgb(51, 51, 51);">myisam表级锁--select：表加读锁</font>

<font style="color:rgb(51, 51, 51);">     --改：表加写锁</font>

innodb--select: mvcc不用加锁（但是serializable加行级读锁）

--改：行加写锁：①因为加锁是对索引加的，所以可能变成表锁。②范围可能会变成next-key lock

特点：

1. 加锁的话是在事务执行完毕时释放锁。单条update也是一个事务。
2. 共享锁：也叫读锁，其他事务可以读，但不可以写。
3. 排他锁：也叫写锁，其他事务不能读，也不能写。
4. 表级锁：开销小，加锁比较快，锁的粒度大，并发度低，锁冲突的概率大。不会死锁。所以更适合以查询为主，并发用户小，少量更新。
    1. 意向锁：属于表锁。
    2. 意向共享锁IS：事务打算加行共享锁，需要先获取表的IS锁。
    3. 意向排他锁IX：事务给数据行加排他锁之前，需要先获取表的IX锁。
5. 行级锁：开销大，加锁慢，加锁粒度小，并发度较高，锁冲突的概率低。可能会发生死锁（锁是逐步获得的）。
    1. 行锁是给索引（索引项）加锁实现的，只有通过索引条件查询，才能使用行锁，否则使用表锁。
6. next-key锁：使用范围条件查询或者更新时，符合条件的数据的索引会被加行锁，在范围内但是数据不存在的记录，叫做间隙，innodb也会对间隙加锁。比如 select * from table where id >100,记录1-101，101符合条件会被加锁，大于101的间隙也会被加锁。
    1. 记录锁加在索引上。
    2. 间隙锁加在索引之间。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1664328273916-90280925-110a-4368-927f-f3ef596c588f.png)

## 死锁
定义：

1. 当多用户并发读写数据时，产生多个事务同时存取数据的情况。
2. 两个事务有一组冲突的锁，事务不能继续执行下去，会出现死锁。

举例：

1. 用户A访问A表，然后又访问B表。用户B访问B表，然后访问A表。A和B会互相等待对方的锁，还持有原本持有的锁，会陷入僵持，也就死锁了。



死锁：多个进程或者线程对共享资源争抢或者互相依赖，产生的一种不经过外力无法破除的一种现象。

四个必要条件：

互斥：资源是互斥访问的，如果被某个线程持有，其他线程只能等待。

请求和保持：发生阻塞时，当前持有的资源保持不放。

不可剥夺：当前进程未执行完时，所持有的资源不能被剥夺。

循环等待：进程之间循环等待资源。



破坏互斥条件：如果资源是共享资源，则不会发生死锁。但是有些资源是不允许共享访问的，比如键盘，可写文件，有些资源是可以共享访问的，比如只读文件和磁盘。所以破坏互斥条件只适合一部分资源。

破坏请求和保持条件：如果进程持有一部分资源且申请其他资源的时候由于它不会释放自己持有的资源，可能会发生死锁。可以在程序运行前把所有它需要的资源都分配给该进程，但是会造成资源的浪费。

破坏不可剥夺条件：方案一：当持有资源申请不到其他资源时，可以强迫其释放所持有的资源，需要时再次申请。方案二：当进程请求的资源被其他进程占有，由操作系统协调剥夺其他进程占有的资源。方案一是释放自己的，可能导致前期所做的工作失效。方案二是释放其他的，可能会导致其他进程前期所做的工作失效。

破坏循环等待条件：将资源按顺序编号，申请资源按顺序递增的方式申请。缺点是不易增加新的设备，用户编程麻烦。

## 乐观锁/悲观锁
1、版本号机制

一般是说在数据表中加上一个数据库版本号version字段，在表述数据被修改的次数，当数据被修改时，它的version会加一。

当线程A需要更新数据值时，在读取数据的同时也会读取version值，在提交更新时，若刚才读取到的version值为当前数据库中的version值相等时才能更新，否则重试更新操作，直到更新成功。

库存超卖问题，库存就是个版本号。

2、CAS算法

cas是compare and swap比较并交换，有3个操作数，内存值V，预期值B，要替换的目标值A，CAS指令执行时，比较内存地址值V和预期值B是否相等，如果相等则将A复制给B，不相等则会循环比较知道相等，整个比较并赋值的操作是一个原子性的操作。

CAS缺点：

（1） 循环时间开销大，内存值V与预期值B不相等会一直循环比较知道相等。

（2）只能保证一个共享变量的原子操作

（3）如果一个变量V初次读取的时候值是A，并且在准备赋值的时候检查到它仍然是A值，但是这段时间不一定没有发生改变，如果它被修改成别的值，然后又改回了A，那CAS操作会认为它没有被修改过，这个问题就是CAS操作的“ABA”问题。

3、悲观锁

悲观锁是很悲观，每次拿数据都认为别人会修改，所以每次拿数据都会加锁。这样别人想拿数据会被阻塞直到获取到锁。

## 两阶段锁
![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1664329111936-c7e52360-4ba3-452b-9576-5114508709f8.png)

一个事务有两个更新语句，需要添加行锁，但并不是第一个更新执行完成后就释放锁，而是等事务都执行结束后才释放。

帮助：把影响并发度的锁尽量放后面，因为放前面它加锁后不释放可能会影响后面的运行。提高并发度。

# ·sql
时间类型：datetime，timestamp，date

select <font style="background-color:#FADB14;">no</font>, avg(score) from sc group by no;

group by no就是no<font style="background-color:#FADB14;">都是1个</font>。

no-score	no-avg(score)

1--20		1---25

1--30		2---30

2--10

2--50





select *,row_number() over (partition by c_id order by s_score) from score;

partition by的字段都<font style="background-color:#FADB14;">一样</font>，然后按照order by的排序，在给出row number。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1655452238021-1d58bee6-9969-4c0a-b9f9-0027e767b6c0.png)



select * ,row_number() over (partition by c_id,(case when s_score>70 then 1 else 0 end) order by s_score) from score;

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1655452469160-c1a0161d-5008-499f-9b03-cff0811e00d2.png)



查询连续7天登录

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1655453673423-30b3fe0b-a6d3-41f4-8174-503354f33a2d.png)



```sql
select name, count(day)
from (select name, date(createtime) - row_number() over (partition by name order by createtime) day
                  from (select distinct name, DATE_FORMAT(date, '%Y-%m-%d') createtime
                        from table_name) t1) t2
group by name;
```





