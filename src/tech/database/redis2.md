---
title: Redis(下)
date: 2023-02-12
index: false
icon: laptop-code
category:
  - Redis
tag:
  - 数据类型
  - 哨兵模式
  - redis集群
---

# 入门
nosql

1. not only sql
2. 问题：
    1. 关系型数据库难以对付高并发
3. 特点：
    1. 方便扩展
    2. 大数据量、高性能
    3. 数据类型多样
4. 关系型
    1. 结构化
    2. SQL
    3. 数据和关系单独的表中
    4. 一致性
    5. 事务
5. nosql
    1. 没有固定查询语句
    2. 键值对、列存储、文档存储、图形数据库
    3. 最终一致性
    4. CAP定理和BASE（异地多活）
    5. 高性能、高可用、高扩展
6. 分类
    1. KV键值对：redis
    2. 文档型数据库
        1. mongodb（bson和json一样）
            1. 基于分布式文件存储
    3. 列存储数据库
        1. HBase
        2. 分布式文件系统
    4. 图关系数据库
        1. 放的是关系，比如朋友圈社交网络、广告推荐
            1. neo4j、infogrid

redis

1. remote dictionary server
2. 内存+可持久日志（RDB+AOF）
3. key-value
4. 效率高
5. 发布订阅，队列
6. 地图信息分析
7. 多数据类型
8. 集群
9. 事务

## 下载
1. wget http://download.redis.io/releases/redis-6.0.6.tar.gz
2. 解压：tar -xzf redis-6.0.6.tar.gz
3. cd redis-6.0.6
4. make
5. 拷贝配置文件
    1. cp ~/redis-6.0.6/redis.conf /usr/local/redis/bin/redis-conf/redis.conf
6. 启动：
    1. src/redis-server redis-config/redis.conf
7. 查看
    1. ps -ef |grep redis
8. 客户端
    1. redis-cli -h 127.0.0.1 -p 6379



## 性能测试
1. redis-benchmark官网自带的压力测试工具

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1672193139005-00d40479-99d8-42e3-af58-5cb974417772.png)

2. 使用方式
    1. redis-benchmark -h 127.0.0.1 -p 6379 -c 100 -n 100000



## 单线程为什么快
1. 内存操作
    1. 性能瓶颈在内存+带宽。
    2. 不在cpu，因此用单线程。
2.  多线程需要进行cpu上下文切换。
3. 采用网络IO多路复用。
    1. 多连接保证高吞吐量
4. 使用跳表、链表、动态字符串、压缩列表实现数据结构。效率高。



# 数据类型
## 五大数据类型
1. 文档
    1. http://www.redis.cn/commands.html
2. 数据类型指的是value



### string
命令

1. keys *
2. exists name
    1. >=1存在，<=0不存在
3. move name 1：迁移到数据库1
4. select 1：使用数据库1
5. set name yyyy
    1. expire name 10
        1. ttl name
    2. get name
    3. append name "hello" #追加
    4. strlen name
6. set views 1
    1. incr views # 自增1
    2. decr views # 自减1
    3. incrby views 2 # 自增2
    4. decrby views 2 # 自减2
7. set key1 "hello world"
    1. getrange key1 0 4
    2. getrange key1 0 -1：-1代表尾部
    3. setrange key1 1 xx：从e替换成xx得到hxxlo world
8. setex
    1. 设置过期时间
    2. setex key4 10 value4 # 10秒钟
9. setnx
    1. 不存在再设置
    2. setnx key1 value1：如果key1存在设置不成功。
    3. setnx key2 value1：key2不存在，设置成功，返回1.
10. mset和mget
    1. mset k1 v1 k2 v2 k3 v3
    2. mget k1 k2 k3
    3. msetnx k1 v1 k4 v4
        1. 原子性，要么全部成功，要么全部失败。
11. getset：先get后set
    1. getset db redis # 如果不存在，返回nil，并设置值。
    2. getset db mongodb # 如果存在，返回redis，并设置mongodb
12. type name：类型
13. 举例：
    1. 
    ```
    set user:1 {name:zhangsan, age:3}
    ```
        1. 保存一个对象。

### list
用途

1. 用做栈、队列、阻塞队列
2. 栈
    1. 左进左出
3. 队列
    1. 左进右出

命令

1. lpush list one
    1. lpush list two
    2. lrange list 0 -1：two one
    3. rpush list zero
2. lpop list
    1. rpop list
3. lindex list 0
4. llen list
5. lrem list 2 value4
    1. 从左起删除两个value4
6. ltrim list 1 2
    1. 只保留1到2的数据。
7. rpoplpush mylist myotherlist
    1. lrange mylist 0 -1
        1. hello1 hello2 hello3
    2. 移除列表最后一个元素，移动到新的列表中
    3. lrange mylist 0 -1
        1. hello1 hello2
    4. lrange myother list 0 -1
        1. hello3
8. lset
    1. 列表中指定下标的值替换为另一个值，更新操作
    2. lset list 0 item：如果列表不存在，则报错。
9. linsert
    1. linsert list before|after value3 value4
    2. 在value3的前面或后面插入value4。

### set
结构

1. hash结构

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1672216075092-ac79e261-2e0d-4f62-a955-1d3256385256.png)

命令

1. sadd set hello world
2. smembers set
    1. 返回set集合中的元素
3. sismember set hello
    1. hello在不在集合中，返回1
4. scard set
    1. 获取集合元素个数
5. srem set world
    1. 移除world元素
6. srandmember set
    1. 随机抽取一个元素
    2. srandmember set 2
        1. 随机抽取2个元素。
7. spop set
    1. 随机删除一个元素。
8. smove set setother "kkk"
    1. 将kkk移动到setother集合中。
9. sdiff key1 key2
    1. key1和key2的差集，key1-key2
10. sinter key1 key2
    1. 交集
11. sunion key1 key2
    1. 并集

### hash
1. key field value

命令

1. hset myhash field xxx
2. hget myhash field
3. hmset myhash k1 v1 k2 v2
4. hmset myhash k1 k2
5. hgetall myhash（慎用）
    1. 获取所有key和value
6. hlen myhash
    1. 获取长度
7. hexists myhash field1
    1. 是否存在key，存在1
8. hkeys myhash
    1. 获取所有key
9. hvals myhash
    1. 获取所有value
10. hincrby hash1 field1 1
    1. hget hash1 field1：1
11. hsetnx hash2 field1 value1
    1. 不存在设置成功

### zset
语法

1. zadd key score value
2. zadd myset 1 one
3. zadd myset 2 two 3 three
4. zrange myset 0 -1
    1. one two three
    2. zrange myset 0 -1 WITHSCORES
    3. 反向排列
        1. zrevrange myset 0 -1 WITHSCORES
5. zrangebyscore zset 15 22
    1. 根据score范围拿出值。
6. zrem myset one：移除one
7. zcard myset：集合元素个数
8. zcound myset 15 22：查询元素score在15到22区间的count

## 三种特征数据类型
### geospatial
1. geoadd china:city 116.40 39.90 beijing
2. geoadd china:city 121.47 31.23 shanghai
3. geoadd china:city 106.50 29.53 chongqing 114.05 22.52 shenzhen
4. geoadd china:city 120.16 30.24 hangzhou 108.96 34.26 xian
5. 获取当前坐标
    1. geopos china:city beijing
6. 获取两个位置距离
    1. geodist china:city beijing shanghai km
    2. m km mi英里 ft英尺
7. 以给定的经纬度为中心，找出某一半径内的元素
    1. georadius china:city 110 30 1000km
    2. withcoord 显示定位信息
    3. withdist 显示到中心点距离
    4. count 1 指定数量
8. 找指定元素周围的其他元素
    1. georadiusbymember china:city shanghai 1000 km
        1. hangzhou
        2. shanghai
9. zrange china:city 0 -1

### hyperloglog
UV：根据ip判断。一天内同一个访客仅被计算一次。

优点：

1. 占用内存小12KB
2. 有0.81%错误率。

命令：

1. pfadd mykey a b c d e f g h i j
2. pfcount mykey
3. pfmerge mykey3 mykey  mykey2
    1. 合并mykey和mykey2=>mykey3

### bitmap位图
1. 表示某个元素对应的值，或0或1.
2. 打卡
    1. setbit sign 0 1 # 周一打卡了
    2. setbit sign 1 0 # 周二没打卡
    3. setbit sign 2 0 # 周三未打卡
    4. getbit sign 2：周三打卡了吗？
    5. bitcount sign：统计打卡的数量。



# 事务
redis事务本质

1. 一组命令的集合。
2. 按顺序执行。
3. 一次性、顺序性、排他性的执行一组命令。
4. 单条命令保证原子性，事务不保证原子性。
5. 如果命令有错，事务中所有命令都不会被执行。
6. 如果命令执行结果报错，其他命令可以正常执行，错误命令抛出异常。

事务命令

1. 开启事务：multi
2. 命令入队
3. 执行事务：exec
4. 撤销事务：discard

代码：

1. multi
2. set k1 v1
3. set k2 v2
4. get k2
5. set k3 v3
6. exec



## 监视watch
1. 悲观锁
    1. 悲观，无论什么时候都会加锁。
    2. 影响效率，实际情况一般使用乐观锁。
2. 乐观锁
    1. 乐观，认为什么时候都不会出现问题。
    2. 不上锁。更新数据的时候会判断一下，在此期间是否修改过监视的数据。

watch作用

1. 监控1或多个key。
2. 一旦其中一个key被修改(或删除)，之后的事务就不执行。
3. 监控持续到exec命令。

转账举例

1. set money 300
2. set out 200
3. watch money
4. multi
5. decrby money 20
6. incrby out 20
7. 另一个线程设置set money 200
8. exec，事务没有执行成功。

如果修改失败，重新监控获取最新值

1. UNWATCH先解锁
2. WATCH money # 获取最新的值，相当于mysql的select version
3. multi
4. DECRBY money
5. INCRBY out
6. exec # 执行时会对比监视的值，如果发生变化会执行失败。



## jedis
介绍：

1. java操作redis的工具。
2. redis官方推荐。



步骤

1. 依赖

<dependency>

<groupId>redis.clients</groupId>

<artifactId>jedis</artifactId>

<version>3.2.0</version>

</dependency>

<dependency>

<groupId>com.alibaba</groupId>

<artifactId>fastjson</artifactId>

<version>1.2.68</version>

</dependency>

2. 创建Jedis
    1. Jedis jedis=new Jedis("localhost", 6379)
    2. System.out.println(jedis.ping()); // PONG
3. jedis实现事务

```java
public static void main(String[] args) {
    Jedis jedis=new Jedis("127.0.0.1", 6379);
    //        System.out.println(jedis.ping());
    jedis.flushDB();
    JSONObject jsonObject=new JSONObject();
    jsonObject.put("hello", "world");
    jsonObject.put("name", "xxx");

    // 开启事务
    Transaction multi=jedis.multi();
    String result=jsonObject.toJSONString();

    try {
        multi.set("user1", result);
        multi.set("user2", result);
        int i=1/0;
        multi.exec(); // 执行事务
    } catch (Exception e) {
        multi.discard(); //放弃事务
        e.printStackTrace();
    } finally {
        System.out.println(jedis.get("user1"));
        System.out.println(jedis.get("user2"));
    	jedis.close();
    }
}
```

    1. 出现了异常，进入catch，放弃事务，两个命令都没有执行。



## springboot整合redis
依赖

1. 
```java
<dependency>  
   <groupId>org.springframework.boot</groupId>  
   <artifactId>spring-boot-starter-data-redis</artifactId>  
</dependency>
```
2. springboot2.x之后，原来的jedis被替换为lettuce。
    1. lettuce：采用netty。更像NIO。
    2. jedis：采用的直连，更像BIO。
3. springboot所有的配置类，都有一个自动配置类。
    1. RedisTemplate
4. 自动配置类都绑定一个properties配置文件。
    1. RedisProperties
5. 配置连接
    1. spring.redis.host=127.0.0.1
    2. spring.redis.port=6379
6. 代码
    1. @Autowired  
private RedisTemplate redisTemplate;  
@Autowired  
private StringRedisTemplate stringRedisTemplate;  
public void test() {  
	redisTemplate.opsForValue().set("mszlu","hello");  
	stringRedisTemplate.opsForValue().set("stringmszlu", "hello string");  
	System.out.println(redisTemplate.opsForValue().get("mszlu"));			System.out.println(stringRedisTemplate.opsForValue().get("stringmszlu"));  
}
7. 自定义序列化配置

```java
/**
* 编写的自己的 RedisTemplate
*/
@Configuration
    public class RedisConfig {

        @Bean
        @SuppressWarnings("all")
        public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
            // 为了开发方便，一般使用 <String, Object>
            RedisTemplate<String, Object> template = new RedisTemplate();
            template.setConnectionFactory(redisConnectionFactory);

            // 序列化配置
            Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
            ObjectMapper om = new ObjectMapper();
            om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
            om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
            jackson2JsonRedisSerializer.setObjectMapper(om);

            // String 的序列化
            StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
            // key 采用 String 的序列化方式
            template.setKeySerializer(stringRedisSerializer);
            // hash 的 key 也采用 String 的序列化方式
            template.setHashKeySerializer(stringRedisSerializer);
            // value 序列化方式采用 Jackson
            template.setValueSerializer(jackson2JsonRedisSerializer);
            // hash 的 value 序列化方式采用 Jackson
            template.setHashKeySerializer(jackson2JsonRedisSerializer);
            template.afterPropertiesSet();

            return template;
        }
    }
```



# redis配置文件和持久化
## 持久化
停止进程：

1. kill -9 号

network网络

1. bind 127.0.0.1 # 绑定的ip只有127.0.0.1可以访问redis服务，0.0.0.0代表所有ip都可以访问。
2. protected-mode no # 保护模式
3. port 6379 # 端口设置

general

1. deamonize yes # 守护进程方式启动。
2. pidfile /var/run/redis_6379.pid # 如果后台启动，我们需要指定一个pid文件。
3. loglevel debug|verbose|notice|warning
4. logfile "" # 日志文件的位置
5. databases 16 # 数据库的数量，默认16
6. always-show-logo yes # 是否总是显示LOGO

持久化/快照配置rdb

1. save 900 1
    1. 如果900s内，至少有1个key进行了修改，进行持久化操作。
2. save 300 10
    1. 如果300s内，至少有10个key进行了修改，进行持久化操作。
3. stop-writes-on-bgsave-error yes # 如果持久化出错，是否还要继续工作。
4. rdbcompression yes # 是否压缩rdb文件，需要消耗一些cpu资源。
5. rdbchecksum yes # 保存rdb文件的时候，进行错误的检查校验。
6. dir ./ # rdb文件保存的目录。

security

1. requirepass 123456
    1. 设置密码，客户端连接时使用auth 123456

client

1. maxclients 10000 #设置能连接上redis的最大客户端数量
2. maxmemory &lt;bytes&gt; # redis设置最大的内存数量。
3. maxmemory-policy noeviction # 内存达到上限之后的处理策略
    1. noeviction：当内存达到阈值的时候，所有引起申请内存的命令会报错。
    2. allkeys-lru：在所有键中采用lru算法删除键，直到腾出足够内存为止。
    3. **volatile-lru**：在设置了过期时间的键中采用lru算法删除键，直到腾出足够内存为止。
    4. allkeys-random：在所有键中采用随机删除键，直到腾出足够内存为止。
    5. volatile-random：在设置了过期时间的键中随机删除键，直到腾出足够内存为止。
    6. volatile-ttl：在设置了过期时间的键空间中，具有更早过期时间的key优先移除。

AOF模式

1. appendonly no # 默认不开启AOF模式，默认使用RDB方式持久化，大部分情况下RDB完全够用。
2. appendfilename "appendonly.aof" # 持久化的文件的名字。
3. appendfsync always # 每次修改都会sync消耗性能。
4. appendfsync everysec # 每秒执行一次
5. appendfsync no # 不执行sync，操作系统自己同步数据，速度最快。



## 持久化
### RDB
1. redis database
2. 过程

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1672318068576-935fcd03-d133-43ec-a1b9-aff2a28b1908.png)

3. 手动触发
    1. save：阻塞
    2. bgsave：非阻塞（一般用这个）
4. 客户端清除数据
    1. 删除dump.rdb
    2. 客户端清除所有数据flushall
    3. 重新启动后数据才会恢复。
    4. 再次检验dump.rdb又出现了。
5. 优点
    1. 适合大规模数据恢复。
    2. 对数据完整性要求不高。
6. 缺点
    1. 需要一定的时间间隔进行操作，如果redis宕机，最后一次修改的数据就没有了。
    2. fork进程的时候，会占用一定的空间。



### AOF
1. append only file
2. 记录set key value这样的命令。
3. redis启动之初会读取文件(执行命令)重新构建数据。
4. 类似binlog
5. 保存为xxx.aof，如appendonly.aof文件。
6. 修复aof文件
    1. redis-check-aof --fix appendonly.aof
    2. 重启服务。
7. 优点
    1. 每次修改都同步，文件完整性好。
    2. 每秒同步一次，可能会丢失一秒的数据。
    3. 从不同步，效率最高的。
8. 缺点
    1. AOF远远大于RDB，修复的速度比RDB慢。
    2. AOF运行效率比RDB慢，所以redis默认是rdb配置。
9. 问题
    1. aof有重写功能，只会保留最后一条修改的命令。



性能建议

1. rdb做后备用途，建议只在slave上持久化rdb，而且15分钟备份一次就够了。
    1. save 900 1
2. AOF代价带来持续的IO。磁盘会导致cpu占用到这了，没法做别的。
3. 同时开启两种持久化方式。







# 发布订阅
1. pub/sub：发送者发送消息，订阅者接收消息。
2. redis客户端可以订阅任意数量的频道。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1672323013826-47623a52-4233-454d-a782-e4e1e5f08445.png)

3. 场景
    1. 实时消息系统
    2. 实时聊天
    3. 订阅、关注系统
    4. 稍微复杂的场景更多的使用消息中间件MQ。
4. 命令

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1672323289320-71ab939b-b6a9-4ec2-9668-2f0f5da7af13.png)

5. 举例
    1. 订阅者1
        1. subscribe redisChat
    2. 订阅者2
        1. subscribe redisChat
    3. 发布者
        1. publish redisChat "hello redis pub sub"



# 主从复制
概念

1. 主节点master/leader的数据复制到从节点slave/follower。
2. 数据复制是单向的，只能从主节点到从节点。
3. master以写为主，slave以读为主。

作用

1. 数据冗余：实现了数据的热备份，是持久化之外的一种数据冗余方式。
2. 故障恢复：主节点出现问题，由从节点提供服务，实现故障恢复。
3. 负载均衡：主从复制的基础上配合读写分离（主节点提供写服务，从节点提供读服务），写数据的时候连主节点，读的时候连从节点。
4. 高可用基石：主从复制、哨兵模式、集群。

配置rz->lrzsz

1. 主机6381，从机6382和6383
2. 直接使用命令配置，但是重启失效。
    1. 配置从
    2. SLAVEOF 127.0.0.1 6381
    3. info replication
3. 使用配置文件。
    1. 配置从
    2. replicaof ip port
4. port 6381
# daemonize no
# logfile "6381.log"
dir /redis/data  
dbfilename "dump-6381.rdb"  
appendfilename "appendonly-6381.aof"
5. port 6382
# daemonize no
# logfile "6382.log"
dir /redis/data  
dbfilename "dump-6382.rdb"  
appendfilename "appendonly-6382.aof"  
slaveof 127.0.0.1 6381
6. port 6383
# daemonize no
# logfile "6383.log"
dir /redis/data  
dbfilename "dump-6383.rdb"  
appendfilename "appendonly-6383.aof"  
slaveof 127.0.0.1 6381
7. 启动3台
    1. redis-server redis-6381.conf
    2. redis-server redis-6382.conf
    3. redis-server redis-6383.conf
8. 测试
    1. redis-cli -p 6381
        1. set mszlu haha
    2. redis-cli -p 6382
        1. get mszlu -> haha
    3. 说明数据同步实现了。
9. 从机只能读，不能写。
10. 复制原理
    1. slave启动成功连接到master后会发送一个sync同步命令。
    2. master接收到命令后执行bgsave，将rdb数据文件传送到slave。
    3. 全量复制：slave接收到数据库文件后，将其存盘并加载到内存。
    4. 增量复制：master继续将新的修改命令传给slave，完成同步。
    5. 一旦重新连接master，一次全量复制将被自动执行。



# 哨兵模式
背景

1. 主服务器宕机后，需要手动将一台服务器切换为主服务器。
    1. 费时费力
    2. 造成一段时间服务不可用。

概述

1. redis2.8开始。
2. 哨兵是一个独立的进程。

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1672471867276-904441de-c088-4d86-a7f9-39c50c6a0d81.png)

![](https://cdn.nlark.com/yuque/0/2022/png/22839467/1672471963259-b3f41836-bc40-4374-814b-2fe1c0a305cb.png)

哨兵：

1. 后台哨兵监控主服务器是否故障。ping/pong
2. 哨兵1认为主服务器挂掉：主观下线
3. 达到一定个数的哨兵都认为下线：客观下线。
4. 如果故障了根据投票数选哨兵节点。
5. 选出的哨兵节点leader进行故障转义/主从切换。
6. 从slave中选择一个作为master
    1. 速度快、数据新的可能会作为新的master。
    2. 数据新
        1. master这里有一个增量同步的队列，有一个offset。
        2. 哪一个slave的offset大，表示数据越新。

配置

1. 6401主，6402/6403从
    1. port 6401  
       dir "/redis/data"  
       dbfilename "dump-6401.rdb"
    2. port 6402  
       dir "/redis/data"  
       dbfilename "dump-6402.rdb"  
       slaveof 127.0.0.1 6401
    3. port 6403  
       dir "/redis/data"  
       dbfilename "dump-6403.rdb"  
       slaveof 127.0.0.1 6401
2.  哨兵节点26401、26402/26403
    1. port 26401  
       dir "/redis/data"  
       sentinel monitor mymaster 127.0.0.1 6401 2  
       sentinel down-after-milliseconds mymaster 5000  
       #sentinel failover-timeout mymaster 20000  
       #sentinel parallel-sync mymaster 1  
       #sentinel deny-scripts-reconfig yes
    2. port 26402  
       dir "/redis/data"  
       sentinel monitor mymaster 127.0.0.1 6401 2 # 投票的数量，投两票就成功  
       sentinel down-after-milliseconds mymaster 5000  
       #sentinel failover-timeout mymaster 20000  
       #sentinel parallel-sync mymaster 1  
       #sentinel deny-scripts-reconfig yes
    3. port 26403  
       dir "/redis/data"  
       sentinel monitor mymaster 127.0.0.1 6401 2  
       sentinel down-after-milliseconds mymaster 5000  
       #sentinel failover-timeout mymaster 20000  
       #sentinel parallel-sync mymaster 1  
       #sentinel deny-scripts-reconfig yes
    4. config/sentinel/
        1. 把6个配置文件放进来
    5. 启动redis主从
        1. redis-server /redis/config/sentinel/redis-6401.conf
        2. redis-server /redis/config/sentinel/redis-6402.conf
        3. redis-server /redis/config/sentinel/redis-6403.conf
    6. sentinel
        1. redis-sentinel /redis/config/sentinel/redis-sentinel-26401.conf
        2. redis-sentinel /redis/config/sentinel/redis-sentinel-26402.conf
        3. redis-sentinel /redis/config/sentinel/redis-sentinel-26403.conf
3. redis-cli -p 6401
    1. info查看主从信息。



# 集群
简介：

1. 无中心结构。
2. 多个节点之间自动进行数据分片的能力。
3. 支持节点动态添加与移除。
4. 部分节点不可用时进行自动故障转移。
5. 高性能可扩展，支持扩展到1000个节点。

## 哈希槽
定义：

1. redis-cluster有16384（2的14次方）个哈希槽，每个key通过CRC16校验后对16384取模决定放到那个槽。
2. 集群每个主节点负责一部分hash槽。
    1. 3个节点。
    2. 节点A包含0-5500哈希槽。
    3. 节点B包含5501-11000哈希槽。
    4. 节点C包含11001到16383号哈希槽。

客户端向集群请求的处理过程：

1. 客户端根据请求的键计算得到哈希槽。
    1. crc16(key)%16384
2. 假设请求的键对应的哈希值落在了节点A负责的哈希槽范围内。
3. 客户端向任意节点发送请求，让该节点帮助它找到负责该哈希槽的节点。
    1. 如果这个节点就是负责该哈希槽的节点，即自身节点，也就是找到了。执行命令。
    2. 否则让这个节点负责将请求转发到负责该哈希槽的节点。
    3. MOVED。客户端重定向。
4. 哈希槽的状态可能是MIGRATING。
    1. 迁移状态。
    2. 客户端的请求无法对这个哈希槽的键进行写操作。
    3. 但可以读。

## 集群搭建
方式：

1. 配置服务器3主3从
2. 建立通信
3. 分槽
4. 搭建主从。

Cluster配置

1. 是否启用cluster，加入cluster节点
    1. cluster-enabled yes|no
2. cluster配置文件名，该文件属于自动生成，仅用于快速查找文件并查询文件内容。
    1. cluster-config-file filename
3. 节点服务响应超时时间，用于判定该节点是否下线或切换为从节点。
    1. cluster-node-timeout milliseconds
4. master连接的slave最小数量
    1. cluster-migration-barrier min_slave_number
5. cluster-6501.conf
    1. port 6501  
       dir "/redis/data"  
       dbfilename "dump-6501.rdb"  
       cluster-enabled yes  
       cluster-config-file "cluster-6501.conf"  
       cluster-node-timeout 5000

节点操作命令：

1. 查看集群节点信息
    1. cluster nodes
2. 更改slave指向新的master
    1. cluster replicate master-id
3. 发现一个新节点，新增master
    1. cluster meet ip:port
4. 忽略一个没有solt的节点
    1. cluster forget server_id
5. 手动故障转移
    1. cluster failover

redis-cli命令

1. 创建集群
    1. redis-cli --cluster create masterhost1:masterport1 masterhost2:masterport2 masterhost3:masterport3 [masterhostn:masterportn ...] slavehost1:slaveport1 slavehost2:slaveport2 slavehost3:slaveport3 --cluster-replicas n
        1. master与slave的数量要匹配，一个master对应n个slave，由最后的参数n决定。
        2. master与slave的匹配顺序为第一个master与前n个slave分为一组，形成主从结构。
2. 添加master到当前集群中，连接时可以指定任意现有节点地址和端口。
    1. redis-cli --cluster add-node new-master-host:new-master-port now-host:now-port

创建集群过程

1. mkdir cluster/
    1. cd cluster/
2. 上传8个配置文件cluster-6501.conf。
3. 启动三主三从
    1. redis-server cluster/cluster-6501.conf
    2. redis-server cluster/cluster-6502.conf
    3. redis-server cluster/cluster-6503.conf
    4. redis-server cluster/cluster-6504.conf
    5. redis-server cluster/cluster-6505.conf
    6. redis-server cluster/cluster-6506.conf
4. 一个客户端
    1. 创建集群
        1. redis-cli --cluster create masterhost1:masterport1 masterhost2:masterport2 masterhost3:masterport3 slavehost1:slaveport1 slavehost2:slaveport2 slavehost3:slaveport3 --cluster-replicas n
        2. redis-cli --cluster create 127.0.0.1:6501 127.0.0.1:6502 127.0.0.1:6503 127.0.0.1:6504 127.0.0.1:6505 127.0.0.1:6506 --cluster-replicas 1
        3. --cluster-replicas：一个master对应n个slave。
    2. 添加master到当前集群中，连接时可以指定任意现有节点地址和端口。
        1. redis-cli --cluster add-node new-master-host:new-master-port now-host:now-port
        2. redis-server cluster/cluster-6507.conf
            1. 启动一个6507
        3. redis-cli --cluster add-node 127.0.0.1:6507 127.0.0.1:6501
    3. 添加slave
        1. redis-cli --cluster add-node new-slave-host:new-slave-port master-host:master-port --cluster-slave --cluster-master-id masterid
    4. 删除节点，如果节点是master，必须保障其中没有槽
        1. redis-cli --cluster del-node del-slave-host:del-slave-port del-slave-id
    5. 重新分槽，分槽是从具有槽的master中划分一部分给其他master，过程中不创建新的槽。
        1. redis-cli --cluster reshard new-master-host:new-master:port --cluster-from srcmaster-id1, src-master-id2, src-master-idn --cluster-to target-master-id --cluster-slots slots
        2. redis-cli --cluster reshard 127.0.0.1:6507 --cluster-from id1,id2,id3 --cluster-to target-master-id(cluster node查看的) --cluster-slots 1000 # 转移1000个槽
    6. 重新分配槽，中具有槽的master中分配指定数量的槽到另一个master中，常用于清空指定master中的槽。
        1. redis-cli --cluster reshard src-master-host:src-master-port --cluster-from srcmaster-id --cluster-to target-master-id --cluster-slots --cluster-yes



测试集群

1. 客户端
    1. redis-cli -p 6501 -c
2. set mszlu haha
    1. -> Redirected to slot [7859] located at 127.0.0.1:6502
    2. 重定向到另一个主节点。

测试添加新节点master

1. 客户端
    1. redis-cli -p 6501 -c
2. 查看集群节点
    1. cluster nodes
3. 分槽



![](https://cdn.nlark.com/yuque/0/2023/png/22839467/1672576549582-67c81a8c-a816-4358-9dda-08584c9833d7.png)

![](https://cdn.nlark.com/yuque/0/2023/png/22839467/1672576701844-8666de64-1747-4517-a3db-9e371b31bebe.png) 















